const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title']
    },
    subtitle: {
        type: String,
        required: [true, 'Please add a subtitle']
    },
    cta: {
        type: String,
        required: [true, 'Please add a call to action text'],
        default: 'Shop Now'
    },
    link: {
        type: String,
        required: [true, 'Please add a link'],
        default: '/shop'
    },
    bgColor: {
        type: String,
        required: [true, 'Please add a background color/gradient'],
        default: 'from-primary/10 to-primary/5'
    },
    textColor: {
        type: String,
        required: [true, 'Please add a text color class'],
        default: 'text-foreground'
    },
    image: {
        type: String,
        default: ''
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Hero', heroSchema);
