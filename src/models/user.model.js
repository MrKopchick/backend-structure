const joi = require('joi');

const userSchema = {
    createUser: joi.object({
        id: joi.string().uuid(),
        type: joi.string().required(),
        email: joi.string().email().required(),
        phone: joi.string().pattern(/^\+?3?8?(0\d{9})$/).required(),
        name: joi.string().required(),
        city: joi.string(), 
    }),
    updateUser: joi.object({
        email: joi.string().email(),
        phone: joi.string().pattern(/^\+?3?8?(0\d{9})$/),
        name: joi.string(),
        city: joi.string(),
    }).min(1),

    getUser: Joi.object({
        id: Joi.string().uuid().required()
    })
}

module.exports = userSchema;