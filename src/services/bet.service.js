const { db } = require('../config/db.config');
const ApiError = require('../utils/apiError');

class BetService {
  async create(betData, userId) {
    try {
      if (!betData.eventId || !betData.betAmount || !betData.prediction) {
        throw new ApiError(400, 'Missing required fields');
      }

      const [user] = await db('user').where('id', userId);
      if (!user) {
        throw new ApiError(400, 'User does not exist');
      }

      if (Number(user.balance) < Number(betData.betAmount)) {
        throw new ApiError(400, 'Not enough balance');
      }

      const [event] = await db('event').where('id', betData.eventId);
      if (!event) {
        throw new ApiError(404, 'Event not found');
      }

      const [odds] = await db('odds').where('id', event.odds_id);
      if (!odds) {
        throw new ApiError(404, 'Odds not found');
      }

      let multiplier;
      switch (betData.prediction) {
        case 'w1':
          multiplier = odds.home_win;
          break;
        case 'w2':
          multiplier = odds.away_win;
          break;
        case 'x':
          multiplier = odds.draw;
          break;
        default:
          throw new ApiError(400, 'Invalid prediction');
      }

      const insertData = {
        user_id: userId,
        event_id: betData.eventId,
        bet_amount: betData.betAmount,
        prediction: betData.prediction,
        multiplier
      };

      const [bet] = await db('bet').insert(insertData).returning('*');

      const currentBalance = Number(user.balance) - Number(betData.betAmount);
      await db('user').where('id', userId).update({ balance: currentBalance });

      const transformedBet = this._transformKeysToCamelCase(bet);

      return {
        ...transformedBet,
        currentBalance
      };
    } catch (err) {
      if (err instanceof ApiError) throw err;
      throw new ApiError(500, 'Internal Server Error');
    }
  }

  _transformKeysToCamelCase(obj) {
    const result = { ...obj };
    Object.keys(result).forEach(key => {
      if (key.includes('_')) {
        const camelCaseKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
        result[camelCaseKey] = result[key];
        delete result[key];
      }
    });
    return result;
  }
}

module.exports = new BetService();