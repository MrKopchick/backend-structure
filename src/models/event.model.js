const Joi = require('joi');

const eventSchemas = {
    
  createEvent: Joi.object({
    type: Joi.string().valid('football', 'basketball', 'tennis').required(),
    homeTeam: Joi.string().min(2).required(),
    awayTeam: Joi.string().min(2).required(),
    startAt: Joi.date().iso().greater('now').required(),
    odds: Joi.object({
      homeWin: Joi.number().min(1.01).required(),
      awayWin: Joi.number().min(1.01).required(),
      draw: Joi.number().min(1.01).required()
    }).required()
  }),

  updateEvent: Joi.object({
    score: Joi.string().pattern(/^\d+:\d+$/).required()
  }),

  getEvent: Joi.object({
    id: Joi.string().uuid().required()
  })
};

module.exports = eventSchemas;