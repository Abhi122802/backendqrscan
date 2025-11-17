import mongoose from "mongoose";

export default async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;

  const uri = process.env.MONGO_URI;

  await mongoose.connect(uri, { dbName: "qrapp" });
  console.log("MongoDB Connected on Vercel");
}
