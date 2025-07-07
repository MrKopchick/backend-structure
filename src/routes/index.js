const express = require('express');
const router = express.Router();

const userRoutes = require('./user.routes');
const betRoutes = require('./bet.routes');
const eventRoutes = require('./event.routes');
const transactionRoutes = require('./transaction.routes');
const statsRoutes = require('./stats.routes');

router.use('/users', userRoutes);
router.use('/bets', betRoutes);
router.use('/events', eventRoutes);
router.use('/transactions', transactionRoutes);
router.use('/stats', statsRoutes);

router.get("/health", (req, res) => {
  res.send("Hello World!");
});

router.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

module.exports = router;