const { test, beforeEach } = require('node:test');
const assert = require('node:assert/strict');
const secure = require('../lib/secure-scores');
const data = require('../lib/game-data');
const game = require('../api/game');
const leaderboard = require('../api/leaderboard');
const referrals = require('../api/referrals');

process.env.APPWRITE_API_KEY = 'test-key-only-not-a-production-secret';
const realNow = Date.now;
let now, rows, failure;
beforeEach(() => {
  now = 1791812000000; rows = new Map(); failure = null;
  Date.now = () => now;
  global.fetch = async (input, init = {}) => {
    const url = new URL(input), method = init.method || 'GET';
    const path = url.pathname.split('/rows')[1] || '';
    const body = init.body ? JSON.parse(init.body) : null;
    if (failure && failure(method, path, body)) { failure = null; return reply(503, {}); }
    if (method === 'POST') {
      assert.equal(path, ''); assert.deepEqual(body.permissions, []);
      assert.ok(body.rowId.length <= 36);
      assert.ok(body.data.pseudo.length <= 24);
      if (rows.has(body.rowId)) return reply(409, {});
      const row = { $id: body.rowId, $createdAt: new Date(now).toISOString(), ...body.data };
      rows.set(row.$id, row); return reply(201, row);
    }
    assert.equal(method, 'GET', 'Security state and results must never use upsert or PATCH');
    if (path) return rows.has(path.slice(1)) ? reply(200, rows.get(path.slice(1))) : reply(404, {});
    let result = [...rows.values()].sort((a, b) => a.$id.localeCompare(b.$id));
    const queries = url.searchParams.getAll('queries[]').map(q => JSON.parse(q));
    for (const q of queries) {
      if (q.method === 'startsWith') result = result.filter(r => r[q.attribute].startsWith(q.values[0]));
      if (q.method === 'equal') result = result.filter(r => q.values.includes(r[q.attribute]));
      if (q.method === 'cursorAfter') result = result.slice(result.findIndex(r => r.$id === q.values[0]) + 1);
    }
    const total = result.length;
    const limit = queries.find(q => q.method === 'limit')?.values[0] || 25;
    return reply(200, { rows: result.slice(0, limit), total });
  };
});
function reply(status, value) { return { status, ok: status >= 200 && status < 300, json: async () => structuredClone(value) }; }
async function call(handler, client, payload, method = 'POST', headers = {}) {
  const res = {
    code: 200, headers: {}, value: null,
    setHeader(k, v) { this.headers[k.toLowerCase()] = v; },
    status(code) { this.code = code; return this; },
    json(value) { this.value = value; return this; },
  };
  await handler({ method, headers: { host: 'mission-rose-ten.vercel.app', 'content-type': 'application/json', cookie: client.cookie || '', 'x-vercel-forwarded-for': client.ip || '192.0.2.1', ...headers }, body: payload }, res);
  if (res.headers['set-cookie']) client.cookie = res.headers['set-cookie'].split(';')[0];
  if (res.code === 200 && res.value?.token) client.state = res.value;
  return res;
}
async function start(client, extra = {}) {
  const result = await call(game, client, { action: 'start', name: 'Rose', difficulty: 'easy', language: 'fr', ...extra });
  assert.equal(result.code, 200, JSON.stringify(result.value)); return result.value;
}
function wordLevels(s, language = 'fr') { return data.difficultyScenarioLevels[language]?.[s.difficulty] || (language === 'en' ? data.englishLevels : data.otherLevels[language]) || data.levels; }
function correctChoice(s, language = 'fr') { return s.choices.find(c => c.text === wordLevels(s, language)[s.levelIndex].good[s.roundIndex]).id; }
async function action(client, value) {
  const result = await call(game, client, { token: client.state.token, ...value });
  assert.equal(result.code, 200, JSON.stringify(result.value)); return result.value;
}
async function answer(client, good = true, language = 'fr') {
  now += 500;
  const id = good ? correctChoice(client.state, language) : client.state.choices.find(c => c.id !== correctChoice(client.state, language)).id;
  return action(client, { action: 'answer', choiceId: id });
}
async function play(client, count) {
  for (let i = 0; i < count; i++) {
    await answer(client);
    if (i < count - 1) await action(client, { action: 'next' });
  }
}
test('raw scores and arbitrary score updates are closed, including plausible values', async () => {
  const client = {};
  for (const score of [999999, 1000]) {
    assert.equal((await call(leaderboard, client, { name: 'Hmksenpai', playerId: 'p_' + 'a'.repeat(32), score })).code, 405);
    assert.equal((await call(leaderboard, client, { id: 'p_' + 'a'.repeat(32), score }, 'PATCH')).code, 405);
    assert.equal((await call(game, client, { action: 'start', score })).code, 400);
  }
  assert.equal((await call(referrals, client, { playerId: 'p_' + 'a'.repeat(32) })).code, 410);
  assert.equal(rows.size, 0);
});
test('identity, origin, JSON shape, tokens and progression are enforced', async () => {
  const client = {}, stranger = { ip: '192.0.2.2' };
  assert.equal((await call(game, client, { action: 'answer', token: 'x'.repeat(100) })).code, 401);
  assert.equal((await call(game, client, { action: 'start' }, 'POST', { origin: 'https://evil.example' })).code, 403);
  assert.equal((await call(game, client, 'null')).code, 400);
  assert.equal((await call(game, client, '{')).code, 400);
  await start(client); await start(stranger);
  const token = client.state.token;
  assert.equal((await call(game, stranger, { action: 'answer', token, choiceId: correctChoice(client.state) })).code, 403);
  assert.equal((await call(game, client, { action: 'next', token })).code, 409);
  assert.equal((await call(game, client, { action: 'finish', token })).code, 409);
  assert.equal((await call(game, client, { action: 'answer', token, choiceId: correctChoice(client.state) })).code, 429);
  assert.equal((await call(game, client, { action: 'answer', token: 'A' + token.slice(1), choiceId: 'invalid' })).code, 401);
  assert.equal((await call(game, client, { action: 'answer', token, playerId: stranger.state.playerId })).code, 400);
  assert.equal(client.state.choices[0].type, undefined);
  assert.equal(client.state.choices[0].explanation, undefined);
});
test('answer retries and races cannot multiply points or change a validated answer', async () => {
  const client = {}; await start(client);
  const original = client.state, good = correctChoice(original), bad = original.choices.find(c => c.id !== good).id;
  now += 500;
  const results = await Promise.all([
    call(game, client, { action: 'answer', token: original.token, choiceId: good }),
    call(game, client, { action: 'answer', token: original.token, choiceId: bad }),
  ]);
  assert.deepEqual(results.map(r => r.code).sort(), [200, 409]);
  const retry = await call(game, client, { action: 'answer', token: original.token, choiceId: good });
  assert.equal(retry.code, 200); assert.equal(retry.value.score, 250);
  assert.equal((await call(game, client, { action: 'next', token: original.token })).code, 409);
  const firstNextToken = client.state.token;
  const next1 = await call(game, client, { action: 'next', token: firstNextToken });
  const next2 = await call(game, client, { action: 'next', token: firstNextToken });
  assert.equal(next1.value.roundIndex, 1); assert.equal(next2.value.roundIndex, 1);
  assert.deepEqual(next1.value.choices, next2.value.choices);
  now += 500;
  const answerId = correctChoice(next1.value);
  const answered = await call(game, client, { action: 'answer', token: next1.value.token, choiceId: answerId });
  const answeredRetry = await call(game, client, { action: 'answer', token: next2.value.token, choiceId: answerId });
  assert.equal(answered.value.score, 500); assert.equal(answeredRetry.value.score, 500);
});
test('all 60 answers produce the exact three-difficulty maximum and one player', async () => {
  const client = {}; await start(client); await play(client, 60);
  assert.equal(client.state.score, secure.MAX_GAME_SCORE);
  const token = client.state.token;
  const finish = await action(client, { action: 'finish' });
  assert.equal(finish.score, 43880); assert.equal(finish.totalUniquePlayers, 1);
  const retry = await call(game, client, { action: 'finish', token });
  assert.equal(retry.code, 200); assert.equal(retry.value.score, 43880);
  assert.equal([...rows.keys()].filter(k => k.startsWith('g_')).length, 1);
  const ranking = await call(leaderboard, client, null, 'GET');
  assert.equal(ranking.value.leaders[0].score, 43880);
});
test('daily points, donation categories and retries are bounded on the server', async () => {
  const client = {};
  await start(client, { dailyBonus: true, donationCategories: ['geste-rose', 'geste-rose', 'invalid'] });
  assert.equal(client.state.score, 100);
  await action(client, { action: 'bonus', category: 'elan-rose' });
  const token = client.state.token;
  const bonus = await action(client, { action: 'bonus', category: 'cercle-rose' });
  assert.equal(bonus.score, 400);
  const retry = await call(game, client, { action: 'bonus', token, category: 'cercle-rose' });
  assert.equal(retry.value.score, 400);
  assert.equal((await call(game, client, { action: 'bonus', token: client.state.token, category: 'cercle-rose' })).code, 409);
  await play(client, 4); await action(client, { action: 'finish' });
  const final = await action(client, { action: 'bonus', category: 'ambassadeur-rose' });
  assert.equal(final.score, 2200); assert.equal(final.totalUniquePlayers, 1);
  now += 4000; await start(client, { dailyBonus: true });
  assert.equal(client.state.score, 0);
});
test('legacy and tampered rows never enter the verified leaderboard', async () => {
  const client = {}; await start(client); await play(client, 4); await action(client, { action: 'finish' });
  rows.set('p_' + 'a'.repeat(32), { $id: 'p_' + 'a'.repeat(32), pseudo: 'Hmksenpai', score: 999999 });
  rows.set('g_' + 'b'.repeat(32), { $id: 'g_' + 'b'.repeat(32), pseudo: 'Forged', score: 12000 });
  assert.equal((await call(leaderboard, client, null, 'GET')).value.leaders.length, 1);
  const genuine = [...rows.values()].find(r => r.$id.startsWith('g_') && r.pseudo === 'Rose');
  genuine.score = 1000;
  assert.equal((await call(leaderboard, client, null, 'GET')).value.leaders.length, 0);
  genuine.score = 1500;
  rows.get('h_' + genuine.$id.slice(2)).pseudo = 'é'.repeat(24);
  const result = await call(leaderboard, client, null, 'GET');
  assert.equal(result.code, 200); assert.equal(result.value.leaders.length, 0);
});
test('verified referral rewards are once per invited player and old requests cannot grant them', async () => {
  const referrer = {}, invitee = { ip: '192.0.2.9' };
  await start(referrer); await play(referrer, 20); await action(referrer, { action: 'finish' });
  await start(invitee, { referrerId: referrer.state.playerId }); await play(invitee, 20);
  const original = invitee.state.token;
  const finish = await action(invitee, { action: 'finish' });
  assert.equal(finish.score, 9850); assert.equal(finish.inviteeBonus, 100);
  assert.equal(finish.leaders.find(r => r.id === referrer.state.playerId).score, 10000);
  const retry = await call(game, invitee, { action: 'finish', token: original });
  assert.equal(retry.code, 200); assert.equal(retry.value.score, 9850);
  now += 4000; await start(invitee, { referrerId: referrer.state.playerId }); await play(invitee, 20);
  const second = await action(invitee, { action: 'finish' });
  assert.equal(second.score, 9750); assert.equal(second.inviteeBonus, 0);
  assert.equal(second.leaders.find(r => r.id === referrer.state.playerId).score, 10000);
});
test('a storage failure after consuming a step can be retried without extra points', async () => {
  const client = {}; await start(client); await play(client, 4);
  failure = (method, path, body) => method === 'POST' && body.rowId.startsWith('h_');
  const token = client.state.token;
  assert.equal((await call(game, client, { action: 'finish', token })).code, 503);
  const retry = await call(game, client, { action: 'finish', token });
  assert.equal(retry.code, 200); assert.equal(retry.value.score, 1500);
  assert.equal(retry.value.totalUniquePlayers, 1);
});
test('expired sessions, malformed requests and rapid starts fail safely', async () => {
  const client = {}; await start(client);
  assert.equal((await call(game, client, { action: 'start', name: 'Rose', difficulty: 'easy', language: 'fr' })).code, 429);
  assert.equal((await call(game, client, [] )).code, 400);
  assert.equal((await call(game, client, { action: 'answer', token: client.state.token }, 'POST', { 'content-type': 'text/plain' })).code, 400);
  now += 2 * 60 * 60 * 1000 + 1;
  assert.equal((await call(game, client, { action: 'answer', token: client.state.token, choiceId: correctChoice(client.state) })).code, 401);
});
test('wrong answers remove points, remove the perfect bonus and cannot add points below zero', async () => {
  const client = {}; await start(client);
  await answer(client); await action(client, { action: 'next' });
  await answer(client, false); assert.equal(client.state.score, 130);
  await action(client, { action: 'next' }); await answer(client, false); assert.equal(client.state.score, 10);
  await action(client, { action: 'next' }); await answer(client, false); assert.equal(client.state.score, 400);
  assert.equal(client.state.perfectBonus, 0);
  const final = await action(client, { action: 'finish' }); assert.equal(final.score, 400);
  now += 4000; await start(client); await play(client, 4); await action(client, { action: 'finish' });
  now += 4000; await start(client); await answer(client, false);
  assert.equal(client.state.score, 0);
  await action(client, { action: 'next' }); await answer(client, false);
  await action(client, { action: 'next' }); await answer(client, false);
  await action(client, { action: 'next' }); await answer(client, false);
  const low = await action(client, { action: 'finish' });
  assert.equal(low.score, 400); assert.equal(low.leaders[0].score, 1500); assert.equal(low.totalUniquePlayers, 1);
});
test('even correctly signed referral events cannot exceed the 5000-point cap', async () => {
  const client = {}; await start(client); await play(client, 4); await action(client, { action: 'finish' });
  const c = secure.config(), owner = Buffer.from(client.state.playerId.slice(2), 'hex').toString('base64url');
  for (let n = 0; n < 21; n++) {
    const rowId = secure.id(c, 'r2', 'referral-owner', 'test-invitee-' + n);
    const run = Buffer.from(n.toString(16).padStart(32, '0'), 'hex').toString('base64url');
    await secure.immutable(c, rowId, { pseudo: owner, score: 250 });
    await secure.immutable(c, 'u2' + rowId.slice(2), { pseudo: run, score: 0 });
    await secure.immutable(c, 'q2' + rowId.slice(2), { pseudo: secure.mac(c, 'referral', rowId, owner, run, 250).slice(0, 24), score: 0 });
  }
  const ranking = await call(leaderboard, client, null, 'GET');
  assert.equal(ranking.value.leaders[0].score, 6500);
  assert.equal(secure.MAX_BASE_SCORE + secure.MAX_REFERRALS * 250, 49680);
});
test('all existing languages and difficulty-specific questions are preserved', async () => {
  for (const language of ['fr', 'en', 'es', 'pt', 'ar', 'sw', 'de', 'zh']) {
    for (const difficulty of ['easy', 'medium', 'hard']) {
      const client = {};
      now += 11000;
      await start(client, { language, difficulty });
      for (let i = 0; i < 4; i++) {
        const answerResult = await answer(client, true, language);
        assert.equal(answerResult.correct, true);
        assert.ok(answerResult.explanation);
        if (i < 3) await action(client, { action: 'next' });
      }
      const final = await action(client, { action: 'finish' });
      assert.equal(final.score, difficulty === 'easy' ? 1500 : difficulty === 'medium' ? 2250 : 3000);
    }
  }
});
test.after(() => { Date.now = realNow; });
