const ApiError = require('../utils/apiError');

const adminMiddleware = (req, res, next) => {
  if (req.user?.type !== 'admin') {
    return next(new ApiError(401, 'Not Authorized'));
  }
  next();
};

module.exports = adminMiddleware;