const jwt = require('jsonwebtoken');
const { config } = require('../config/jwt.config');;
const ApiError = require('../utils/apiError');

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new ApiError(401, 'Not Authorized');
    }

    const decoded = jwt.verify(token, config.secret);
    req.user = decoded;
    next();
  } catch (err) {
    next(new ApiError(401, 'Not Authorized'));
  }
};

module.exports = authMiddleware;