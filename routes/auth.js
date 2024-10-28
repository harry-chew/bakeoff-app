const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const logger = require('../config/logger');

// In-memory user store (replace with a database in a real application)
const users = [
    { username: 'admin', password: bcrypt.hashSync('password', 10) }
];

// Add your authentication routes here
router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (user && bcrypt.compareSync(password, user.password)) {
    req.session.user = { username : user.username };
    logger.info(`User ${username} logged in`);

    const returnTo = req.session.returnTo || '/';
    delete req.session.returnTo;

    res.redirect(returnTo);
  } else {
    logger.warn(`Invalid login attempt for user ${username}`);
    res.render('login', { error: 'Invalid username or password' });
  }
});

router.get('/logout', (req, res) => {
  try {
    if (!req.session) {
      logger.info('No session to destroy');
      return res.redirect('/');
    }
    if (!req.session.user) {
      logger.info('No user to log out');
      return res.redirect('/');
    }
    const username = req.session.user.username;
    logger.info(`Attemping user logout`, username);  
    req.session.destroy((err) => {
      if (err) {
        logger.error(err);
      } else {
        logger.info(`User ${username} logged out`);
      }
      res.redirect('/');
    });
  } catch (error) {
    logger.error('Error logging out:', error);
  }
});


module.exports = router;