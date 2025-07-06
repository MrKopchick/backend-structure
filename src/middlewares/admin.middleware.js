const ApiError = require('../utils/apiError');

const adminMiddleware = (req, res, next) => {
  if (req.user?.type !== 'admin') {
    return next(new ApiError(403, 'Admin access required'));
  }
  next();
};

module.exports = adminMiddleware;