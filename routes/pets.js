const express = require('express');
const router = express.Router();
const Pet = require('../models/Pet');

// GET all pets
router.get('/', async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST a new pet
router.post('/', async (req, res) => {
  try {
    const newPet = new Pet(req.body);
    await newPet.save();
    res.status(201).json(newPet);
  } catch (err) {
    res.status(400).json({ error: 'Bad Request' });
  }
});

// PUT update pet by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedPet = await Pet.findOneAndUpdate(
      { id: parseInt(req.params.id) },
      req.body,
      { new: true }
    );
    res.json(updatedPet);
  } catch (err) {
    res.status(400).json({ error: 'Bad Request' });
  }
});

// DELETE pet by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Pet.findOneAndDelete({ id: parseInt(req.params.id) });
    if (!deleted) return res.status(404).json({ error: 'Pet not found' });
    res.json({ message: 'Pet deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;