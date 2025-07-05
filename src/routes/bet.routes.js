const express = require('express');
const router = express.Router()
const BetController = require('../controllers/events.controller');
const { authMiddleware, validate } = require('../middlewares');

const { createBetSchema } = require('../models/event.model');

router.post(
    '/',
    validate(createBetSchema),  
    authMiddleware, 
    BetController.create
);

module.exports = router;