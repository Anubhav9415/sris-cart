import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import connectDB from "./configs/db.js";
import "dotenv/config";
import userRouter from "./routes/userRoute.js";
import sellerRouter from "./routes/sellerRoute.js";
import connectCloudinary from "./configs/cloudinary.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import addressRouter from "./routes/addressRoute.js";
import orderRouter from "./routes/orderRoute.js";
import aiRouter from "./routes/aiRoute.js";
import riderRouter from "./routes/riderRoute.js";
import adminRouter from "./routes/adminRoute.js";
import { stripeWebhooks } from "./controllers/orderController.js";

// Middlewares
import logger from "./middlewares/logger.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();
const port = process.env.PORT || 4000;

// Initialize DB connection (non-blocking, cached for serverless reuse)
connectDB().catch((err) => console.error("[INIT DB ERROR]", err.message));
connectCloudinary().catch((err) => console.error("[INIT CLOUDINARY ERROR]", err.message));

// Security headers
app.use(helmet({ contentSecurityPolicy: false }));
app.use(logger);

// Stripe webhook must receive raw body — must come BEFORE express.json()
app.post("/stripe", express.raw({ type: "application/json" }), stripeWebhooks);

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||
        origin.includes("localhost") ||
        origin.endsWith(".vercel.app")
      ) {
        callback(null, true);
      } else {
        callback(null, true);
      }
    },
    credentials: true,
  })
);

// Health check
app.get("/api/health", async (req, res) => {
  let dbStatus = "disconnected";
  try {
    await connectDB();
    dbStatus = mongoose.connection.readyState === 1 ? "connected" : "connecting";
  } catch (err) {
    dbStatus = "error: " + err.message;
  }
  res.json({
    status: "ok",
    dbStatus,
    hasMongoUri: !!process.env.MONGODB_URI,
    hasJwtSecret: !!process.env.JWT_SECRET,
    timestamp: new Date().toISOString(),
  });
});

// Ensure DB is connected before every API route
app.use("/api", async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    return res.status(503).json({
      success: false,
      message: "Database unavailable: " + error.message,
    });
  }
});

app.use("/api/user", userRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);
app.use("/api/ai", aiRouter);
app.use("/api/rider", riderRouter);
app.use("/api/admin", adminRouter);

// Global Error Handler
app.use(errorHandler);

// Only listen locally — on Vercel, the app is imported as a handler, not started as a server
if (!process.env.VERCEL) {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

export default app;
