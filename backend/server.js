const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const User = require('./models/User');
const path = require('path');
const multer = require('multer');

// Load env vars
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configure Multer Storage
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    },
});

function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png|webp/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Images only!');
    }
}

const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/hero', require('./routes/hero'));

// Upload Route
app.post('/api/upload', upload.single('image'), (req, res) => {
    res.send(`/${req.file.path.replace(/\\/g, '/')}`);
});

// Root route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Auto-seed data if DB is empty
// Auto-seed data if DB is empty or admin is missing
const seedData = async () => {
    try {
        const adminExists = await User.findOne({ email: 'admin@malasiyakart.com' });

        if (!adminExists) {
            console.log('Admin user not found. Creating admin user...');
            await User.create({
                name: 'Super Admin',
                email: 'admin@malasiyakart.com',
                password: 'password123', // Will be hashed by pre-save hook
                role: 'admin'
            });
            console.log('Admin user created: admin@malasiyakart.com / password123');
        }

        const count = await User.countDocuments();
        if (count === 1) { // Only admin exists
            console.log('Seeding demo data...');
            const users = [
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
            await User.create(users);
            console.log('Demo data seeded successfully!');
        }
    } catch (error) {
        console.error('Seeding failed:', error);
    }
};

// Connect to database and start server
const startServer = async () => {
    try {
        await connectDB();

        // Auto-seed data if DB is empty
        await seedData();

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
    } catch (error) {
        console.error('Failed to start server:', error);
    }
};

startServer();
