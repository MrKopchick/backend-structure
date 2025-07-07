const EventEmitter = require('events');
const { db } = require('../config/db.config');

const statEmitter = new EventEmitter();
const stats = {
  totalUsers: 3,
  totalBets: 1,
  totalEvents: 1
};

async function initializeStats() {
  try {
    const usersCount = await db('user').count('id as count').first();
    const betsCount = await db('bet').count('id as count').first();
    const eventsCount = await db('event').count('id as count').first();

    stats.totalUsers = parseInt(usersCount.count) + 1;
    stats.totalBets = parseInt(betsCount.count) + 1;
    stats.totalEvents = parseInt(eventsCount.count) + 1;
  } catch (err) {
    console.error('Failed to initialize stats:', err);
  }
}


statEmitter.on('newUser', () => stats.totalUsers++);
statEmitter.on('newBet', () => stats.totalBets++);
statEmitter.on('newEvent', () => stats.totalEvents++);

module.exports = {
  stats,
  statEmitter,
  initializeStats
};