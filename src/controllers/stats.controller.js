const { stats } = require('../services/stats.service');

class StatsController {
  async getStats(req, res) {
    try {
      res.json(stats);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = new StatsController();