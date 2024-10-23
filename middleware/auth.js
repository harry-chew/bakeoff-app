const logger = require('../config/logger');

function isAuthenticated(req, res, next) {
    logger.info('Session:', req.session);
    logger.info('User:', req.session.user);
    if (req.session.user && req.session.user.username) {
      logger.info('User authenticated', req.session.user.username);
      next();
    } else {
      res.redirect('/login');
    }
  }
  
module.exports = { isAuthenticated };