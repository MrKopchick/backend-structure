const ApiError = require('../utils/apiError');

const validate = (schema, property = 'body') => {
  if (!schema || typeof schema.validate !== 'function') {
    throw new Error('Invalid validation schema');
  }

  return (req, res, next) => {
    const validationOptions = {
      abortEarly: false,
      allowUnknown: false,
      stripUnknown: false
    };

    const { error, value } = schema.validate(req[property], validationOptions);

    if (error) {
      const errorMessages = error.details.map(detail => detail.message);
      return next(new ApiError(400, errorMessages.join(', ')));
    }

    req[property] = value;
    next();
  };
};

module.exports = validate;
