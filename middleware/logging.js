const logger = require('../config/logger');

const loggingMiddleware = (req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info({
      url: req.url,
      method: req.method,
      status: res.statusCode,
      duration: `${duration}ms`,
    });
  });
  next();
};

module.exports = loggingMiddleware;