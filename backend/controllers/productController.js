const Product = require('../models/Product');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
// @desc    Get all products
// @route   GET /api/products
// @access  Public
exports.getProducts = async (req, res) => {
    try {
        let query = {};

        // If query param 'seller' is present, filter by seller
        if (req.query.seller) {
            query.seller = req.query.seller;
        }

        const products = await Product.find(query);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create new product
// @route   POST /api/products
// @access  Private (Seller/Admin)
exports.createProduct = async (req, res) => {
    try {
        // Add user to req.body
        req.body.seller = req.user.id;

        // Check if seller is verified
        if (req.user.role === 'seller' && !req.user.isVerified) {
            return res.status(403).json({ message: 'Access denied. Account pending admin approval.' });
        }

        const product = await Product.create(req.body);

        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private (Seller/Admin)
exports.updateProduct = async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Make sure user is product owner or admin
        if (product.seller.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ message: 'Not authorized to update this product' });
        }

        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private (Seller/Admin)
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Make sure user is product owner or admin
        if (product.seller.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ message: 'Not authorized to delete this product' });
        }

        await product.deleteOne();

        res.status(200).json({ message: 'Product removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
