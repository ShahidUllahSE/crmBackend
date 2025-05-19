import User from "../models/user.model";
import bcrypt from "bcrypt";
import { UserAttributes } from "../interfaces/user.interface";
import jwt from "jsonwebtoken";
import { logActivity } from "./activity.service";
import { sendNotification } from "./notification.service";
import { Role } from "../models/role.model"; // Adjust the path based on your folder structure


export const createUser = async (
  userData: Partial<UserAttributes>
): Promise<any> => {
  const { email, password, roleId } = userData;

  if (!email || !password || !roleId) {
    throw new Error("Email, password, and roleId are required!");
  }

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error("Email already in use!");
  }

  const salt = await bcrypt.genSalt(10);
  userData.password = await bcrypt.hash(password, salt);

  const newUserData: Partial<UserAttributes> = {
    ...userData,
    block: false,
    token: userData.token || "",
    created_at: new Date(),
    updated_at: new Date(),
  };

  const user = await User.create(newUserData);

  if (!user.id) {
    throw new Error("User ID not found after creation");
  }

  await logActivity(user.id, "Registration", "User registered successfully");
  await sendNotification(user.id, "Welcome! Your account has been successfully created.");

  // ✅ Include associated role data
  const userWithRole = await User.findByPk(user.id, {
    include: [{ model: Role, as: "role" }],
  });

  if (!userWithRole) {
    throw new Error("Failed to fetch created user with role");
  }

  return {
    user: {
      id: userWithRole.id,
      firstname: userWithRole.firstname,
      lastname: userWithRole.lastname,
      email: userWithRole.email,
      userrole: userWithRole.userrole,
      roleId: userWithRole.roleId,
      role: userWithRole.role, // Full role object
      block: userWithRole.block,
      last_login: userWithRole.last_login,
    },
  };
};

export const loginUser = async (userData: {
  email: string;
  password: string;
}): Promise<any> => {
  const { email, password } = userData;

  if (!email || !password) {
    throw new Error("Email and password are required!");
  }

  const user = await User.findOne({
    where: { email },
    include: [{ model: Role, as: "role" }],
  });

  if (!user || !user.password) {
    throw new Error("Invalid credentials!");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid credentials!");
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, userrole: user.userrole },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  );

  if (user.id) {
    await logActivity(user.id, "Login", "User logged in successfully");
    await sendNotification(user.id, "You have successfully logged in!");
  }

  return {
    user: {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      userrole: user.userrole,
      roleId: user.roleId,
      role: user.role, // Full role object
      block: user.block,
      last_login: user.last_login,
    },
    token,
  };
};



export const getAllUsers = async (): Promise<UserAttributes[]> => {
  try {
    const users = await User.findAll({ include: ["role"] }); // Include role relationship
    return users;
  } catch (error) {
    throw new Error("Error fetching users: " + (error as Error).message);
  }
};

export const getUserById = async (
  userId: number
): Promise<UserAttributes | null> => {
  try {
    const user = await User.findByPk(userId, { include: ["role"] }); // Include role relationship
    return user;
  } catch (error) {
    throw new Error("Error fetching user: " + (error as Error).message);
  }
};

export const updateUser = async (
  userId: string,
  updatedData: Partial<UserAttributes>
): Promise<any> => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error("User not found!");
    }

    await user.update(updatedData);
    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const deleteUser = async (userId: string): Promise<string> => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error("User not found!");
    }

    await user.destroy();
    return "User deleted successfully!";
  } catch (error: any) {
    throw new Error(error.message);
  }
};


// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import User from "../models/user.model";
// import Vendor from "../models/vendor.model";
// import Client from "../models/client.model";
// import { UserAttributes } from "../interfaces/user.interface";
// import Role from "../models/role.model";

// // Create a new user with optional role-based creation
// export const createUser = async (userData: Partial<UserAttributes>): Promise<any> => {
//   const { email, password, roleId } = userData;

//   if (!email || !password || !roleId) {
//     throw new Error("Email, password, and role are required!");
//   }

//   // Find the roleId corresponding to userrole
//   const role = await Role.findByPk(roleId);
//   if (!role) {
//     throw new Error("Role not found");
//   }

//   const existingUser = await User.findOne({ where: { email } });
//   if (existingUser) {
//     throw new Error("Email already in use!");
//   }

//   // Hash password
//   const salt = await bcrypt.genSalt(10);
//   userData.password = await bcrypt.hash(password, salt);

//   // Create user with optional fields handled
//   const newUser = await User.create({
//     firstname: userData.firstname ?? '',
//     lastname: userData.lastname ?? '',
//     email: userData.email!,
//     password: userData.password!,
//     roleId: role.id,  // Assign the correct roleId
//     block: userData.block ?? false,  // Default to false if not provided
//     token: userData.token ?? "",  // Default to empty string if not provided
//     created_at: userData.created_at ?? new Date(),
//     updated_at: userData.updated_at ?? new Date(),
//     // Provide default empty strings for optional fields if not provided
//     phone: userData.phone ?? '',  // Default to empty string if not provided
//     address: userData.address ?? '',  // Default to empty string if not provided
//     website: userData.website ?? '',  // Default to empty string if not provided
//     linkedin: userData.linkedin ?? '',  // Default to empty string if not provided
//     useruimage: userData.useruimage ?? '', // Default to empty string if not provided
//     referred_to: userData.referred_to ?? '', // Default to empty string if not provided
//     last_login: userData.last_login ?? new Date(), // Default value if not present
//   });

//   return newUser;
// };

// // Login user and return token
// export const loginUser = async ({ email, password }: { email: string; password: string }): Promise<any> => {
//   const user = await User.findOne({
//     where: { email },
//     include: [{ model: Role, as: "role" }]  // Include the role model
//   });

//   if (!user || !user.password) {
//     throw new Error("Invalid email or password!");
//   }

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) {
//     throw new Error("Invalid credentials!");
//   }

//   const token = jwt.sign({ id: user.id, email: user.email, roleId: user.roleId }, process.env.JWT_SECRET as string, {
//     expiresIn: "1h",
//   });

//   return {
//     user: {
//       id: user.id,
//       firstname: user.firstname,
//       lastname: user.lastname,
//       email: user.email,
//       role: user.role?.role,  // Access role from the 'role' model
//       block: user.block,
//       last_login: user.last_login ?? new Date(),  // Default value if not present
//     },
//     token,
//   };
// };

// // Fetch all users with related role data
// export const getAllUsers = async (): Promise<any[]> => {
//   const users = await User.findAll({
//     include: [
//       { model: Vendor, as: "vendor", required: false },
//       { model: Client, as: "client", required: false },
//       { model: Role, as: "role", required: true }, // Always include role data
//     ],
//   });

//   return users.map(user => ({
//     id: user.id,
//     firstname: user.firstname,
//     lastname: user.lastname,
//     email: user.email,
//     role: user.role?.role,  // Access role from the 'role' model
//     block: user.block,
//     last_login: user.last_login ?? new Date(), // Default value for last_login
//   }));
// };

// // Update user and related role entity
// export const updateUser = async (userId: number, updatedData: Partial<UserAttributes>): Promise<any> => {
//   const user = await User.findByPk(userId, {
//     include: [
//       { model: Vendor, as: "vendor", required: false },
//       { model: Client, as: "client", required: false },
//     ],
//   });

//   if (!user) throw new Error("User not found!");

//   // Update user
//   await user.update({ ...updatedData, updated_at: new Date() });

//   // Update related vendor/client based on user role
//   if (user.roleId) {
//     const role = await Role.findByPk(user.roleId);
//     if (!role) throw new Error("Role not found!");

//     // Update role-specific data for Vendor or Client
//     if (role.role === "vendor") {  // Role comparison now with lowercase string
//       const vendor = await Vendor.findOne({ where: { userId: user.id } });
//       if (vendor) await vendor.update(updatedData);
//     } else if (role.role === "client") {  // Role comparison now with lowercase string
//       const client = await Client.findOne({ where: { userId: user.id } });
//       if (client) await client.update(updatedData);
//     }
//   }

//   return user;
// };

// // Delete user and associated role-specific record
// export const deleteUser = async (userId: number): Promise<string> => {
//   const user = await User.findByPk(userId);
//   if (!user) throw new Error("User not found!");

//   // Delete associated vendor/client data based on user role
//   if (user.roleId) {
//     const role = await Role.findByPk(user.roleId);
//     if (!role) throw new Error("Role not found!");

//     // Delete vendor or client data based on the role
//     if (role.role === "vendor") {  // Role comparison now with lowercase string
//       await Vendor.destroy({ where: { userId: user.id } });
//     } else if (role.role === "client") {  // Role comparison now with lowercase string
//       await Client.destroy({ where: { userId: user.id } });
//     }
//   }

//   // Delete the user itself
//   await user.destroy();
//   return "User deleted successfully!";
// };
