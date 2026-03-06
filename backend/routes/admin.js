const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Product = require('../models/Product');
const Hero = require('../models/Hero');
const { protect, authorize } = require('../middleware/auth');

// @desc    Get all stats
// @route   GET /api/admin/stats
// @access  Private/Admin
router.get('/stats', protect, authorize('admin'), async (req, res) => {
    try {
        const usersCount = await User.countDocuments();
        const productsCount = await Product.countDocuments();
        // Since we don't have an Order model yet, we'll return 0 or mock
        const ordersCount = 0;
        const totalRevenue = 0; // Placeholder

        res.json({
            usersCount,
            productsCount,
            ordersCount,
            totalRevenue
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Get all hero slides
router.get('/hero', protect, authorize('admin'), async (req, res) => {
    try {
        const heroes = await Hero.find({}).sort('-createdAt');
        res.json(heroes);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Create hero slide
router.post('/hero', protect, authorize('admin'), async (req, res) => {
    try {
        const hero = await Hero.create(req.body);
        res.status(201).json(hero);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Update hero slide
router.put('/hero/:id', protect, authorize('admin'), async (req, res) => {
    try {
        const hero = await Hero.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(hero);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Delete hero slide
router.delete('/hero/:id', protect, authorize('admin'), async (req, res) => {
    try {
        await Hero.findByIdAndDelete(req.params.id);
        res.json({ message: 'Hero slide removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
router.get('/users', protect, authorize('admin'), async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
router.delete('/users/:id', protect, authorize('admin'), async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.deleteOne();
        res.json({ message: 'User removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Approve seller
// @route   PUT /api/admin/users/:id/approve
// @access  Private/Admin
router.put('/users/:id/approve', protect, authorize('admin'), async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { isVerified: true },
            { new: true, runValidators: true }
        );

        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json({ message: 'User approved' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get all products (Admin)
// @route   GET /api/admin/products
// @access  Private/Admin
router.get('/products', protect, authorize('admin'), async (req, res) => {
    try {
        const products = await Product.find({}).populate('seller', 'name email');
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Delete product (Admin)
// @route   DELETE /api/admin/products/:id
// @access  Private/Admin
router.delete('/products/:id', protect, authorize('admin'), async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        await product.deleteOne();
        res.json({ message: 'Product removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
