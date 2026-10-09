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

function validPlayerId(value) {
  return typeof value === "string" && /^p_[a-f0-9]{32}$/.test(value);
}

async function getRow(config, id) {
  const response = await fetch(`${rowsUrl(config)}/${encodeURIComponent(id)}`, {
    headers: appwriteHeaders(config),
  });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Appwrite row lookup failed: ${response.status}`);
  return response.json();
}

async function updateScore(config, id, score) {
  const response = await fetch(`${rowsUrl(config)}/${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: appwriteHeaders(config),
    body: JSON.stringify({ data: { score } }),
  });
  if (!response.ok) throw new Error(`Appwrite score update failed: ${response.status}`);
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

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Méthode non autorisée." });
  }

  let payload;
  try {
    payload = parseBody(req.body);
  } catch {
    return res.status(400).json({ error: "Corps de requête invalide." });
  }

  const playerId = payload.playerId;
  const referrerId = payload.referrerId;
  if (!validPlayerId(playerId) || !validPlayerId(referrerId) || playerId === referrerId) {
    return res.status(400).json({ error: "Lien de parrainage invalide." });
  }

  const referralRowId = `r_${playerId}`;
  try {
    const [invitee, referrer, previousReferral] = await Promise.all([
      getRow(config, playerId),
      getRow(config, referrerId),
      getRow(config, referralRowId),
    ]);

    if (previousReferral) return res.status(200).json({ processed: true, duplicate: true, inviteeBonus: 0 });
    if (!invitee || !referrer) {
      return res.status(409).json({ error: "Les deux joueurs doivent avoir terminé une partie avant de valider le parrainage." });
    }
    if (!Number.isSafeInteger(invitee.score) || !Number.isSafeInteger(referrer.score)) {
      return res.status(409).json({ error: "Score de joueur invalide." });
    }

    const compactReferrerId = Buffer.from(referrerId.slice(2), "hex").toString("base64url");
    const createResponse = await fetch(`${rowsUrl(config)}/${encodeURIComponent(referralRowId)}`, {
      method: "PUT",
      headers: appwriteHeaders(config),
      body: JSON.stringify({ data: { pseudo: compactReferrerId, score: 1 } }),
    });
    if (!createResponse.ok) {
      if (createResponse.status === 409) {
        return res.status(200).json({ processed: true, duplicate: true, inviteeBonus: 0 });
      }
      throw new Error(`Appwrite referral record creation failed: ${createResponse.status}`);
    }

    const inviteeScore = Math.min(MAX_SCORE, invitee.score + 100);
    const referrerScore = Math.min(MAX_SCORE, referrer.score + 250);
    await Promise.all([
      updateScore(config, playerId, inviteeScore),
      updateScore(config, referrerId, referrerScore),
    ]);

    return res.status(200).json({
      processed: true,
      duplicate: false,
      inviteeBonus: 100,
      inviteeScore,
      referrerBonus: 250,
    });
  } catch (error) {
    console.error("Unable to process Mission Rose referral:", error.message);
    return res.status(502).json({ error: "Impossible de valider le parrainage pour le moment." });
  }
}

module.exports = handler;
