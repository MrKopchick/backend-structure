const Joi = require('joi');

module.exports = {
  envSchema: Joi.object({
    DATABASE_PORT: Joi.number()
      .required()
      .description('Database port number'),
    DATABASE_HOST: Joi.string()
      .required()
      .description('Database host address'),
    DATABASE_NAME: Joi.string()
      .required()
      .description('Database name'),
    DATABASE_USER: Joi.string()
      .required()
      .description('Database username'),
    DATABASE_ACCESS_KEY: Joi.string()
      .required()
      .description('Database password/access key'),
    JWT_SECRET: Joi.string()
      .min(8)
      .required()
      .description('JWT secret key')
  }).unknown(true)
};