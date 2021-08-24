const mongoose = require('mongoose');
// const dotenv = require('dotenv');

// dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected To DB....');
    } catch (err) {
        console.error(`Unable to connect to database, ${err}`);
        process.exit(1);
    }
}

module.exports = connectDB;