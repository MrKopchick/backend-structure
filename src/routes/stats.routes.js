const express = require('express');
const router = express.Router();
const StatsController = require('../controllers/stats.controller');
const { authMiddleware, adminMiddleware } = require('../middlewares');

router.get(
    '/',
    authMiddleware,
    adminMiddleware,
    StatsController.getStats
);

module.exports = router;