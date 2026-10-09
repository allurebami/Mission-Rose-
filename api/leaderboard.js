const MAX_SCORE = 10000000;
const DEFAULT_DATABASE_ID = "6ac7f21e0034b245f8d7";
const DEFAULT_TABLE_ID = "6ac7f26c002d71db0449";

function getAppwriteConfig() {
  const endpoint = (process.env.APPWRITE_ENDPOINT || "https://fra.cloud.appwrite.io/v1").replace(/\/$/, "");
  const projectId = process.env.APPWRITE_PROJECT_ID || "6ac7bb78000880bd15bf";
  const apiKey = process.env.APPWRITE_API_KEY;
  const databaseId = process.env.APPWRITE_DATABASE_ID || DEFAULT_DATABASE_ID;
  const tableId = process.env.APPWRITE_TABLE_ID || DEFAULT_TABLE_ID;
  return endpoint && projectId && apiKey && databaseId && tableId
    ? { endpoint, projectId, apiKey, databaseId, tableId }
    : null;
}

function appwriteHeaders(config) {
  return {
    "Content-Type": "application/json",
    "X-Appwrite-Project": config.projectId,
    "X-Appwrite-Key": config.apiKey,
  };
}

function rowsUrl(config) {
  return `${config.endpoint}/tablesdb/${encodeURIComponent(config.databaseId)}/tables/${encodeURIComponent(config.tableId)}/rows`;
}

async function readLeaderboard(config) {
  const topUrl = new URL(rowsUrl(config));
  topUrl.searchParams.append("queries[]", JSON.stringify({ method: "orderDesc", attribute: "score" }));
  topUrl.searchParams.append("queries[]", JSON.stringify({ method: "startsWith", attribute: "$id", values: ["p_"] }));
  topUrl.searchParams.append("queries[]", JSON.stringify({ method: "limit", values: [5] }));

  const playersUrl = new URL(rowsUrl(config));
  playersUrl.searchParams.append("queries[]", JSON.stringify({ method: "startsWith", attribute: "$id", values: ["p_"] }));
  playersUrl.searchParams.append("queries[]", JSON.stringify({ method: "limit", values: [1] }));

  const [topResponse, playersResponse] = await Promise.all([
    fetch(topUrl, { headers: appwriteHeaders(config) }),
    fetch(playersUrl, { headers: appwriteHeaders(config) }),
  ]);
  if (!topResponse.ok) throw new Error(`Appwrite leaderboard list failed: ${topResponse.status}`);
  if (!playersResponse.ok) throw new Error(`Appwrite player count failed: ${playersResponse.status}`);

  const [topResult, playersResult] = await Promise.all([topResponse.json(), playersResponse.json()]);
  return {
    leaders: (topResult.rows || []).map((row) => ({
      id: row.$id,
      name: row.pseudo,
      score: row.score,
    })),
    totalUniquePlayers: Number.isSafeInteger(playersResult.total) ? playersResult.total : null,
  };
}
function validScore(value) {
  return Number.isSafeInteger(value) && value >= 0 && value <= MAX_SCORE;
}

function parseBody(body) {
  if (typeof body === "string") return JSON.parse(body);
  return body || {};
}

async function handler(req, res) {
  const config = getAppwriteConfig();
  if (!config) return res.status(503).json({ error: "Le classement Appwrite n'est pas encore configuré sur le serveur." });

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
      return res.status(200).json(await readLeaderboard(config));
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

  let url;
  let method;
  let body;

  if (req.method === "POST") {
    const name = typeof payload.name === "string" ? payload.name.trim().replace(/\s+/g, " ") : "";
    const playerId = typeof payload.playerId === "string" ? payload.playerId : "";
    if (!name || name.length > 24 || /[\u0000-\u001f\u007f]/.test(name)) {
      return res.status(400).json({ error: "Pseudo invalide (1 à 24 caractères)." });
    }
    if (!/^p_[a-f0-9]{32}$/.test(playerId)) {
      return res.status(400).json({ error: "Identifiant anonyme invalide." });
    }

    url = `${rowsUrl(config)}/${encodeURIComponent(playerId)}`;
    const existingResponse = await fetch(url, { headers: appwriteHeaders(config) });
    let existing = null;
    if (existingResponse.ok) {
      existing = await existingResponse.json();
    } else if (existingResponse.status !== 404) {
      return res.status(502).json({ error: "Impossible de retrouver le joueur dans Appwrite." });
    }

    method = "PUT";
    body = JSON.stringify({
      data: {
        pseudo: name,
        score: existing && validScore(existing.score) ? Math.max(existing.score, payload.score) : payload.score,
      },
    });
  } else {
    if (typeof payload.id !== "string" || !/^[A-Za-z0-9._-]{1,36}$/.test(payload.id)) {
      return res.status(400).json({ error: "Identifiant de partie invalide." });
    }
    url = `${rowsUrl(config)}/${encodeURIComponent(payload.id)}`;
    method = "PATCH";
    body = JSON.stringify({ data: { score: payload.score } });
  }

  try {
    const response = await fetch(url, { method, headers: appwriteHeaders(config), body });
    if (!response.ok) throw new Error(`Appwrite ${method} failed: ${response.status}`);
    const changed = await response.json();
    const leaderboard = await readLeaderboard(config);
    return res.status(req.method === "POST" ? 201 : 200).json({
      id: changed.$id || payload.id,
      ...leaderboard,
    });
  } catch (error) {
    console.error("Unable to save Mission Rose leaderboard score:", error.message);
    return res.status(502).json({ error: "Impossible d'enregistrer le score mondial." });
  }
}

module.exports = handler;
