const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Event = sequelize.define('Event', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

module.exports = Event;