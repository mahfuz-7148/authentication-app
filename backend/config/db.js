import mongoose from 'mongoose';

// Connection state track korar jonno global variable
let isConnected = false;

export const connectDB = async () => {
  // Jodi agei connect thake, tobe notun kore connect korar dorkar nai
  if (isConnected) {
    console.log('Using existing database connection');
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      // Ei settings gulo connection fast kore
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
    });

    isConnected = db.connections[0].readyState;
    console.log(`MongoDB connected: ${db.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    // process.exit(1) er bodole error throw kora bhalo
    // throw error;
  }
}