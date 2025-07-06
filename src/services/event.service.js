const { db } = require('../config/database');
const ApiError = require('../utils/apiError');

class EventService {
  async create(eventData) {
    try {
      const oddsData = {
        home_win: eventData.odds.homeWin,
        away_win: eventData.odds.awayWin,
        draw: eventData.odds.draw
      };

      const [odds] = await db('odds')
        .insert(oddsData)
        .returning('*');

      const eventInsertData = {
        type: eventData.type,
        home_team: eventData.homeTeam,
        away_team: eventData.awayTeam,
        start_at: eventData.startAt,
        odds_id: odds.id
      };

      const [event] = await db('event')
        .insert(eventInsertData)
        .returning('*');

      const result = {
        ...event,
        odds
      };

      ['home_team', 'away_team', 'start_at', 'odds_id', 'created_at', 'updated_at'].forEach(key => {
        const camelCaseKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
        result[camelCaseKey] = result[key];
        delete result[key];
      });

      ['home_win', 'away_win', 'created_at', 'updated_at'].forEach(key => {
        const camelCaseKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
        result.odds[camelCaseKey] = result.odds[key];
        delete result.odds[key];
      });

      return result;
    } catch (err) {
      throw new ApiError(500, 'Failed to create event');
    }
  }

  async update(eventId, updateData) {
    try {
      const [event] = await db('event')
        .where('id', eventId)
        .update({ score: updateData.score })
        .returning('*');

      if (!event) {
        throw new ApiError(404, 'Event not found');
      }

      const bets = await db('bet')
        .where('event_id', eventId)
        .andWhere('win', null);

      const [w1, w2] = updateData.score.split(':');
      let result;
      if (+w1 > +w2) result = 'w1';
      else if (+w2 > +w1) result = 'w2';
      else result = 'x';

      await Promise.all(bets.map(async (bet) => {
        if (bet.prediction === result) {
          await db('bet')
            .where('id', bet.id)
            .update({ win: true });

          const [user] = await db('user')
            .where('id', bet.user_id);

          if (user) {
            await db('user')
              .where('id', bet.user_id)
              .update({
                balance: user.balance + (bet.bet_amount * bet.multiplier)
              });
          }
        } else {
          await db('bet')
            .where('id', bet.id)
            .update({ win: false });
        }
      }));

      ['home_team', 'away_team', 'start_at', 'odds_id', 'created_at', 'updated_at'].forEach(key => {
        const camelCaseKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
        event[camelCaseKey] = event[key];
        delete event[key];
      });

      return event;
    } catch (err) {
      throw new ApiError(500, 'Failed to update event');
    }
  }
}

module.exports = new EventService();