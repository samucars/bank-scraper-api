const loggerMiddleware = (req, res, next) => {
  req.logger = {
    info: console.log,
    error: console.log
  };
  return next();
};

module.exports = { loggerMiddleware };
