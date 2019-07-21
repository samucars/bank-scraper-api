const Joi = require('@hapi/joi');

const { ValidationError } = require('../error');

const schema = Joi.object({
  branch: Joi.string().required().length(4),
  bankaccount: Joi.string().required().length(6),
  password: Joi.string().required().length(6),
});

module.exports = (req, res, next) => {
  const options = {
    abortEarly: true,
    noDefaults: true,
    allowUnknown: false,
    stripUnknown: false,
  };
  const payload = Joi.validate(req.body, schema, options);
  if (!payload.error) return next();

  return next(new ValidationError({
    message: payload.error.details[0].message,
    field: payload.error.details[0].path,
  }));
};
