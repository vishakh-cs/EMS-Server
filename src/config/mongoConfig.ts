import mongoose from "mongoose";
import { MONGODB_URI } from ".";

const connectDB = async () => {

  if (!MONGODB_URI) {
    console.warn("MongoDB URI is missing. Skipping database connection.");
    return false;
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("MongoDB connected");
    return true;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";

    console.warn(
      `MongoDB connection failed for ${MONGODB_URI}. Start MongoDB locally or update MONGODB_URI in .env.`
    );
    console.warn(`Reason: ${message}`);
    return false;
  }
};

export default connectDB;
