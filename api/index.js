// Vercel Serverless Function entry point
// This file sits at the repo root /api/index.js so Vercel auto-detects it.
// It simply re-exports the Express app from ../server/server.js

import app from "../server/server.js";

export default app;

