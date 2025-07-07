const knex = require('knex');
var dbConfig = require("../../knexfile");

const db = knex(dbConfig.development);

db.raw('SELECT 1')
  .then(() => console.log('Database connected'))
  .catch((err) => {
    console.error('Database connection failed:', err);
    process.exit(1);
  });

const dbHealthMiddleware = (req, res, next) => {
  db.raw('SELECT 1')
    .then(() => next())
    .catch(() => res.status(503).json({ error: 'Database unavailable' }));
};

module.exports = {
    db,
    dbHealthMiddleware
};