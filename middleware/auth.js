const logger = require('../config/logger');

function isAuthenticated(req, res, next) {
    if (req.session.user && req.session.user.username) {
      logger.info('User authenticated', req.session.user.username);
      next();
    } else {
      req.session.returnTo = req.originalUrl;
      res.redirect('/login');
    }
  }
  
module.exports = { isAuthenticated };