const crypto = require('node:crypto');
const VERSION = 2;
const COOKIE = '__Host-missionRosePlayer';
const MAX_GAME_SCORE = 43880;
const MAX_BASE_SCORE = MAX_GAME_SCORE + 650 + 50 + 100;
const MAX_REFERRALS = 20;

class HttpError extends Error {
  constructor(status, message) { super(message); this.status = status; }
}
function config() {
  if (!process.env.APPWRITE_API_KEY) throw new HttpError(503, 'Le classement est temporairement indisponible.');
  return {
    endpoint: (process.env.APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1').replace(/\/$/, ''),
    projectId: process.env.APPWRITE_PROJECT_ID || '6ac7bb78000880bd15bf',
    databaseId: process.env.APPWRITE_DATABASE_ID || '6ac7f21e0034b245f8d7',
    tableId: process.env.APPWRITE_TABLE_ID || '6ac7f26c002d71db0449',
    apiKey: process.env.APPWRITE_API_KEY,
  };
}
function mac(c, ...parts) {
  return crypto.createHmac('sha256', c.apiKey).update(JSON.stringify(['mission-rose-v2', ...parts])).digest('base64url');
}
function same(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  const left = Buffer.from(a), right = Buffer.from(b);
  return left.length === right.length && crypto.timingSafeEqual(left, right);
}
function id(c, prefix, ...parts) { return prefix + crypto.createHash('sha256').update(mac(c, ...parts)).digest('hex').slice(0, 32); }
function seal(c, value) {
  const key = crypto.createHmac('sha256', c.apiKey).update('mission-rose-v2-encryption').digest();
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  cipher.setAAD(Buffer.from('mission-rose-v2'));
  const encrypted = Buffer.concat([cipher.update(JSON.stringify(value)), cipher.final()]);
  return Buffer.concat([iv, cipher.getAuthTag(), encrypted]).toString('base64url');
}
function open(c, token, kind) {
  try {
    if (typeof token !== 'string' || !/^[\w-]{40,4096}$/.test(token)) throw new Error();
    const bytes = Buffer.from(token, 'base64url');
    const key = crypto.createHmac('sha256', c.apiKey).update('mission-rose-v2-encryption').digest();
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, bytes.subarray(0, 12));
    decipher.setAAD(Buffer.from('mission-rose-v2'));
    decipher.setAuthTag(bytes.subarray(12, 28));
    const value = JSON.parse(Buffer.concat([decipher.update(bytes.subarray(28)), decipher.final()]).toString());
    if (value.version !== VERSION || value.kind !== kind || !Number.isSafeInteger(value.expiresAt) || value.expiresAt < Date.now()) throw new Error();
    return value;
  } catch { throw new HttpError(401, 'Partie invalide ou expirée. Recommence une partie.'); }
}
function player(c, req, res, create = false) {
  const token = (req.headers.cookie || '').split(';').map(s => s.trim()).find(s => s.startsWith(COOKIE + '='))?.slice(COOKIE.length + 1);
  let identity;
  if (token) {
    try { identity = open(c, token, 'player'); } catch { /* Issue a new identity only when starting. */ }
  }
  if (identity && /^p_[a-f0-9]{32}$/.test(identity.player)) return identity.player;
  if (!create) throw new HttpError(401, 'Identité de partie invalide. Recommence une partie.');
  identity = { kind: 'player', version: VERSION, player: 'p_' + crypto.randomBytes(16).toString('hex'), expiresAt: Date.now() + 365 * 86400000 };
  res.setHeader('Set-Cookie', `${COOKIE}=${seal(c, identity)}; Path=/; Max-Age=31536000; HttpOnly; Secure; SameSite=Strict`);
  return identity.player;
}
function guard(req, res, methods) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  if (!methods.includes(req.method)) {
    res.setHeader('Allow', methods.join(', '));
    throw new HttpError(405, 'Méthode non autorisée.');
  }
  if (req.headers.origin) {
    let host;
    try { host = new URL(req.headers.origin).host; } catch { throw new HttpError(403, 'Origine non autorisée.'); }
    if (host !== req.headers.host) throw new HttpError(403, 'Origine non autorisée.');
  }
  if (req.headers['sec-fetch-site'] === 'cross-site') throw new HttpError(403, 'Origine non autorisée.');
}
function body(req) {
  try {
    if (!String(req.headers['content-type'] || '').toLowerCase().startsWith('application/json')) throw new Error();
    const encoded = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    if (!encoded || Buffer.byteLength(encoded) > 8192) throw new Error();
    const value = JSON.parse(encoded);
    if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error();
    return value;
  } catch { throw new HttpError(400, 'Requête invalide.'); }
}
function rowsUrl(c) { return `${c.endpoint}/tablesdb/${encodeURIComponent(c.databaseId)}/tables/${encodeURIComponent(c.tableId)}/rows`; }
async function request(c, path = '', method = 'GET', data) {
  return fetch(rowsUrl(c) + path, {
    method, headers: { 'Content-Type': 'application/json', 'X-Appwrite-Project': c.projectId, 'X-Appwrite-Key': c.apiKey },
    ...(data ? { body: JSON.stringify(data) } : {}), signal: AbortSignal.timeout(10000),
  });
}
async function get(c, rowId) {
  const response = await request(c, '/' + encodeURIComponent(rowId));
  if (response.status === 404) return null;
  if (!response.ok) throw new HttpError(503, 'Le classement est temporairement indisponible.');
  return response.json();
}
async function create(c, rowId, data) {
  const response = await request(c, '', 'POST', { rowId, data, permissions: [] });
  if (response.status === 409) return null;
  if (!response.ok) throw new HttpError(503, 'Impossible de valider la partie pour le moment.');
  return response.json();
}
async function immutable(c, rowId, data) {
  const row = await create(c, rowId, data) || await get(c, rowId);
  if (!row || row.pseudo !== data.pseudo || row.score !== data.score) throw new HttpError(409, 'Cette action a déjà été utilisée.');
  return row;
}
async function list(c, queries) {
  const params = new URLSearchParams();
  for (const q of queries) params.append('queries[]', JSON.stringify(q));
  const response = await request(c, '?' + params.toString());
  if (!response.ok) throw new HttpError(503, 'Impossible de lire le classement pour le moment.');
  return response.json();
}
async function all(c, prefix) {
  const rows = [];
  let cursor;
  for (let page = 0; page < 100; page++) {
    const queries = [{ method: 'startsWith', attribute: '$id', values: [prefix] }, { method: 'limit', values: [100] }];
    if (cursor) queries.push({ method: 'cursorAfter', values: [cursor] });
    const result = await list(c, queries);
    rows.push(...(result.rows || []));
    if ((result.rows || []).length < 100) return rows;
    cursor = result.rows.at(-1).$id;
  }
  throw new HttpError(503, 'Le classement est temporairement indisponible.');
}
async function associated(c, rows, prefixes) {
  const found = new Map();
  for (let index = 0; index < rows.length; index += 40) {
    const ids = rows.slice(index, index + 40).flatMap(row => prefixes.map(prefix => prefix + row.$id.slice(2)));
    if (!ids.length) continue;
    const result = await list(c, [{ method: 'equal', attribute: '$id', values: ids }, { method: 'limit', values: [100] }]);
    for (const row of result.rows || []) found.set(row.$id, row);
  }
  return found;
}
function compact(pid) { return Buffer.from(pid.slice(2), 'hex').toString('base64url'); }
function expand(value) {
  return typeof value === 'string' && /^[\w-]{22}$/.test(value) ? 'p_' + Buffer.from(value, 'base64url').toString('hex') : null;
}
async function referralCounts(c) {
  const rows = await all(c, 'r2');
  const proofs = await associated(c, rows, ['q2', 'u2']);
  const counts = new Map();
  for (const row of rows) {
    const owner = expand(row.pseudo), run = proofs.get('u2' + row.$id.slice(2))?.pseudo;
    const proof = proofs.get('q2' + row.$id.slice(2));
    if (!owner || !run || row.score !== 250 || !same(proof?.pseudo, mac(c, 'referral', row.$id, row.pseudo, run, 250).slice(0, 24))) continue;
    counts.set(owner, Math.min(MAX_REFERRALS, (counts.get(owner) || 0) + 1));
  }
  return counts;
}
async function leaderboard(c) {
  const [rows, referrals] = await Promise.all([all(c, 'g_'), referralCounts(c)]);
  const proofs = await associated(c, rows, ['h_', 'o_']);
  const best = new Map();
  for (const row of rows) {
    const owner = proofs.get('o_' + row.$id.slice(2))?.pseudo, pid = expand(owner);
    const proof = proofs.get('h_' + row.$id.slice(2));
    if (!pid || !Number.isSafeInteger(row.score) || row.score < 0 || row.score > MAX_BASE_SCORE ||
        !same(proof?.pseudo, mac(c, 'score', row.$id, owner, row.pseudo, row.score).slice(0, 24))) continue;
    const entry = { id: pid, name: row.pseudo, score: row.score + (referrals.get(pid) || 0) * 250 };
    if (!best.has(pid) || entry.score > best.get(pid).score) best.set(pid, entry);
  }
  return { leaders: [...best.values()].sort((a, b) => b.score - a.score || a.id.localeCompare(b.id)).slice(0, 5), totalUniquePlayers: best.size, verified: true, scoringVersion: VERSION };
}
async function save(c, s) {
  if (!Number.isSafeInteger(s.score) || s.score < 0 || s.score > MAX_BASE_SCORE) throw new HttpError(409, 'Score incohérent.');
  const rowId = id(c, 'g_', 'result', s.run, s.seq);
  const owner = compact(s.player);
  await immutable(c, 'o_' + rowId.slice(2), { pseudo: owner, score: 0 });
  await immutable(c, rowId, { pseudo: s.name, score: s.score });
  await immutable(c, 'h_' + rowId.slice(2), { pseudo: mac(c, 'score', rowId, owner, s.name, s.score).slice(0, 24), score: 0 });
}
async function completed(c, pid) {
  const row = await get(c, 'c_' + pid.slice(2));
  return !!row && row.score === 1 && same(row.pseudo, mac(c, 'completed', pid).slice(0, 24));
}
async function rewardReferral(c, s) {
  if (s.inviteeBonus || s.answers < 20 || !/^p_[a-f0-9]{32}$/.test(s.referrer || '') || s.referrer === s.player || !await completed(c, s.referrer)) return;
  const referralId = id(c, 'r2', 'referral-owner', s.player);
  const run = Buffer.from(s.run, 'hex').toString('base64url');
  const old = await get(c, referralId);
  if (!old && await completed(c, s.player)) return;
  try {
    const ref = { pseudo: compact(s.referrer), score: 250 };
    await immutable(c, referralId, ref);
    await immutable(c, 'u2' + referralId.slice(2), { pseudo: run, score: 0 });
    await immutable(c, 'q2' + referralId.slice(2), { pseudo: mac(c, 'referral', referralId, ref.pseudo, run, 250).slice(0, 24), score: 0 });
  } catch (error) { if (error.status === 409) return; throw error; }
  s.score += 100;
  s.inviteeBonus = true;
}
async function markCompleted(c, pid) {
  await immutable(c, 'c_' + pid.slice(2), { pseudo: mac(c, 'completed', pid).slice(0, 24), score: 1 });
}
async function consume(c, s, action, value) {
  const fingerprint = mac(c, 'transition', s.run, s.seq, action, value || '').slice(0, 24);
  const record = await immutable(c, id(c, 't_', 'transition', s.run, s.seq), { pseudo: fingerprint, score: 1 });
  const timestamp = Date.parse(record.$createdAt);
  if (!Number.isFinite(timestamp)) throw new HttpError(503, 'Impossible de valider la partie.');
  return timestamp;
}
async function rateLimit(c, key, bucketMs, slots) {
  const bucket = Math.floor(Date.now() / bucketMs);
  for (let slot = 0; slot < slots; slot++) {
    if (await create(c, id(c, 'z_', 'rate', key, bucket, slot), { pseudo: 'rate-v2', score: 0 })) return;
  }
  throw new HttpError(429, 'Trop de parties démarrées. Patiente quelques secondes.');
}
module.exports = { VERSION, MAX_GAME_SCORE, MAX_BASE_SCORE, MAX_REFERRALS, HttpError, config, mac, id, seal, open, player, guard, body, get, create, immutable, leaderboard, save, completed, rewardReferral, markCompleted, consume, rateLimit, referralCounts };
