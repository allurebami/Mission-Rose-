const BLOCKED_TERMS = [
  /\b(insulte|insulter|ordure|idiot|imbecile|connard|salope|pute|merde|batard)\b/i,
  /\b(politique|parti politique|election|candidat|gouvernement|president)\b/i,
  /\b(religion|religieux|eglise|mosquee|dieu|jesus|allah|satan)\b/i,
  /\b(sexuel|sexe|pornographie|porno|viol|violer|agression sexuelle)\b/i,
  /\b(arme|tuer|meurtre|suicide|menace|violence|frapper|terrorisme)\b/i,
  /\b(acheter|promo|promotion|bitcoin|crypto|casino|pariez|pari sportif|recrutement)\b/i,
];
function normalize(value) { return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("fr"); }
function isBlockedMessage(value) {
  const normalized = normalize(value);
  return /https?:\/\/|www\.|\b[\w.+-]+@[\w.-]+\.[a-z]{2,}\b/i.test(value)
    || /(?:\+?\d[\d ()-]{7,}\d)/.test(value)
    || BLOCKED_TERMS.some((pattern) => pattern.test(normalized));
}
const recentPosts = globalThis.__missionRoseRecentPosts || (globalThis.__missionRoseRecentPosts = new Map());
const GAME_URL = "https://mission-rose-ten.vercel.app/";

function configuration() {
  return process.env.META_PAGE_ID && process.env.META_PAGE_ACCESS_TOKEN && process.env.META_GRAPH_API_VERSION;
}
function send(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(body));
}
module.exports = async function handler(req, res) {
  if (req.method === "GET") return send(res, 200, { configured: Boolean(configuration()) });
  if (req.method !== "POST") {
    res.setHeader("Allow", "GET, POST");
    return send(res, 405, { error: "Méthode non autorisée." });
  }
  if (!configuration()) return send(res, 503, { error: "La Page Facebook n’est pas encore connectée." });
  let data = req.body;
  if (typeof data === "string") {
    try { data = JSON.parse(data); } catch { data = null; }
  }
  if (!data || data.consent !== true || typeof data.message !== "string") return send(res, 400, { error: "Message ou consentement invalide." });
  const message = data.message.trim().replace(/\s+/g, " ");
  if (message.length < 10 || message.length > 280) return send(res, 400, { error: "Le message doit contenir entre 10 et 280 caractères." });
  if (isBlockedMessage(message)) return send(res, 400, { error: "Ce message contient un thème, un lien ou des coordonnées qui ne sont pas autorisés." });
  const pseudo = String(data.pseudo || "").trim().replace(/\s+/g, " ");
  if (!pseudo || pseudo.length > 24 || /[<>\r\n]/.test(pseudo)) {
    return send(res, 400, { error: "Pseudo invalide." });
  }
  const ip = String(req.headers["x-forwarded-for"] || "unknown").split(",")[0].trim();
  const now = Date.now();
  const last = recentPosts.get(ip) || 0;
  if (now - last < 10 * 60 * 1000) return send(res, 429, { error: "Merci d’attendre 10 minutes avant un autre message." });
  const fullMessage = [
    message,
    "— " + pseudo,
    GAME_URL,
    "Avec le soutien de ellegagne.com",
    "#OctobreRose #NONAUCANCERDUSEINS #MissionRose",
  ].join("\n");
  const version = String(process.env.META_GRAPH_API_VERSION).replace(/^v/, "");
  const url = "https://graph.facebook.com/v" + version + "/" + encodeURIComponent(process.env.META_PAGE_ID) + "/feed";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Authorization": "Bearer " + process.env.META_PAGE_ACCESS_TOKEN, "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ message: fullMessage }),
    });
    const result = await response.json();
    if (!response.ok || !result.id) return send(res, 502, { error: "Facebook n’a pas accepté la publication." });
    recentPosts.set(ip, now);
    return send(res, 200, { published: true, postId: result.id });
  } catch {
    return send(res, 502, { error: "Facebook est momentanément indisponible." });
  }
};
