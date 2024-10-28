const express = require('express');
const router = express.Router();
const { Food } = require('../models');

router.get('/', async (req, res) => {
    try {
      const foods = await Food.findAll();
      res.render('index', { foods /*, user: req.session.user */ });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching foods');
    }
  });

module.exports = router;