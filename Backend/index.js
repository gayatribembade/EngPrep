// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import cookieParser from "cookie-parser";

// import fileRoutes from "./routes/files.js"; // Import using ES Modules
// import dotenv from "dotenv";
// import authRoutes from "./routes/authRoutes.js"

// dotenv.config();
// console.log("JWT_SECRET from .env:", process.env.JWT_SECRET); // Debugging


// const app = express();

// // Middleware
// app.use(express.json());
// app.use(cors({origin:["http://localhost:5173","http://localhost:5174"],credentials:true}));
// app.use(cookieParser())



// app.get("/", (req, res) => {
//   res.send("hellow world");
//   console.log("hello");
// });

// // Routes
// app.use("/api/files", fileRoutes);
// app.use("/api/auth",authRoutes);

// // Connect to MongoDB
// mongoose.connection.once("open", () => {
//   console.log(`Connected to database: ${mongoose.connection.db.databaseName}`);
// });

// mongoose
//   .connect("mongodb://127.0.0.1:27017/EngPrep", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.error("MongoDB Connection Error:", err));

// // Start Server
// const PORT = process.env.PORT || 5000; // Change from 4001 to 5000

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

/////////////////////////////new code


import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { WebSocketServer } from "ws";
import http from "http";

import fileRoutes from "./routes/files.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
console.log("JWT_SECRET from .env:", process.env.JWT_SECRET); // Debugging

const app = express();
const httpServer = http.createServer(app); // Create HTTP server for WebSocket

// Middleware
app.use(express.json());
app.use(cors({ origin: ["http://localhost:5173", "http://localhost:5174"], credentials: true }));
app.use(cookieParser());

// WebSocket Server
const wss = new WebSocketServer({ server: httpServer });
const clients = new Set();

wss.on("connection", (ws) => {
  console.log("WebSocket client connected");
  clients.add(ws);

  // Send initial connection confirmation
  ws.send(JSON.stringify({ type: "connected", message: "Connected to notification server" }));

  ws.on("message", (message) => {
    console.log("Received message:", message);
    // Handle incoming messages if needed
  });

  ws.on("close", () => {
    console.log("WebSocket client disconnected");
    clients.delete(ws);
  });
});

// Function to broadcast messages to all connected clients (Admins)
global.broadcast = (data) => {
  clients.forEach((client) => {
    if (client.readyState === 1) { // OPEN state
      client.send(JSON.stringify(data));
    }
  });
};

// Default route
app.get("/", (req, res) => {
  res.send("Hello World");
  console.log("Hello");
});

// Routes
app.use("/api/files", fileRoutes);
app.use("/api/auth", authRoutes);

// MongoDB Connection
mongoose.connection.once("open", () => {
  console.log(`Connected to database: ${mongoose.connection.db.databaseName}`);
});

mongoose
  .connect("mongodb://127.0.0.1:27017/EngPrep", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Start HTTP & WebSocket Server
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
