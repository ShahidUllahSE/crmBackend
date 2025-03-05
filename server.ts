import express, { Application } from "express";
import dotenv from "dotenv";
import db from "./db"; // Import the database connection
import './src/models/user.model.ts'
import app from './app'
dotenv.config();

// const app: Application = express();

// Middleware
app.use(express.json());

// Database Connection
const connectDB = async () => {
  try {
    await db.authenticate();
    console.log("Database connected successfully.");
    
    // Sync models (optional: use force: true to reset tables)
    await db.sync();
    // console.log("All models synchronized.");
  } catch (error) {
    console.error("Database connection error:", (error as Error).message);
  }
};

// Start the server after DB connection
const PORT = process.env.PORT || 3000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});

export default app;
