import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { WebSocketServer } from "ws";
import http from "http";
import path from "path";
import { fileURLToPath } from 'url';

import fileRoutes from "./routes/files.js";
import authRoutes from "./routes/authRoutes.js";
import resourceRoutes from "./routes/resourceRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

// ES Module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();
console.log("JWT_SECRET from .env:", process.env.JWT_SECRET); // Debugging

const app = express();
const httpServer = http.createServer(app);

// Middleware
app.use(express.json());
app.use(cors({ origin: ["http://localhost:5173", "http://localhost:5174"], credentials: true }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// WebSocket Server
const wss = new WebSocketServer({ server: httpServer });
const clients = new Set();

wss.on("connection", (ws) => {
  console.log("WebSocket client connected");
  clients.add(ws);

  ws.send(JSON.stringify({ type: "connected", message: "Connected to notification server" }));

  ws.on("message", (message) => {
    console.log("Received message:", message);
  });

  ws.on("close", () => {
    console.log("WebSocket client disconnected");
    clients.delete(ws);
  });
});

// Function to broadcast messages to all connected clients
global.broadcast = (data) => {
  clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(JSON.stringify(data));
    }
  });
};

// Routes
app.use("/api/files", fileRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/resources", resourceRoutes);

// Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working" });
});

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../Frontend/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../Frontend', 'build', 'index.html'));
    });
}

// MongoDB Connection
mongoose.connection.once("open", () => {
  console.log(`Connected to database: ${mongoose.connection.db.databaseName}`);
});

// MongoDB Atlas Connection String
const MONGODB_URI = "mongodb+srv://gayatribembade:gayatribembade%4015@cluster0.u9c2y7p.mongodb.net/EngPrep?retryWrites=true&w=majority";

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Atlas Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Error Handler
app.use(errorHandler);

// Start HTTP & WebSocket Server
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
