import mongoose from 'mongoose';

// Connection state track korar jonno variable
let isConnected = false;

export const connectDB = async () => {
  // Jodi agei connect thake, tahole notun kore connect korar dorkar nai
  if (isConnected) {
    console.log('Using existing database connection');
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      // Serverless-er jonno connection pool optimize kora
      maxPoolSize: 10,
    });

    isConnected = db.connections[0].readyState;
    console.log(`MongoDB Connected: ${db.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    // Serverless-e process.exit(1) deya jabe na
    throw error;
  }
};