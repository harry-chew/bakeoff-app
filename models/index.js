const Food = require('./foodModel');
const Vote = require('./voteModel');

Vote.belongsTo(Food);
Food.hasMany(Vote);

module.exports = {
  Food,
  Vote
};