const Joi = require('joi');

const statsSchema = Joi.object({
  totalUsers: Joi.number().min(0).required(),
  totalBets: Joi.number().min(0).required(),
  totalEvents: Joi.number().min(0).required()
});

module.exports = {
  statsResponse: statsSchema
};