const Joi = require('joi');

module.exports = {
  jwtSecretSchema: Joi.object({
    JWT_SECRET: Joi.string()
      .min(32)
      .required()
      .description('JWT Secret Key (min 32 chars)'),
    JWT_EXPIRES_IN: Joi.string()
      .default('1h')
      .description('JWT Expiration time')
  })
};