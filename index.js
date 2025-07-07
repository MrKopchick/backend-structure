const App = require('./src/app');
const logger = require('./src/utils/logger');

let server;

try {
  const appInstance = new App();
  server = appInstance.start();

  process.on('uncaughtException', (err) => {
    logger.error('Uncaught Exception:', err);
    process.exit(1);
  });

} catch (err) {
  logger.error('start failed:', err);
  process.exit(1);
}

module.exports = { 
  app: App,
  server
};