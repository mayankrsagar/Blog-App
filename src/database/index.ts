import mongoose from 'mongoose';

const mongoURI = process.env.MONGODB_URI;

export const connectToDB = async (): Promise<void> => {
  if (!mongoURI) {
    throw new Error("MongoDB URI is not defined.");
  }

  // Prevent multiple connections
  if (mongoose.connection.readyState >= 1) {
    console.log("MongoDB is already connected.");
    return;
  }

  try {
    await mongoose.connect(mongoURI, { dbName: "blogdb" });
    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};
