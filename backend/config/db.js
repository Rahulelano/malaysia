const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const connectDB = async () => {
    try {
        if (mongoose.connection.readyState >= 1) {
            console.log('MongoDB already connected.');
            return;
        }

        const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/malasiyakart';
        const maskedUri = uri.replace(/\/\/([^:]+):([^@]+)@/, '// $1:****@');
        console.log(`Connecting to: ${maskedUri}`);

        console.log(`Attempting to connect to MongoDB Atlas...`);

        try {
            const conn = await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
            console.log(`MongoDB Connected: ${conn.connection.host}`);
        } catch (err) {
            console.error('\n❌ MongoDB Connection Error:');
            console.error(`Error: ${err.message}`);

            if (err.message.includes('ENOTFOUND')) {
                console.warn('\n⚠️  DNS RESOLUTION FAILED:');
                console.warn('1. Check your internet connection.');
                console.warn('2. Try changing your DNS (e.g. use Google DNS 8.8.8.8).');
                console.warn('3. Ensure your current IP is whitelisted in MongoDB Atlas (Network Access).');
            }

            console.log('\n🔄 Attempting Fallback to In-Memory Database...');

            try {
                const mongod = await MongoMemoryServer.create();
                const memUri = mongod.getUri();

                console.log(`In-Memory Instance started: ${memUri}`);
                const conn = await mongoose.connect(memUri);
                console.log(`In-Memory MongoDB Connected! (Note: Data will be lost on restart)`);
            } catch (memErr) {
                console.error('\n❌ CRITICAL: In-Memory Database also failed to start.');
                console.error(`Error: ${memErr.message}`);
                console.warn('\n💡 ACTION REQUIRED:');
                console.warn('1. Please install MongoDB Community Server locally to resolve this permanently.');
                console.warn('2. Free up some disk space and check permissions.');
                process.exit(1);
            }
        }

    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
