import mongoose from "mongoose";

/**
 * This is a global mongoose connection promise.
 * In a serverless environment, you want to reuse the database connection
 * across function invocations rather than creating a new one each time.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export default async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const uri = process.env.MONGO_URI;

    if (!uri) {
      throw new Error("Please define the MONGO_URI environment variable.");
    }

    cached.promise = mongoose.connect(uri, { dbName: "firstapp", bufferCommands: false }).then((mongoose) => mongoose);
  }

  try {
    cached.conn = await cached.promise;
    console.log("MongoDB Connected!");
    return cached.conn;
  } catch (e) {
    cached.promise = null;
    console.error("MongoDB connection error:", e);
    throw new Error("Could not connect to MongoDB.");
  }
}
