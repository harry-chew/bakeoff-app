require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const sequelize = require('./database');
const { Food } = require('./models');
const logger = require('./config/logger');
const loggingMiddleware = require('./middleware/logging');
const statusMonitor = require('express-status-monitor');

// Import routes
const authRoutes = require('./routes/auth');
const foodRoutes = require('./routes/food');
const voteRoutes = require('./routes/votes');
const viewRoutes = require('./routes/views');
const { isAuthenticated } = require('./middleware/auth');
// Import other route files

const app = express();
app.use('/status', isAuthenticated, statusMonitor());

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
    secure: process.env.NODE_ENV === 'production', // set to true if using https
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// passes user info to all views
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// Use routes
app.use('/', authRoutes);
app.use('/', foodRoutes);
app.use('/', voteRoutes);
// Use other route files

// View Routes
app.use('/', viewRoutes);

// Add this after all your routes
app.use((err, req, res, next) => {
  logger.error('Unhandled error:', err);
  res.status(500).send('An unexpected error occurred. Please try again later.');
});

sequelize.authenticate();
// Sync database
sequelize.sync(/*{ force: true }*/)
  .then(() => {
    logger.info('Database connection established');

    // Start the server after the database has connected
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      logger.info(`App started and listening at: http://localhost:${port}`);
      console.log(`App started and listening at: http://localhost:${port}`);
    });
  }).catch(error => {
    logger.error('Error connecting to database:', error);
    process.exit(1);  // Exit with failure status
});
