const express = require('express');
const router = express.Router();
const NGO = require('../models/ngoModel');

// Create a new NGO
router.post('/', async (req, res) => {
  try {
    const newNGO = new NGO(req.body);
    const savedNGO = await newNGO.save();
    res.status(201).json(savedNGO);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all NGOs
router.get('/', async (req, res) => {
  try {
    const ngos = await NGO.find();
    res.json(ngos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get NGO by ID
router.get('/:id', async (req, res) => {
  try {
    const ngo = await NGO.findById(req.params.id);
    if (!ngo) return res.status(404).json({ message: 'NGO not found' });
    res.json(ngo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
