const express = require('express');
const router = express.Router();
const Artwork = require('../models/Artwork');

router.get('/', async (req, res) => {
  try {
    const categories = await Artwork.distinct('category');
    res.json(['All', ...categories]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
