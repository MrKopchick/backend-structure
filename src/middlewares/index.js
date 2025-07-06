const validate = require('./validate.middleware');
const authMiddleware = require('./auth.middleware');
const adminMiddleware = require('./admin.middleware');
const errorMiddleware = require('./error.middleware');

module.exports = {
  validate,
  authMiddleware,
  adminMiddleware,
  errorMiddleware,
};