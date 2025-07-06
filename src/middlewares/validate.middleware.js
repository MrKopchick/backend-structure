const ApiError = require('../utils/apiError');

const validate = (schema) => {
  return (req, res, next) => {
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      const errorDetails = validationResult.error.details[0];
      return next(new ApiError(400, errorDetails.message));
    }
    next();
  };
};

module.exports = validate;