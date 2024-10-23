const express = require('express');
const router = express.Router();
const { Food } = require('../models');
const { isAuthenticated } = require('../middleware/auth');
const logger = require('../config/logger');

router.get('/add-food', isAuthenticated, async (req, res) => {
  try {
    const foods = await Food.findAll();
    res.render('add-food', { foods, user: req.session.user });
  } catch (error) {
    logger.error('ADD-FOOD: Error fetching events:', error);
    res.status(500).send('Error fetching events');
  }
});

router.post('/add-food', isAuthenticated, async (req, res) => {
  try {
      const { foodName } = req.body;
      logger.info(`Attempting to add food: ${foodName}`);
      
      if (!foodName) {
          logger.error('Missing foodName or eventId');
          return res.status(400).send('Food name and event ID are required');
      }

      const newFood = await Food.create({ name: foodName});
      logger.info(`Food added successfully: ${newFood.name}`);
      res.redirect('/add-food');
  } catch (error) {
      logger.error('Error adding food:', error);
      res.status(500).send('Error adding food');
  }
});

module.exports = router;