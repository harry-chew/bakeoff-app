const { Sequelize } = require('sequelize');
const path = require('path');
const logger = require('./config/logger');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, process.env.DB_FILE || 'database.sqlite'),
  logging: (msg) => logger.debug(msg)
});

module.exports = sequelize;