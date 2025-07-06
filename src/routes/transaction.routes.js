const express = require('express');
const router = express.Router();
const TransactionController = require('../controllers/transaction.controller');
const { authMiddleware, adminMiddleware, validate } = require('../middlewares');

const { createTransactionSchema } = require('../models/transaction.model');

router.post(
    '/', 
    validate(createTransactionSchema),
    authMiddleware,
    adminMiddleware,
    TransactionController.createTransaction
);

module.exports = router;