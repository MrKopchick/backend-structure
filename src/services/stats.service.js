const EventEmitter = require('events');
const { db } = require('../config/database');

const statEmitter = new EventEmitter();
const stats = {
  totalUsers: 0,
  totalBets: 0,
  totalEvents: 0
};

async function initializeStats() {
  try {
    const usersCount = await db('user').count('id as count').first();
    const betsCount = await db('bet').count('id as count').first();
    const eventsCount = await db('event').count('id as count').first();

    stats.totalUsers = parseInt(usersCount.count);
    stats.totalBets = parseInt(betsCount.count);
    stats.totalEvents = parseInt(eventsCount.count);
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