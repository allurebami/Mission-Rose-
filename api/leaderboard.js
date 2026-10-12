const secure = require('../lib/secure-scores');

module.exports = async function handler(req, res) {
  try {
    secure.guard(req, res, ['GET']);
    return res.status(200).json(await secure.leaderboard(secure.config()));
  } catch (error) {
    if (!error.status) console.error('Mission Rose leaderboard validation unavailable.');
    return res.status(error.status || 503).json({ error: error.status ? error.message : 'Classement temporairement indisponible.' });
  }
};
