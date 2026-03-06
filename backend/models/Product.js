const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a product name'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    price: {
        type: Number,
        required: [true, 'Please add a price']
    },
    originalPrice: {
        type: Number
    },
    category: {
        type: String,
        required: [true, 'Please add a category'],
        enum: ['Electronics', 'Fashion', 'Home & Living', 'Beauty', 'Sports', 'Books', 'Toys', 'Grocery', 'Other']
    },
    images: {
        type: [String],
        default: []
    },
    stock: {
        type: Number,
        default: 0
    },
    seller: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', productSchema);
