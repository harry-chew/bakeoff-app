const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Vote = sequelize.define('Vote', {
  taste: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  look: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  feel: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Vote;