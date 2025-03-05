import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

dotenv.config();

const app: Application = express();

// Middleware
app.use(express.json());
app.use(cors());

// Custom CORS Middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  const allowedOrigin = process.env.FRONT_END_URL || "http://localhost:5173";

  res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");

  if (req.method === "OPTIONS") {
    res.sendStatus(204);
    return; // Ensures the function exits properly
  }

  next();
});

// Function to dynamically load route
const loadRoutes = (app: Application) => {
  const routesPath = path.join(__dirname, "src/routes");
  // console.log("routes",loadRoutes)
  fs.readdirSync(routesPath).forEach((file) => {
    if (file.endsWith(".routes.ts")) {
      const route = require(path.join(routesPath, file));
      app.use("/api", route.default);
    }
  });
};

// Load routes
loadRoutes(app);

export default app;
