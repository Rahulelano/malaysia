const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const User = require('./models/User');
const Product = require('./models/Product');
const Hero = require('./models/Hero');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to DB
connectDB();

// Read JSON files
const users = [
    {
        name: 'Admin User',
        email: 'admin@malasiyakart.com',
        password: 'password123',
        role: 'admin'
    },
    {
        name: 'Best Seller',
        email: 'seller@malasiyakart.com',
        password: 'password123',
        role: 'seller'
    },
    {
        name: 'John Doe',
        email: 'user@malasiyakart.com',
        password: 'password123',
        role: 'user'
    }
];

const heroes = [
    {
        title: 'Premium Saree Collection',
        subtitle: 'Experience the luxury of hand-woven Kanchipuram silk sarees.',
        cta: 'Shop Collection',
        link: '/shop?category=Fashion',
        bgColor: 'from-amber-500/10 to-amber-700/5',
        textColor: 'text-amber-900',
        image: '/uploads/image-1768893086913.jpeg'
    },
    {
        title: 'Modern Festive Wear',
        subtitle: 'Elegant designs for your special occasions and celebrations.',
        cta: 'Browse Trends',
        link: '/shop',
        bgColor: 'from-rose-500/10 to-rose-700/5',
        textColor: 'text-rose-900',
        image: '/uploads/image-1768892808112.jpg'
    },
    {
        title: 'Wedding Special',
        subtitle: 'Make your big day truly unforgettable with our traditional bridal sarees.',
        cta: 'Explore More',
        link: '/shop',
        bgColor: 'from-primary/10 to-primary/5',
        textColor: 'text-primary-900',
        image: '/uploads/image-1768974809742.jpg'
    }
];

const importData = async () => {
    try {
        await User.deleteMany();
        await Product.deleteMany();
        await Hero.deleteMany();

        const createdUsers = await User.create(users);
        const sellerUser = createdUsers[1]._id;

        const products = [
            {
                name: 'Silk Kanchipuram Saree',
                description: 'Beautiful traditional silk saree with gold zari work. Perfect for weddings and festivals.',
                price: 15000,
                originalPrice: 20000,
                category: 'Fashion',
                images: ['/uploads/image-1768893086913.jpeg'],
                stock: 10,
                seller: sellerUser
            },
            {
                name: 'Cotton Designer Saree',
                description: 'Lightweight and comfortable cotton saree with modern floral prints.',
                price: 2500,
                originalPrice: 4000,
                category: 'Fashion',
                images: ['/uploads/image-1768892808112.jpg'],
                stock: 25,
                seller: sellerUser
            },
            {
                name: 'Party Wear Saree',
                description: 'Elegant party wear saree with sequin work and stone embellishments.',
                price: 5500,
                originalPrice: 8000,
                category: 'Fashion',
                images: ['/uploads/image-1768974809742.jpg'],
                stock: 15,
                seller: sellerUser
            },
            {
                name: 'Traditional Wedding Saree',
                description: 'Heavily embroidered wedding saree with rich borders.',
                price: 25000,
                originalPrice: 35000,
                category: 'Fashion',
                images: ['/uploads/image-1772798824366.png'],
                stock: 5,
                seller: sellerUser
            },
            {
                name: 'Modern Chiffon Saree',
                description: 'Sleek chiffon saree with a modern touch, perfect for daily wear or small functions.',
                price: 1800,
                originalPrice: 3000,
                category: 'Fashion',
                images: ['/uploads/image-1772814244176.png'],
                stock: 50,
                seller: sellerUser
            }
        ];

        await Product.create(products);
        await Hero.create(heroes);

        console.log('Data Imported...'.green.inverse);
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await User.deleteMany();
        await Product.deleteMany();

        console.log('Data Destroyed...'.red.inverse);
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
