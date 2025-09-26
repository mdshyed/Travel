import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from 'url';
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
app.get("/", (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    res.sendFile(path.join(__dirname, 'frontend-dist/index.html'), (err) => {
      if (err) {
        res.status(200).json({
          message: "Travel App Backend API",
          health: "/api/health",
          status: "running"
        });
      }
    });
  } else {
    res.json({
      message: "Travel App Backend API",
      health: "/api/health",
      status: "running"
    });
  }
});

app.use("/api/users", userRoutes);
app.use("/api/trips", tripRoutes);

// Serve React app on all non-API routes (for production deployment)
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend-dist/index.html'), (err) => {
      if (err) {
        console.error('Error serving React app:', err);
        res.status(500).send('Error serving React app');
      }
    });
  });
}

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
