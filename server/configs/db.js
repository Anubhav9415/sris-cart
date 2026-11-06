import mongoose from "mongoose";

let cachedPromise = null;

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (cachedPromise) {
    return cachedPromise;
  }

  const rawUri = process.env.MONGODB_URI;
  if (!rawUri) {
    const errorMsg = "MONGODB_URI is not defined in environment variables. Please add it to your Vercel Project Settings.";
    console.error("[DB ERROR]", errorMsg);
    throw new Error(errorMsg);
  }

  // Parse URI safely with or without query strings (e.g. ?retryWrites=true)
  let uri = rawUri.trim().replace(/^["']|["']$/g, "");
  let dbUri = uri;
  if (!uri.includes("/sris-cart")) {
    const qIndex = uri.indexOf("?");
    if (qIndex !== -1) {
      const base = uri.substring(0, qIndex).replace(/\/$/, "");
      const query = uri.substring(qIndex);
      dbUri = `${base}/sris-cart${query}`;
    } else {
      dbUri = uri.replace(/\/$/, "") + "/sris-cart";
    }
  }

  cachedPromise = mongoose
    .connect(dbUri, {
      serverSelectionTimeoutMS: 10000,
      bufferCommands: true,
    })
    .then((mongooseInstance) => {
      console.log("Database Connected successfully to MongoDB Atlas");
      return mongooseInstance;
    })
    .catch((err) => {
      cachedPromise = null; // Reset so next request can retry
      console.error("[DB ERROR] MongoDB connection failed:", err.message);
      throw err;
    });

  return cachedPromise;
};

export default connectDB;
