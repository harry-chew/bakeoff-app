const { DataTypes } = require('sequelize');
const sequelize = require('./database');

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

Food.hasMany(Vote);
Vote.belongsTo(Food);


module.exports = { Food, Vote };