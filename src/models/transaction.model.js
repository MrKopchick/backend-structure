const joi = require('joi');

const TransactionSchema = {
    createTransaction: joi.object({
        id: joi.string().uuid(),
        userId: joi.string().uuid().required(),
        cardNumber: joi.string().required(),
        amount: joi.number().min(0).required(),
    }),
}

module.exports = TransactionSchema