import User from "../models/user.model";
import bcrypt from "bcrypt";
import { UserAttributes } from "../interfaces/user.interface";
import jwt from "jsonwebtoken";  // Make sure you have the `jsonwebtoken` package installed

export const createUser = async (userData: Partial<UserAttributes>): Promise<UserAttributes> => {
    const { email, password, userrole } = userData;
  
    if (!email || !password || !userrole) {  // ✅ Ensure userrole is provided
      throw new Error("Email, password, and user role are required!");
    }
  
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error("Email already in use!");
    }
  
    // Hash password
    const salt = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(password, salt);
  
    // ✅ Explicitly set userrole to ensure it's not undefined
    const newUserData: UserAttributes = {
      ...userData,
      userrole: userrole, // ✅ Ensuring it's always defined
      block: false,
      token: userData.token || "",  // ✅ Assign default if token is missing
      created_at: new Date(),
      updated_at: new Date(),
    };
  
    const user = await User.create(newUserData);
    return user;
  };
  



  export const loginUser = async (userData: { email: string, password: string }): Promise<any> => {
    console.log("User Data received:", userData);  
  
    const { email, password } = userData;
  
    if (!password) {
      throw new Error("Password is required!");
    }
    if (!email) {
      throw new Error("email is required!");
    }
  
    // Find the user in the database
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("User not found!");
    }
  
    // Ensure user.password is defined before comparing
    if (!user.password) {
      throw new Error("User password is missing!");
    }
  
    // Compare the provided password with the hashed password stored in the DB
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials!");
    }
  
    // Generate JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });
  
    // Return the user data and token
    return {
      user: {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        userrole: user.userrole,
        block: user.block,
        last_login: user.last_login,
      },
      token,
    };
  };
  
  
  export const getAllUsers = async (): Promise<UserAttributes[]> => {
    try {
      const users = await User.findAll();
      return users;
    } catch (error) {
      throw new Error("Error fetching users: " + (error as Error).message);
    }
  };

  export const getUserById = async (userId: number): Promise<UserAttributes | null> => {
    try {
      const user = await User.findByPk(userId); // Fetch user by primary key (ID)
      return user;
    } catch (error) {
      throw new Error("Error fetching user: " + (error as Error).message);
    }
  };




// Update user by ID
export const updateUser = async (userId: string, updatedData: Partial<UserAttributes>): Promise<any> => {
  try {
    // Find the user by primary key (ID)
    const user = await User.findByPk(userId);
    
    if (!user) {
      throw new Error("User not found!");
    }

    // Update the user with the provided data
    await user.update(updatedData);

    return user;  // Return the updated user
  } catch (error:any) {
    throw new Error(error.message);
  }
};



// Delete user by ID
export const deleteUser = async (userId: string): Promise<string> => {
  try {
    // Find the user by primary key (ID)
    const user = await User.findByPk(userId);
    
    if (!user) {
      throw new Error("User not found!");
    }

    // Delete the user
    await user.destroy();

    return "User deleted successfully!";
  } catch (error:any) {
    throw new Error(error.message);
  }
};
