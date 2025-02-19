import { Request, Response } from "express";
import { createUser } from "../services/user.service";
import { UserAttributes } from "../interfaces/user.interface";

export const registerUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const userData: Partial<UserAttributes> = req.body;

    // Validate required fields
    if (!userData.email || !userData.password) {
      return res.status(400).json({ message: "Email and password are required!" });
    }

    // Call service function to create a user
    const user = await createUser(userData);

    return res.status(201).json({ message: "User registered successfully!", user });
  } catch (error) {
    console.error("Registration Error:", error);
    return res.status(500).json({ message: "Internal Server Error", error: (error as Error).message });
  }
};
