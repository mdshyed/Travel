import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';
import userRoutes from "./routes/user.js";
import tripRoutes from "./routes/trip.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();

// Enable CORS for all origins
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());

// Serve static files from frontend build
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend-dist'));
}

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/travel-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB Atlas");
}).catch((err) => {
  console.error("MongoDB connection error:", err);
});

// API Routes
app.get("/api/health", (req, res) => {
  const mongoStatus = mongoose.connection.readyState === 1 ? "Connected" : "Disconnected";
  res.json({ 
    status: "Backend is running",
    mongodb: mongoStatus,
    port: process.env.PORT || 4000
  });
});

// Fallback route for any unmatched API paths
// Simple test route first
app.get("/test", (req, res) => {
  res.json({
    message: "✅ Travel App Test",
    status: "ok",
    timestamp: new Date().toISOString()
  });
});

// ALWAYS serve something - fail-proof route
app.get("/", (req, res) => {
  // First, try to serve React app
  const frontendPath = path.join(__dirname, 'frontend-dist', 'index.html');
  const frontendExists = existsSync(frontendPath);
  
  if (frontendExists) {
    return res.sendFile(frontendPath);
  }
  
  // If no frontend, serve simple landing page
  res.status(200).send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Travel App</title>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body style="font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5;">
      <h1>🚀 Travel App API</h1>
      <p>Backend is running successfully!</p>
      <ul>
        <li><a href="/api/health">Health Check</a></li>
        <li><a href="/test">Test API</a></li>
      </ul>
      <p><strong>STATUS:</strong> Backend deployed and functioning ✅</p>
      <p><strong>Next:</strong> Being deployed via Railway platform</p>
    </body>
    </html>
  `);
});

app.use("/api/users", userRoutes);
app.use("/api/trips", tripRoutes);

// Simple catch-all route for React App
app.get("*", (req, res) => {
  // Skip API routes
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }
  
  // Try to serve React app or fallback
  const frontendPath = path.join(__dirname, 'frontend-dist', 'index.html');
  const frontendExists = existsSync(frontendPath);
  
  if (frontendExists) {
    res.sendFile(frontendPath);
  } else {
    res.send(`
      <!DOCTYPE html>
      <html>
      <head><title>Travel App</title></head>
      <body style="margin:40px;font-family:Arial">
        <h1>🛤️ Travel App</h1>
        <p>App is being deployed... Please check back soon!</p>
      </body>
      </html>
    `);
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
