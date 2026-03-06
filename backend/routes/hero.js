const express = require('express');
const router = express.Router();
const Hero = require('../models/Hero');

// @desc    Get active hero slides
// @route   GET /api/hero
// @access  Public
router.get('/', async (req, res) => {
    try {
        const heroes = await Hero.find({ isActive: true });
        res.json(heroes);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
