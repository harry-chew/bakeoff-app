const express = require('express');
const router = express.Router();
const { Food } = require('../models');
const { isAuthenticated } = require('../middleware/auth');
const logger = require('../config/logger');

router.get('/add-food', isAuthenticated, async (req, res) => {
  try {
    const foods = await Food.findAll();
    res.render('add-food', { foods /*, user: req.session.user */ });
  } catch (error) {
    logger.error('ADD-FOOD: Error fetching events:', error);
    res.status(500).send('Error fetching events');
  }
});

router.post('/add-food', isAuthenticated, async (req, res) => {
  try {
      const { foodName, foodInfo } = req.body;
      logger.info(`Attempting to add food: ${foodName}`);
      
      if (!foodName) {
          logger.error('Missing foodName or eventId');
          return res.status(400).send('Food name and event ID are required');
      }
      
      const newFood = await Food.create({ name: foodName, info: foodInfo });
      
      logger.info(`Food added successfully: ${newFood.name}`);
      res.redirect('/add-food');
  } catch (error) {
      logger.error('Error adding food:', error);
      res.status(500).send('Error adding food');
  }
});

router.post('/edit-food/:id', isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;
    const { newName, newInfo } = req.body;
    
    if (!newName) {
      logger.error('Missing newName');
      return res.status(400).send('New food name is required');
    }

    const food = await Food.findByPk(id);
    if (!food) {
      logger.error(`Food not found with id: ${id}`);
      return res.status(404).send('Food not found');
    }

    food.name = newName;
    if (newInfo)
      food.info = newInfo;
    
    await food.save();

    logger.info(`Food updated successfully: ${food.name}`);
    res.redirect('/add-food');
  } catch (error) {
    logger.error('Error updating food:', error);
    res.status(500).send('Error updating food');
  }
});

router.post('/delete-food/:id', isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;
    
    const food = await Food.findByPk(id);
    if (!food) {
      logger.error(`Food not found with id: ${id}`);
      return res.status(404).json({ message: 'Food not found' });
    }

    await food.destroy();

    logger.info(`Food deleted successfully: ${food.name}`);
    res.status(200).json({ message: 'Food deleted successfully' });
  } catch (error) {
    logger.error('Error deleting food:', error);
    res.status(500).json({ message: 'Error deleting food' });
  }
});

module.exports = router;