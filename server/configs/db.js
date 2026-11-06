import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  if (isConnected || mongoose.connection.readyState === 1) {
    return;
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("[DB ERROR] MONGODB_URI is not defined in environment variables!");
    return;
  }

  try {
    const cleanUri = uri.endsWith("/") ? uri.slice(0, -1) : uri;
    const dbUri = cleanUri.includes("/sris-cart") ? cleanUri : `${cleanUri}/sris-cart`;

    const conn = await mongoose.connect(dbUri, {
      serverSelectionTimeoutMS: 8000,
      bufferCommands: false, // Fail fast if not connected instead of hanging indefinitely
    });

    isConnected = conn.connections[0].readyState === 1;
    console.log("Database Connected successfully");
  } catch (error) {
    console.error("[DB ERROR] Failed to connect to MongoDB Atlas:", error.message);
  }
};

export default connectDB;
