import { Request, Response } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  loginUser,
  updateUser,
  blockOrUnblockUser
} from "../services/user.service";
import { UserAttributes } from "../interfaces/user.interface";

// Register a new user
export const registerUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const userData: Partial<UserAttributes> = req.body;

    if (!userData.email || !userData.password) {
      return res.status(400).json({ message: "Email and password are required!" });
    }

    const user = await createUser(userData);
    return res.status(201).json({ message: "User registered successfully!", user });
  } catch (error) {
    console.error("Registration Error:", error);
    return res.status(500).json({ message: "Internal Server Error", error: (error as Error).message });
  }
};

// Login controller
export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required!" });
    }

    const result = await loginUser({ email, password });
    return res.status(200).json(result);
  } catch (error: any) {
    console.error("Login Error:", error.message);
    return res.status(500).json({ message: "Something went wrong during login." });
  }
};

// Get all users

export const getUsers = async (req: Request, res: Response): Promise<any> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const paginatedUsers = await getAllUsers({ page, limit });

    return res.status(200).json({
      success: true,
      message: "Users retrieved successfully!",
      ...paginatedUsers, // includes totalItems, data, totalPages, currentPage
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: (error as Error).message,
    });
  }
};
// Get single user by ID
export const getUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = parseInt(req.params.id);

    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID!" });
    }

    const user = await getUserById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    return res.status(200).json({ message: "User retrieved successfully!", user });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ message: "Internal Server Error", error: (error as Error).message });
  }
};

// Update user
export const updateUserController = async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = req.params.id;
    const updatedData = req.body;

    const updatedUser = await updateUser(userId, updatedData);

    return res.status(200).json({ message: "User updated successfully!", user: updatedUser });
  } catch (error: any) {
    console.error("Update Error:", error);
    return res.status(500).json({ message: "Something went wrong during the update.", error: error.message });
  }
};

// Delete user
export const deleteUserController = async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = req.params.id;

    const message = await deleteUser(userId);
    return res.status(200).json({ message });
  } catch (error: any) {
    console.error("Delete Error:", error);
    return res.status(500).json({ message: "Something went wrong during deletion.", error: error.message });
  }
};

// Block or Unblock a user
export const blockOrUnblockUserController = async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = req.params.id;
    const { action } = req.body; // "block" or "unblock"

    if (!["block", "unblock"].includes(action)) {
      return res.status(400).json({ message: "Invalid action. Use 'block' or 'unblock'." });
    }

    const message = await blockOrUnblockUser(userId, action as "block" | "unblock");

    return res.status(200).json({ message });
  } catch (error: any) {
    console.error("Block/Unblock Error:", error);
    return res.status(500).json({ message: "Something went wrong during block/unblock.", error: error.message });
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
