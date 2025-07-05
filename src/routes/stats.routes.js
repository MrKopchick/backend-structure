const express = require('express');
const router = express.Router();
const StatsController = require('../controllers/stats.controller');
const { adminMiddleware } = require('../middlewares');

router.get(
    '/',
    adminMiddleware,
    StatsController.getStats
);

module.exports = router;