const secure = require('../lib/secure-scores');
const data = require('../lib/game-data');
const crypto = require('node:crypto');
const difficulties = ['easy', 'medium', 'hard'];
const languages = ['fr', 'en', 'es', 'pt', 'ar', 'sw', 'de', 'zh'];
const donationPoints = { 'geste-rose': 50, 'elan-rose': 100, 'cercle-rose': 200, 'ambassadeur-rose': 300 };
const categories = Object.keys(donationPoints);
const SESSION_MS = 2 * 60 * 60 * 1000;

function level(s) {
  return (data.difficultyScenarioLevels[s.language]?.[s.difficulty] ||
    (s.language === 'en' ? data.englishLevels : data.otherLevels[s.language]) || data.levels)[s.level];
}
function options(c, s) {
  const words = level(s);
  const pair = ['good', 'bad'].map(type => ({
    id: secure.mac(c, 'choice', s.run, s.difficulty, s.level, s.round, type).slice(0, 22),
    text: words[type][s.round], type,
    explanation: words[type + 'Explanations']?.[s.round] ||
      (s.language === 'fr' ? data.explanations[words[type][s.round]] : null) || words[type + 'Explanation'] || words.message,
  }));
  return secure.mac(c, 'order', s.run, s.difficulty, s.level, s.round).charCodeAt(0) % 2 ? pair.reverse() : pair;
}
function publicState(c, s, extra = {}) {
  const words = level(s);
  const nextScoring = data.levelScoring[s.level + 1];
  const multiplier = data.difficultyConfig[s.difficulty].multiplier;
  return {
    token: secure.seal(c, s), playerId: s.player, score: s.score, phase: s.phase,
    difficulty: s.difficulty, levelIndex: s.level, roundIndex: s.round, mistakesInLevel: s.mistakes,
    level: { title: words.title, theme: words.theme, instruction: words.instruction, message: words.message },
    ...(s.phase === 'question' ? { choices: options(c, s).map(({ id, text }) => ({ id, text })) } : {}),
    donationBonusesClaimed: categories.filter((_, i) => s.donations & (1 << i)),
    perfectBonus: s.lastPerfectBonus || 0,
    nextLevelTitle: s.level < 4 ? level({ ...s, level: s.level + 1 }).title : null,
    nextPossiblePoints: nextScoring ? 4 * Math.round(nextScoring.correct * multiplier) + Math.round(nextScoring.completion * multiplier) + Math.round(nextScoring.perfect * multiplier) : 0,
    ...extra,
  };
}
async function start(c, req, res, p) {
  const name = typeof p.name === 'string' ? p.name.trim().replace(/\s+/g, ' ') : '';
  if (!name || name.length > 24 || /[\u0000-\u001f\u007f]/.test(name) || !difficulties.includes(p.difficulty) || !languages.includes(p.language)) {
    throw new secure.HttpError(400, 'Pseudo ou difficulté invalide.');
  }
  const pid = secure.player(c, req, res, true);
  await secure.rateLimit(c, pid, 3000, 1);
  const ip = String(req.headers['x-vercel-forwarded-for'] || req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown').split(',')[0].trim();
  await secure.rateLimit(c, 'ip:' + ip, 10000, 8);
  const now = Date.now();
  const s = {
    kind: 'run', version: secure.VERSION, run: crypto.randomBytes(16).toString('hex'), player: pid, name,
    language: p.language, difficulty: p.difficulty, level: 0, round: 0, mistakes: 0, answers: 0,
    score: 0, seq: 0, phase: 'question', startedAt: now, questionAt: now, expiresAt: now + SESSION_MS,
    donations: 0, inviteeBonus: false,
    referrer: /^p_[a-f0-9]{32}$/.test(p.referrerId || '') && p.referrerId !== pid ? p.referrerId : null,
  };
  for (const category of new Set(Array.isArray(p.donationCategories) ? p.donationCategories : [])) {
    const index = categories.indexOf(category);
    if (index >= 0) { s.donations |= 1 << index; s.score += donationPoints[category]; }
  }
  if (p.dailyBonus === true) {
    const day = new Date(now + 3600000).toISOString().slice(0, 10);
    if (await secure.create(c, secure.id(c, 'd_', 'daily', pid, day), { pseudo: 'daily-v2', score: 50 })) s.score += 50;
  }
  return publicState(c, s);
}
async function transition(c, req, res, p) {
  const pid = secure.player(c, req, res);
  const current = secure.open(c, p.token, 'run');
  if (current.player !== pid) throw new secure.HttpError(403, 'Cette partie appartient à un autre joueur.');
  const s = { ...current };
  let extra = {};
  let chosen;
  if (p.action === 'answer') {
    if (s.phase !== 'question') throw new secure.HttpError(409, 'Cette question a déjà été validée.');
    chosen = options(c, s).find(option => option.id === p.choiceId);
    if (!chosen) throw new secure.HttpError(400, 'Réponse invalide.');
    if (Date.now() - s.questionAt < 300) throw new secure.HttpError(429, 'Prends le temps de lire la question avant de répondre.');
  } else if (p.action === 'next') {
    if (s.phase !== 'answer' || (s.round === 3 && s.level === 4 && s.difficulty === 'hard')) throw new secure.HttpError(409, 'Progression de partie invalide.');
  } else if (p.action === 'finish') {
    if (s.phase !== 'answer' || s.round !== 3) throw new secure.HttpError(409, 'Termine le niveau avant d’enregistrer ton score.');
  } else if (p.action === 'bonus') {
    if (!categories.includes(p.category) || (s.donations & (1 << categories.indexOf(p.category)))) throw new secure.HttpError(409, 'Bonus déjà attribué ou invalide.');
  } else {
    throw new secure.HttpError(400, 'Action invalide.');
  }
  // The same durable key is used even if an identical retry returns a new ciphertext.
  // Different answers/actions racing for the same step cannot both win.
  const issuedAt = await secure.consume(c, current, p.action, p.choiceId || p.category);
  s.seq += 1;
  if (p.action === 'answer') {
    const scoring = data.levelScoring[s.level];
    const multiplier = data.difficultyConfig[s.difficulty].multiplier;
    const correct = chosen.type === 'good';
    const delta = Math.round((correct ? scoring.correct : -scoring.incorrect) * multiplier);
    s.score = Math.max(0, s.score + delta);
    s.mistakes += correct ? 0 : 1;
    s.answers += 1;
    s.phase = 'answer';
    let perfectBonus = 0;
    if (s.round === 3) {
      s.score += Math.round(scoring.completion * multiplier);
      if (s.mistakes === 0) { perfectBonus = Math.round(scoring.perfect * multiplier); s.score += perfectBonus; }
      if (s.level === 4) s.score += Math.round(500 * multiplier);
    }
    extra = { correct, delta, explanation: chosen.explanation, perfectBonus };
    s.lastPerfectBonus = perfectBonus;
  } else if (p.action === 'next') {
    if (s.round < 3) s.round += 1;
    else {
      s.round = 0; s.mistakes = 0;
      if (s.level < 4) s.level += 1;
      else { s.level = 0; s.difficulty = difficulties[difficulties.indexOf(s.difficulty) + 1]; }
    }
    s.phase = 'question'; s.questionAt = issuedAt; s.lastPerfectBonus = 0;
  } else if (p.action === 'bonus') {
    s.donations |= 1 << categories.indexOf(p.category);
    s.score += donationPoints[p.category];
    extra = { bonusPoints: donationPoints[p.category] };
  } else if (p.action === 'finish') {
    await secure.rewardReferral(c, s);
    s.phase = 'finished';
  }
  if (s.phase === 'finished') {
    await secure.save(c, s);
    await secure.markCompleted(c, s.player);
    const ranking = await secure.leaderboard(c);
    const counts = await secure.referralCounts(c);
    extra = { ...extra, ...ranking, id: s.player, score: s.score + (counts.get(s.player) || 0) * 250, inviteeBonus: s.inviteeBonus ? 100 : 0 };
  }
  return publicState(c, s, extra);
}
async function handler(req, res) {
  try {
    secure.guard(req, res, ['POST']);
    const p = secure.body(req);
    if ('score' in p || 'id' in p || 'playerId' in p) throw new secure.HttpError(400, 'Les points sont calculés uniquement pendant la partie.');
    const c = secure.config();
    const result = p.action === 'start' ? await start(c, req, res, p) : await transition(c, req, res, p);
    return res.status(200).json(result);
  } catch (error) {
    if (!error.status) console.error('Mission Rose game validation unavailable.');
    return res.status(error.status || 503).json({ error: error.status ? error.message : 'Validation temporairement indisponible. Réessaie.' });
  }
}
module.exports = handler;
