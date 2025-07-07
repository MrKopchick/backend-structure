const joi = require('joi');

const userSchema = {
    createUserSchema: joi.object({
        id: joi.string().uuid(),
        type: joi.string().required(),
        email: joi.string().email().required(),
        phone: joi.string().pattern(/^\+?3?8?(0\d{9})$/),
        name: joi.string().required(),
        city: joi.string(), 
    }),
    updateUserSchema: joi.object({
        email: joi.string().email(),
        phone: joi.string().pattern(/^\+?3?8?(0\d{9})$/),
        name: joi.string(),
        city: joi.string(),
    }).min(1).unknown(false),

    getUserSchema: joi.object({
        id: joi.string().uuid().required()
    })
}

module.exports = userSchema;