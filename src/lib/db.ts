import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (!MONGODB_URI) {
    throw new Error(
      "MONGODB_URI is not defined. Please add it to your Vercel Environment Variables (Settings > Environment Variables)."
    );
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000, // 10 seconds timeout
    };

    console.log("Connecting to MongoDB...");
    cached.promise = mongoose.connect(MONGODB_URI as string, opts).then((mongoose) => {
      console.log("MongoDB Connected Successfully");
      return mongoose;
    }).catch(err => {
      console.error("MongoDB Connection Error:", err);
      cached.promise = null;
      throw err;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
