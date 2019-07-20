const Joi = require('@hapi/joi');

const schema = require('./schema');

module.exports = (req, res, next) => {
  const options = {
    abortEarly: true,
    noDefaults: true,
    allowUnknown: true,
    stripUnknown: true,
  };
  const payload = Joi.validate(req.body, schema, options);
  if (!payload.error) return next();
  return next({
    message: payload.error.details[0].message,
    field: payload.error.details[0].path,
  });
};
