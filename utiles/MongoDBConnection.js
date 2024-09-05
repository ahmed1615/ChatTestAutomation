// src/utiles/MongoDBConnection.js
const mongoose = require('mongoose');

const mongoURI = 'mongodb://localhost:27017/simplechat';

let isConnected = false;

async function connectToMongoDB() {
  if (isConnected) return;

  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    throw err;
  }
}
module.exports = { connectToMongoDB };
