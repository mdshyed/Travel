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

// Enable CORS for all origins (production deployment)
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' ? true : "http://localhost:3000",
  credentials: true
};
app.use(cors(corsOptions));

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

// Root route - will serve frontend if available, otherwise API
app.get("/", (req, res) => {
  const isProduction = process.env.NODE_ENV === 'production';
  
  if (isProduction) {
    // Try to serve React frontend first
    const frontendExists = existsSync(path.join(__dirname, 'frontend-dist/index.html'));
    if (frontendExists) {
      return res.sendFile(path.join(__dirname, 'frontend-dist/index.html'));
    }
  }
  
  // Fallback to API info
  res.json({
    message: "🚀 Travel App Backend API", 
    health: "/api/health",
    test: "/test",
    status: "running",
    version: "1.0.0"
  });
});

app.use("/api/users", userRoutes);
app.use("/api/trips", tripRoutes);

// Serve React app on all non-API routes (for production deployment)
if (process.env.NODE_ENV === 'production') {
  const frontendPath = path.join(__dirname, 'frontend-dist');
  const indexPath = path.join(frontendPath, 'index.html');
  
  app.use(express.static(frontendPath));
  
  app.get('*', (req, res) => {
    // Skip API routes
    if (req.path.startsWith('/api/')) {
      return;
    }
    
    if (!res.headersSent) {
      res.sendFile(indexPath, (err) => {
        if (err) {
          console.error('Error serving React app:', err);
          res.json({
            message: "Travel App Frontend",
            status: "React files not found - check build",
            path: req.path
          });
        }
      });
    }
  });
}

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
