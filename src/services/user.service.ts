import User from "../models/user.model";
import bcrypt from "bcrypt";
import { UserAttributes } from "../interfaces/user.interface";

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
  
