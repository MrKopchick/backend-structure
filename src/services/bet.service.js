const { db } = require('../config/database');
const ApiError = require('../utils/apiError');

class BetService {
  async create(betData) {
    try {
        const user = await db('user').where('id', betData.userId).first();

        if (!user) throw new ApiError(400, 'User does not exist');

        if (user.balance < betData.betAmount) throw new ApiError(400, 'Not enough balance');

        const event = await db('event').where('id', betData.eventId).first();
        
        if (!event) throw new ApiError(404, 'Event not found');

        const odds = await db('odds').where('id', event.odds_id).first();
        
        if (!odds) throw new ApiError(404, 'Odds not found');

        let multiplier;

        switch (betData.prediction) {
            case 'w1': multiplier = odds.home_win; break;
            case 'w2': multiplier = odds.away_win; break;
            case 'x': multiplier = odds.draw; break;
            default: throw new ApiError(400, 'Invalid prediction');
        }

        const insertData = {
            user_id: betData.userId,
            event_id: betData.eventId,
            bet_amount: betData.betAmount,
            prediction: betData.prediction,
            multiplier
        };

        const [newBet] = await db('bet').insert(insertData).returning('*');

        const currentBalance = user.balance - betData.betAmount;
        
        await db('user').where('id', betData.userId).update('balance', currentBalance);

        const result = {
            ...newBet,
            currentBalance
        };

        ['user_id', 'event_id', 'bet_amount', 'created_at', 'updated_at'].forEach(key => {
            const camelCaseKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
            result[camelCaseKey] = result[key];
            delete result[key];
        });

        return result;
    } catch (err) {
        if (err instanceof ApiError) throw err;
        throw new ApiError(500, 'Internal Server Error');
    }
  }
}

module.exports = new BetService();