const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { db } = require('./config/db.config');
const { errorMiddleware } = require('./middlewares');
const logger = require('./utils/logger');
const router = require('./routes');
const { initializeStats } = require('./services/stats.service');

class App {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 4066;
    this.server = null;

    this.initializeDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
    this.initializeStats();
  }

  initializeDatabase() {
    db.raw('SELECT 1')
      .then(() => logger.info('Database connected'))
      .catch(err => {
        logger.error('Database connection failed:', err);
        process.exit(1);
      });

    db.on('query-error', (err) => {
      logger.error('Database query error:', err);
    });
  }

  initializeMiddlewares() {
    this.app.use(helmet());
    this.app.use(cors({
      origin: process.env.CORS_ORIGIN || '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization']
    }));

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.app.use(morgan('combined', { stream: logger.stream }));
  }

  initializeRoutes() {
    this.app.use(router);

    this.app.use((req, res, next) => {
      res.status(404).json({
        success: false,
        error: 'Endpoint not found'
      });
    });
  }

  initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  initializeStats() {
    initializeStats().catch(err => {
      logger.error('Failed to initialize stats:', err);
    });
  }

  start() {
    this.server = this.app.listen(this.port, () => {
      logger.info(`Server running on port ${this.port}`);
    });

    process.on('unhandledRejection', (err) => {
      logger.error('Unhandled Rejection:', err);
      this.stop();
    });

    process.on('SIGTERM', () => {
      logger.info('SIGTERM received. Shutting down gracefully');
      this.stop();
    });

    return this.server;
  }

  stop() {
    if (this.server) {
      this.server.close(() => {
        logger.info('Server closed');
        db.destroy().then(() => {
          logger.info('Database connection closed');
          process.exit(0);
        });
      });
    }
  }
}

module.exports = App;