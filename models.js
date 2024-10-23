const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Food = sequelize.define('Food', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
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

// const Event = sequelize.define('Event', {
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     date: {
//       type: DataTypes.DATEONLY,
//       allowNull: false
//     },
//     isActive: {
//       type: DataTypes.BOOLEAN,
//       defaultValue: false
//     }
//   });

Food.hasMany(Vote);
Vote.belongsTo(Food);

// Event.hasMany(Food);
// Food.belongsTo(Event);

module.exports = { Food, Vote, Event };