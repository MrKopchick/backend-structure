const { db } = require('../config/db.config');
const ApiError = require('../utils/apiError');

class TransactionService{
    async create(transactionData){
        
        const user = await db('user').where('id', transactionData.userId).first();

        if(!user){
            throw new ApiError(400, 'User does not exist');
        }
        
        try{
            const insertData = {
                user_id: transactionData.userId,
                card_number: transactionData.cardNumber,
                amount: transactionData.amount
            };

            const [newTransaction] = await db('transaction').insert(insertData).returning('*');

            const currentBalance = user.balance + transactionData.amount;
            await db('user').where('id', transactionData.userId).update('balance', currentBalance);
            
            const result = {
                ...newTransaction,
                currentBalance
            };

            ['user_id', 'card_number', 'created_at', 'updated_at'].forEach(key => {
                const camelCaseKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
                result[camelCaseKey] = result[key];
                delete result[key];
            });

            return result;
        }catch(err){
            throw new ApiError(500, 'Internal Server Error');
        }
    }
}

module.exports = new TransactionService();