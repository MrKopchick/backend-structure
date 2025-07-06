const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwt.config');;
const ApiError = require('../utils/apiError');

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new ApiError(401, 'Not authorized');
    }

    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (err) {
    next(new ApiError(401, 'Not authorized'));
  }
};

module.exports = authMiddleware;