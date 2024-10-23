const express = require('express');
const router = express.Router();
const { Food, Vote } = require('../models');
const { isAuthenticated } = require('../middleware/auth');
const logger = require('../config/logger');

router.post('/vote', async (req, res) => {
  try {
    const food = await Food.findOne({ where: { name: req.body.foodName } });
    await Vote.create({
      taste: req.body.taste,
      look: req.body.look,
      feel: req.body.feel,
      FoodId: food.id
    });
    logger.info(`Vote: ${req.body.foodName} T:${req.body.body.taste} L:${req.body.body.look} F:${req.body.body.feel}`);
    res.redirect('/');
  } catch (error) {
    logger.error('Error voting:', error);
    res.status(500).send('Error submitting vote');
  }
});

router.get('/results', isAuthenticated, async (req, res) => {
  try {
    const foods =  await Food.findAll({
      include: [{ model: Vote, attributes: ['taste', 'look', 'feel'] }]
    });

    const results = foods.map(food => {
      const votes = food.Votes;
      if (votes.length === 0) {
        return {
          name: food.name,
          taste: 'N/A',
          look: 'N/A',
          feel: 'N/A',
          total: 'N/A'
        };
      }

      const avgTaste = votes.reduce((sum, vote) => sum + vote.taste, 0) / votes.length;
      const avgLook = votes.reduce((sum, vote) => sum + vote.look, 0) / votes.length;
      const avgFeel = votes.reduce((sum, vote) => sum + vote.feel, 0) / votes.length;
      return {
        name: food.name,
        taste: avgTaste.toFixed(2),
        look: avgLook.toFixed(2),
        feel: avgFeel.toFixed(2),
        total: ((avgTaste + avgLook + avgFeel) / 3).toFixed(2)
      };
    });
    res.render('results', { foods: results, user: req.session.user });
  } catch (error) {
    logger.error('Error fetching results:', error);
    console.error(error);
    res.status(500).send('Error fetching results');
  }
});

router.post('/clear-all', isAuthenticated, async (req, res) => {
  try {
    // Delete all votes
    await Vote.destroy({
      where: {},
      truncate: true
    });

    // Delete all foods
    await Food.destroy({
      where: {},
      truncate: true
    });

    // Log the action
    logger.info('Data cleared');
    res.redirect('/results');
  } catch (error) {
    logger.error('Error clearing data:', error);
    console.error('Error clearing data:', error);
    res.status(500).send('Error clearing data');
  }
});

module.exports = router;