const BetService = require('../services/bet.service');

class BetController {
  async create(req, res, next) {
    try {
      const newBet = await BetService.create(req.body, req.user.id);
      return res.status(200).json(newBet);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new BetController();