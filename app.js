require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const sequelize = require('./database');
const { Food, Vote } = require('./models');
const logger = require('./config/logger');
const loggingMiddleware = require('./middleware/logging');
const statusMonitor = require('express-status-monitor');

// Import routes
const authRoutes = require('./routes/auth');
const foodRoutes = require('./routes/food');
const voteRoutes = require('./routes/votes');
const { isAuthenticated } = require('./middleware/auth');
// Import other route files

const app = express();
app.use('/status', isAuthenticated, statusMonitor());
//global
app.use((req, res, next) => {
  logger.info(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Middleware
app.use(loggingMiddleware);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const secret = process.env.SESSION_SECRET || bcrypt.genSaltSync(10);
// Session middleware
app.use(session({
  secret: secret,
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: false, // set to true if using https
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Use routes
app.use('/', authRoutes);
app.use('/', foodRoutes);
app.use('/', voteRoutes);
// Use other route files

// View Routes
app.get('/', async (req, res) => {
  try {
    const foods = await Food.findAll();
    res.render('index', { foods, user: req.session.user });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching foods');
  }
});

// Add this after all your routes
app.use((err, req, res, next) => {
  logger.error('Unhandled error:', err);
  res.status(500).send('An unexpected error occurred. Please try again later.');
});

// Sync database
sequelize.sync(/*{ force: true }*/)
  .then(() => {
    logger.info('Database connection established');
  }).catch(error => {
    logger.error('Error connecting to database:', error);
    process.exit(1);  // Exit with failure status
  });

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  logger.info(`App started and listening at: http://localhost:${port}`);
  console.log(`App started and listening at: http://localhost:${port}`);
});