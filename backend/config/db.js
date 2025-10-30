// config/db.js
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');

// ✅ Explicitly load .env from project root
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      console.error('❌ MONGO_URI not found in .env');
      process.exit(1);
    }

    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected Successfully`);
    console.log(`📡 Host: ${conn.connection.host}`);
    console.log(`🧠 Database: ${conn.connection.name}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
