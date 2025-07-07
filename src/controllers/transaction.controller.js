const TransactionService = require('../services/transaction.service');

class TransactionController {
    async create(req, res, next){
        try{
            const newTransaction = await TransactionService.create(req.body);
            res.status(200).json(newTransaction); 
        }catch(err){
            next(err);
        }
    }
}

module.exports = new TransactionController();