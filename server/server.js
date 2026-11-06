import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
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

// Initialize connections in background (does not block cold start)
connectDB().catch((err) => console.error("[INIT DB ERROR]", err.message));
connectCloudinary().catch((err) => console.error("[INIT CLOUDINARY ERROR]", err.message));

// Apply Security and Performance Optimization Middlewares
app.use(helmet({ contentSecurityPolicy: false })); // allows OpenStreetMap loading
app.use(compression());
app.use(logger);

// Stripe webhook must receive raw body
app.post("/stripe", express.raw({ type: "application/json" }), stripeWebhooks);

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
  "https://sris-cart.vercel.app",
  "https://sris-cart-orcin.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        origin.endsWith(".vercel.app")
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Diagnostic Health Routes
app.get(["/", "/api"], (req, res) => res.json({ status: "ok", message: "SrisCart API is Working" }));

app.get("/api/health", async (req, res) => {
  let dbStatus = "disconnected";
  let dbError = null;

  try {
    await connectDB();
    dbStatus = mongoose.connection.readyState === 1 ? "connected" : "connecting";
  } catch (err) {
    dbStatus = "failed";
    dbError = err.message;
  }

  res.json({
    status: "ok",
    hasMongoUri: !!process.env.MONGODB_URI,
    hasJwtSecret: !!process.env.JWT_SECRET,
    hasCloudinary: !!(process.env.CLOUDINARY_NAME && process.env.CLOUDINARY_API_KEY),
    hasStripeKey: !!process.env.STRIPE_SECRET_KEY,
    dbStatus,
    dbError,
    timestamp: new Date().toISOString(),
  });
});

// Ensure DB is ready before handling DB-dependent routes
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    return res.status(503).json({
      success: false,
      message: `Database connection error: ${error.message}. Please check MongoDB Atlas IP whitelist (allow 0.0.0.0/0) and Vercel Environment Variables.`,
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

// Global Error Handler Middleware
app.use(errorHandler);

if (!process.env.VERCEL) {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

export default app;
