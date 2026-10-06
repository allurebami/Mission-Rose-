const TABLE = "mission_rose_scores";
const MAX_SCORE = 10000000;

function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  return url && key ? { url, key } : null;
}

function supabaseHeaders(key, extra = {}) {
  const headers = { apikey: key, "Content-Type": "application/json", ...extra };
  // New sb_secret keys are API keys, not JWTs. Legacy service_role keys need a bearer header.
  if (!key.startsWith("sb_secret_")) headers.Authorization = `Bearer ${key}`;
  return headers;
}

async function readTopFive(config) {
  const url = new URL(`${config.url}/rest/v1/${TABLE}`);
  url.searchParams.set("select", "id,player_name,score");
  url.searchParams.set("order", "score.desc,created_at.asc");
  url.searchParams.set("limit", "5");
  const response = await fetch(url, { headers: supabaseHeaders(config.key) });
  if (!response.ok) throw new Error(`Supabase GET failed: ${response.status}`);
  const rows = await response.json();
  return rows.map((row) => ({ id: row.id, name: row.player_name, score: row.score }));
}

function validScore(value) {
  return Number.isSafeInteger(value) && value >= 0 && value <= MAX_SCORE;
}

function parseBody(body) {
  if (typeof body === "string") return JSON.parse(body);
  return body || {};
}

async function handler(req, res) {
  const config = getSupabaseConfig();
  if (!config) return res.status(503).json({ error: "Le classement mondial n'est pas encore configuré." });

  const origin = req.headers.origin;
  const host = req.headers.host;
  if (origin && host) {
    try {
      if (new URL(origin).host !== host) return res.status(403).json({ error: "Origine non autorisée." });
    } catch {
      return res.status(403).json({ error: "Origine non autorisée." });
    }
  }

  if (req.method === "GET") {
    res.setHeader("Cache-Control", "s-maxage=30, stale-while-revalidate=60");
    try {
      return res.status(200).json({ leaders: await readTopFive(config) });
    } catch (error) {
      console.error("Unable to read Mission Rose leaderboard:", error.message);
      return res.status(502).json({ error: "Impossible de charger le classement mondial." });
    }
  }

  if (req.method !== "POST" && req.method !== "PATCH") {
    res.setHeader("Allow", "GET, POST, PATCH");
    return res.status(405).json({ error: "Méthode non autorisée." });
  }

  let payload;
  try {
    payload = parseBody(req.body);
  } catch {
    return res.status(400).json({ error: "Corps de requête invalide." });
  }

  if (!validScore(payload.score)) return res.status(400).json({ error: "Score invalide." });

  const url = new URL(`${config.url}/rest/v1/${TABLE}`);
  const headers = supabaseHeaders(config.key, { Prefer: "return=representation" });
  let method;
  let body;

  if (req.method === "POST") {
    const name = typeof payload.name === "string" ? payload.name.trim().replace(/\s+/g, " ") : "";
    if (!name || name.length > 24 || /[\u0000-\u001f\u007f]/.test(name)) {
      return res.status(400).json({ error: "Nom invalide (1 à 24 caractères)." });
    }
    method = "POST";
    body = JSON.stringify({ player_name: name, score: payload.score });
  } else {
    if (typeof payload.id !== "string" || !/^[0-9a-f-]{36}$/i.test(payload.id)) {
      return res.status(400).json({ error: "Identifiant de partie invalide." });
    }
    url.searchParams.set("id", `eq.${payload.id}`);
    method = "PATCH";
    body = JSON.stringify({ score: payload.score });
  }

  try {
    const response = await fetch(url, { method, headers, body });
    if (!response.ok) throw new Error(`Supabase ${method} failed: ${response.status}`);
    const changed = await response.json();
    if (req.method === "PATCH" && !changed.length) {
      return res.status(404).json({ error: "Score introuvable." });
    }
    const leaders = await readTopFive(config);
    return res.status(req.method === "POST" ? 201 : 200).json({
      id: changed[0]?.id || payload.id,
      leaders,
    });
  } catch (error) {
    console.error("Unable to save Mission Rose leaderboard score:", error.message);
    return res.status(502).json({ error: "Impossible d'enregistrer le score mondial." });
  }
}

module.exports = handler;
