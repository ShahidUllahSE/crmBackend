import { Response, NextFunction } from "express";
import { extractUserIdFromToken } from "../utils/authHelper"; 
import { CustomRequest } from "../types/custom"; 

export const verifyToken = (req: CustomRequest, res: Response, next: NextFunction): any => { 
  const token = req.headers.authorization?.split(" ")[1]; 

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  const userId = extractUserIdFromToken(token); 

  if (!userId) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }

  req.user = { id: userId };
  next(); 
};
