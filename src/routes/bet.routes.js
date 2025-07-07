const express = require('express');
const router = express.Router()
const BetController = require('../controllers/bet.controller');
const { authMiddleware, validate } = require('../middlewares');

const { createBet } = require('../models/bet.model');

router.post(
    '/',
    validate(createBet),  
    authMiddleware, 
    BetController.create
);

module.exports = router;