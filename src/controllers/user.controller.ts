import { Request, Response } from "express";
import { createUser, deleteUser, getAllUsers, getUserById, loginUser, updateUser } from "../services/user.service";
import { UserAttributes } from "../interfaces/user.interface";
import User from "../models/user.model";  // Make sure the correct path is used

// controllers/user.controller.ts

export const registerUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const userData: Partial<UserAttributes> = req.body;

    // Validate required fields
    if (!userData.email || !userData.password) {
      return res.status(400).json({ message: "Email and password are required!" });
    }

    // Call service function to create a user
    const user = await createUser(userData);

    // Respond with success message and user info
    return res.status(201).json({ message: "User registered successfully!", user });
  } catch (error) {
    console.error("Registration Error:", error);
    return res.status(500).json({ message: "Internal Server Error", error: (error as Error).message });
  }
};



export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;
    console.log("req body", req.body);

    // Validate email and password
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required!" });
    }

    // Call the login service function
    const result = await loginUser({ email, password });

    // Respond with the user data and token
    return res.status(200).json(result);
  } catch (error: any) {
    console.error("Login Error:", error.message);
    return res.status(500).json({ message: "Something went wrong during login." });
  }
};


export const getUsers = async (req: Request, res: Response): Promise<any> => {
  try {
    const users = await getAllUsers();
    return res.status(200).json({
      message: "Users retrieved successfully!",
      users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: (error as Error).message,
    });
  }
};

export const getUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = parseInt(req.params.id); // Extract user ID from the URL params

    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID!" });
    }

    const user = await getUserById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    return res.status(200).json({
      message: "User retrieved successfully!",
      user,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ message: "Internal Server Error", error: (error as Error).message });
  }
};




// Update user by ID (no authentication or role checks)
export const updateUserController = async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = req.params.id;  // Get user ID from URL parameters
    const updatedData = req.body;  // Get the updated user data from the request body

    // Call the service function to update the user
    const updatedUser = await updateUser(userId, updatedData);

    // Return the updated user in the response
    return res.status(200).json({ message: "User updated successfully!", user: updatedUser });
  } catch (error:any) {
    console.error("Update Error:", error);
    return res.status(500).json({ message: "Something went wrong during the update.", error: error.message });
  }
};



// Delete user by ID
export const deleteUserController = async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = req.params.id;  // Get user ID from URL parameters

    // Call the service function to delete the user
    const message = await deleteUser(userId);

    // Return the success message
    return res.status(200).json({ message });
  } catch (error:any) {
    console.error("Delete Error:", error);
    return res.status(500).json({ message: "Something went wrong during deletion.", error: error.message });
  }
};

// src/controllers/userController.ts
// import { Request, Response } from "express";
// import {
//   createUser,
//   loginUser,
//   getAllUsers,
//   // getUserById,
//   updateUser,
//   deleteUser
// } from "../services/user.service";
// import { UserAttributes } from "../interfaces/user.interface";

// // Register a new user (Admin, Vendor, or Client)
// export const registerUser = async (req: Request, res: Response): Promise<any> => {
//   try {
//     const userData: Partial<UserAttributes> = req.body;

//     if (!userData.email || !userData.password || !userData.roleId) {
//       return res.status(400).json({ message: "Email, password, and roleId are required!" });
//     }

//     const user = await createUser(userData); // Service handles creation
//     return res.status(201).json({ message: "User registered successfully!", user });

//   } catch (error: any) {
//     console.error("Registration Error:", error.message);
//     return res.status(500).json({ message: "Internal Server Error", error: error.message });
//   }
// };

// // User Login
// export const login = async (req: Request, res: Response): Promise<any> => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) {
//       return res.status(400).json({ message: "Email and password are required!" });
//     }

//     const result = await loginUser({ email, password });
//     return res.status(200).json(result);

//   } catch (error: any) {
//     console.error("Login Error:", error.message);
//     return res.status(401).json({ message: "Invalid credentials.", error: error.message });
//   }
// };

// // Fetch all users (with roles/vendors/clients)
// export const getUsers = async (_req: Request, res: Response): Promise<any> => {
//   try {
//     const users = await getAllUsers();
//     return res.status(200).json({ message: "Users retrieved successfully!", users });

//   } catch (error: any) {
//     console.error("Error fetching users:", error.message);
//     return res.status(500).json({ message: "Internal Server Error", error: error.message });
//   }
// };

// // Get user by ID
// // export const getUser = async (req: Request, res: Response): Promise<any> => {
// //   try {
// //     const userId = parseInt(req.params.id);
// //     if (isNaN(userId)) {
// //       return res.status(400).json({ message: "Invalid user ID!" });
// //     }

// //     const user = await getUserById(userId);
// //     if (!user) {
// //       return res.status(404).json({ message: "User not found!" });
// //     }

// //     return res.status(200).json({ message: "User retrieved successfully!", user });

// //   } catch (error: any) {
// //     console.error("Error fetching user:", error.message);
// //     return res.status(500).json({ message: "Internal Server Error", error: error.message });
// //   }
// // };

// // Update user by ID
// export const updateUserController = async (req: Request, res: Response): Promise<any> => {
//   try {
//     const userId = parseInt(req.params.id);
//     if (isNaN(userId)) {
//       return res.status(400).json({ message: "Invalid user ID!" });
//     }

//     const updatedData: Partial<UserAttributes> = req.body;
//     const updatedUser = await updateUser(userId, updatedData);

//     return res.status(200).json({ message: "User updated successfully!", user: updatedUser });

//   } catch (error: any) {
//     console.error("Update Error:", error.message);
//     return res.status(500).json({ message: "Something went wrong during update.", error: error.message });
//   }
// };

// // Delete user by ID
// export const deleteUserController = async (req: Request, res: Response): Promise<any> => {
//   try {
//     const userId = parseInt(req.params.id);
//     if (isNaN(userId)) {
//       return res.status(400).json({ message: "Invalid user ID!" });
//     }

//     const message = await deleteUser(userId);
//     return res.status(200).json({ message });

//   } catch (error: any) {
//     console.error("Delete Error:", error.message);
//     return res.status(500).json({ message: "Something went wrong during deletion.", error: error.message });
//   }
// };
