// Rewards are bound to an authenticated run in /api/game.
module.exports = function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  return res.status(410).json({ error: 'Les bonus sont validés pendant une partie vérifiée. Recharge le jeu.' });
};
