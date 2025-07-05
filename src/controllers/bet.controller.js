const BetService = require('../services/bet.service');

class BetController {
    async create(req, res, next){
        try{
            const newBet = await BetService.create(req.body);
            return res.status(201).json(newBet);
        }catch(err){
            next(err);
        }
    }
}

module.exports = new BetController();