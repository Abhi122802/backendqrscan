import mongoose from "mongoose";

/**
 * In a serverless environment, you want to reuse the database connection
 * across function invocations rather than creating a new one each time.
 */

export default async function connectDB() {
  // Check if we have a connection to the database
  if (mongoose.connections[0].readyState) {
    console.log("Using existing database connection.");
    return;
  }

  // Otherwise, create a new connection
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error("Please define the MONGO_URI environment variable.");
  }

  console.log("Creating a new database connection.");
  await mongoose.connect(uri, { dbName: "firstapp", bufferCommands: false });
  console.log("MongoDB Connected!");
}
