import mongoose from 'mongoose';

let isConnected: boolean = false;

const mongoURI = process.env.MONGODB_URI;


export const connectToDB = async (): Promise<void> => {
  if (isConnected) {
    console.log("MongoDB is already connected.");
    return;
  }

  if (!mongoURI) {
    throw new Error("MongoDB URI is not defined.");
  }

  try {
    await mongoose.connect(mongoURI);
    isConnected = true;
    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};
