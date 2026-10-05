const PRODUCT_IDS = new Set([
  "prd_gz0nbtei",
  "prd_3lo0zuwp",
  "prd_0ub0fd3d",
  "prd_hp8bw4xy",
]);

const API_URL = "https://api.chariow.com/v1/sales";

async function handler(req, res) {
  res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Méthode non autorisée." });
  }

  const apiKey = process.env.CHARIOW_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: "La collecte sera bientôt disponible." });
  }

  try {
    let cursor = "";
    let total = 0;
    let currency = "XAF";
    let pageCount = 0;

    do {
      const url = new URL(API_URL);
      url.searchParams.set("per_page", "100");
      if (cursor) url.searchParams.set("cursor", cursor);

      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${apiKey}` },
      });

      if (!response.ok) {
        throw new Error(`Chariow API returned ${response.status}`);
      }

      const result = await response.json();
      const sales = Array.isArray(result.data) ? result.data : result.data?.data;
      if (!Array.isArray(sales)) throw new Error("Réponse Chariow invalide");

      for (const sale of sales) {
        if (!PRODUCT_IDS.has(sale.product?.id)) continue;
        if (!["completed", "settled"].includes(sale.status) || sale.payment?.status !== "success") continue;

        const amount = sale.payment?.amount || sale.amount;
        const value = Number(amount?.value);
        if (!Number.isFinite(value) || value < 0) continue;

        const saleCurrency = amount?.currency || "XAF";
        if (total > 0 && saleCurrency !== currency) {
          throw new Error("Plusieurs devises détectées pour les dons");
        }
        currency = saleCurrency;
        total += value;
      }

      const pagination = result.pagination || result.data?.pagination || {};
      cursor = pagination.has_more ? pagination.next_cursor || "" : "";
      pageCount += 1;
    } while (cursor && pageCount < 100);

    return res.status(200).json({ total, currency, updatedAt: new Date().toISOString() });
  } catch (error) {
    console.error("Unable to load Mission Rose donations:", error.message);
    return res.status(502).json({ error: "Impossible de récupérer le total des dons." });
  }
}

module.exports = handler;
