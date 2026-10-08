const MAX_SCORE = 10000000;

function getAppwriteConfig() {
  const endpoint = (process.env.APPWRITE_ENDPOINT || "https://fra.cloud.appwrite.io/v1").replace(/\/$/, "");
  const projectId = process.env.APPWRITE_PROJECT_ID || "6ac7bb78000880bd15bf";
  const apiKey = process.env.APPWRITE_API_KEY;
  const databaseId = process.env.APPWRITE_DATABASE_ID;
  const collectionId = process.env.APPWRITE_COLLECTION_ID;
  return endpoint && projectId && apiKey && databaseId && collectionId
    ? { endpoint, projectId, apiKey, databaseId, collectionId }
    : null;
}

function appwriteHeaders(config) {
  return {
    "Content-Type": "application/json",
    "X-Appwrite-Project": config.projectId,
    "X-Appwrite-Key": config.apiKey,
  };
}

function documentsUrl(config) {
  return `${config.endpoint}/databases/${encodeURIComponent(config.databaseId)}/collections/${encodeURIComponent(config.collectionId)}/documents`;
}

async function readTopFive(config) {
  const url = new URL(documentsUrl(config));
  url.searchParams.append("queries[]", JSON.stringify({ method: "orderDesc", attribute: "score" }));
  url.searchParams.append("queries[]", JSON.stringify({ method: "limit", values: [5] }));

  const response = await fetch(url, { headers: appwriteHeaders(config) });
  if (!response.ok) throw new Error(`Appwrite list failed: ${response.status}`);
  const result = await response.json();
  return (result.documents || []).map((document) => ({
    id: document.$id,
    name: document.pseudo,
    score: document.score,
  }));
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

  const url = req.method === "PATCH"
    ? `${documentsUrl(config)}/${encodeURIComponent(payload.id || "")}`
    : documentsUrl(config);
  let method;
  let body;

  if (req.method === "POST") {
    const name = typeof payload.name === "string" ? payload.name.trim().replace(/\s+/g, " ") : "";
    if (!name || name.length > 24 || /[\u0000-\u001f\u007f]/.test(name)) {
      return res.status(400).json({ error: "Pseudo invalide (1 à 24 caractères)." });
    }
    method = "POST";
    body = JSON.stringify({
      documentId: require("crypto").randomUUID(),
      data: { pseudo: name, score: payload.score },
    });
  } else {
    if (typeof payload.id !== "string" || !/^[A-Za-z0-9._-]{1,36}$/.test(payload.id)) {
      return res.status(400).json({ error: "Identifiant de partie invalide." });
    }
    method = "PATCH";
    body = JSON.stringify({ data: { score: payload.score } });
  }

  try {
    const response = await fetch(url, { method, headers: appwriteHeaders(config), body });
    if (!response.ok) throw new Error(`Appwrite ${method} failed: ${response.status}`);
    const changed = await response.json();
    const leaders = await readTopFive(config);
    return res.status(req.method === "POST" ? 201 : 200).json({
      id: changed.$id || payload.id,
      leaders,
    });
  } catch (error) {
    console.error("Unable to save Mission Rose leaderboard score:", error.message);
    return res.status(502).json({ error: "Impossible d'enregistrer le score mondial." });
  }
}

module.exports = handler;
