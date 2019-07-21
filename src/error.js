const HttpStatus = require('http-status');

class ValidationError extends Error {
  constructor(error = {}) {
    super(error.message);

    this.field = error.field;
    this.status = HttpStatus.BAD_REQUEST;
    this.type = 'ValidationError';
  }
}

const handlerErrorMiddleware = (err, req, res, next) => { // eslint-disable-line no-unused-vars
  const { field, type } = err;

  req.logger.error(err.message);

  const message = type === 'ValidationError' ? err.message : 'ops, some problem occurred :(';
  const status = err.status || HttpStatus.INTERNAL_SERVER_ERROR;

  res.status(status).json({ type, message, field });
};

const notFoundMiddleware = (req, res) => {
  res.status(404).json({ message: 'resource not found' });
};

module.exports = {
  ValidationError,

  handlerErrorMiddleware,
  notFoundMiddleware,
};
