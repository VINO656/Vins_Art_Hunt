const express = require('express');
const router = express.Router();
const Artwork = require('../models/Artwork');
const adminAuth = require('../middleware/auth');

// GET all artworks with filters
router.get('/', async (req, res) => {
  try {
    const { category, available, featured, search } = req.query;
    let query = {};
    if (category && category !== 'All') query.category = category;
    if (available !== undefined) query.available = available === 'true';
    if (featured !== undefined) query.featured = featured === 'true';
    if (search) query.title = { $regex: search, $options: 'i' };
    const artworks = await Artwork.find(query).sort({ createdAt: -1 });
    res.json(artworks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single artwork
router.get('/:id', async (req, res) => {
  try {
    const artwork = await Artwork.findById(req.params.id);
    if (!artwork) return res.status(404).json({ error: 'Artwork not found' });
    res.json(artwork);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create artwork
router.post('/', adminAuth, async (req, res) => {
  try {
    const artwork = new Artwork(req.body);
    await artwork.save();
    res.status(201).json(artwork);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update artwork
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const artwork = await Artwork.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(artwork);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE artwork
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    await Artwork.findByIdAndDelete(req.params.id);
    res.json({ message: 'Artwork removed from the collection' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
