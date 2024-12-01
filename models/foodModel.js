const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Food = sequelize.define('Food', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  info: {
    type: DataTypes.TEXT,
    allowNull: true
  }
});

module.exports = Food;