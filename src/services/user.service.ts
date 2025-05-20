// import User from "../models/user.model";
// import bcrypt from "bcrypt";
// import { UserAttributes } from "../interfaces/user.interface";
// import jwt from "jsonwebtoken";
// import { logActivity } from "./activity.service";
// import { sendNotification } from "./notification.service";
// import Role from "../models/role.model";
// import Permission from "../models/permission.model";

// export const createUser = async (
//   userData: Partial<UserAttributes>
// ): Promise<any> => {
//   const { email, password, roleId } = userData;

//   if (!email || !password || !roleId) {
//     throw new Error("Email, password, and roleId are required!");
//   }

//   const existingUser = await User.findOne({ where: { email } });
//   if (existingUser) {
//     throw new Error("Email already in use!");
//   }

//   const salt = await bcrypt.genSalt(10);
//   userData.password = await bcrypt.hash(password, salt);

//   const newUserData: Partial<UserAttributes> = {
//     ...userData,
//     block: false,
//     token: userData.token || "",
//     created_at: new Date(),
//     updated_at: new Date(),
//   };

//   const user = await User.create(newUserData);

//   if (!user.id) {
//     throw new Error("User ID not found after creation");
//   }

//   await logActivity(user.id, "Registration", "User registered successfully");
//   await sendNotification(user.id, "Welcome! Your account has been successfully created.");

//   // Include Role with alias and its Permissions with alias
//   const userWithRole = await User.findByPk(user.id, {
//     include: [
//       {
//         model: Role,
//         as: "role", // Must use alias 'role' here
//         include: [
//           {
//             model: Permission,
//             as: "permissions", // Must use alias 'permissions' here
//             through: { attributes: [] },
//           },
//         ],
//       },
//     ],
//   });

//   if (!userWithRole) {
//     throw new Error("Failed to fetch created user with role");
//   }

//   return {
//     user: {
//       id: userWithRole.id,
//       firstname: userWithRole.firstname,
//       lastname: userWithRole.lastname,
//       email: userWithRole.email,
//       userrole: userWithRole.userrole,
//       roleId: userWithRole.roleId,
//       role: userWithRole.role, // Full role object
//       block: userWithRole.block,
//       last_login: userWithRole.last_login,
//     },
//   };
// };

// export const loginUser = async (userData: {
//   email: string;
//   password: string;
// }): Promise<any> => {
//   const { email, password } = userData;

//   if (!email || !password) {
//     throw new Error("Email and password are required!");
//   }

//   const user = await User.findOne({
//     where: { email },
//     include: [
//       {
//         model: Role,
//         as: "role", // Alias 'role' here
//         include: [
//           {
//             model: Permission,
//             as: "permissions", // Alias 'permissions' here
//             through: { attributes: [] },
//           },
//         ],
//       },
//     ],
//   });

//   if (!user || !user.password) {
//     throw new Error("Invalid credentials!");
//   }

//   const isPasswordValid = await bcrypt.compare(password, user.password);
//   if (!isPasswordValid) {
//     throw new Error("Invalid credentials!");
//   }

//   const token = jwt.sign(
//     { id: user.id, email: user.email, userrole: user.userrole },
//     process.env.JWT_SECRET as string,
//     { expiresIn: "1h" }
//   );

//   if (user.id) {
//     await logActivity(user.id, "Login", "User logged in successfully");
//     await sendNotification(user.id, "You have successfully logged in!");
//   }

//   return {
//     user: {
//       id: user.id,
//       firstname: user.firstname,
//       lastname: user.lastname,
//       email: user.email,
//       userrole: user.userrole,
//       roleId: user.roleId,
//       role: user.role, // Full role object
//       block: user.block,
//       last_login: user.last_login,
//     },
//     token,
//   };
// };

// export const getAllUsers = async (): Promise<any[]> => {
//   try {
//     const users = await User.findAll({
//       include: [
//         {
//           model: Role,
//           as: "role", // Alias defined in User.belongsTo(Role, { as: 'role' })
//           include: [
//             {
//               model: Permission,
//               as: "permissions", // Alias defined in Role.belongsToMany(Permission, { as: 'permissions' })
//               through: { attributes: [] }, // Hide junction table
//             },
//           ],
//         },
//       ],
//     });

//     return users;
//   } catch (error) {
//     throw new Error("Error fetching users: " + (error as Error).message);
//   }
// };

// export const getUserById = async (
//   userId: number
// ): Promise<UserAttributes | null> => {
//   try {
//     const user = await User.findByPk(userId, {
//       include: [
//         {
//           model: Role,
//           as: "role", // Alias 'role' here
//           include: [
//             {
//               model: Permission,
//               as: "permissions", // Alias 'permissions' here
//               through: { attributes: [] },
//             },
//           ],
//         },
//       ],
//     });
//     return user;
//   } catch (error) {
//     throw new Error("Error fetching user: " + (error as Error).message);
//   }
// };

// export const updateUser = async (
//   userId: string,
//   updatedData: Partial<UserAttributes>
// ): Promise<any> => {
//   try {
//     const user = await User.findByPk(userId);
//     if (!user) {
//       throw new Error("User not found!");
//     }

//     await user.update(updatedData);
//     return user;
//   } catch (error: any) {
//     throw new Error(error.message);
//   }
// };

// export const deleteUser = async (userId: string): Promise<string> => {
//   try {
//     const user = await User.findByPk(userId);
//     if (!user) {
//       throw new Error("User not found!");
//     }

//     await user.destroy();
//     return "User deleted successfully!";
//   } catch (error: any) {
//     throw new Error(error.message);
//   }
// };



// services/user.service.ts
import User from "../models/user.model";
import bcrypt from "bcrypt";
import { UserAttributes } from "../interfaces/user.interface";
import jwt from "jsonwebtoken";  // Make sure you have the `jsonwebtoken` package installed
import { logActivity } from "./activity.service";  // Import activity service
import { sendNotification } from "./notification.service";  // Import notification service

export const createUser = async (userData: Partial<UserAttributes>): Promise<UserAttributes> => {
    const { email, password, userrole } = userData;
  
    if (!email || !password || !userrole) {  // Ensure userrole is provided
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
  
    // Ensure userrole is always defined
    const newUserData: UserAttributes = {
      ...userData,
      userrole: userrole,
      block: false,
      token: userData.token || "",  // Assign default if token is missing
      created_at: new Date(),
      updated_at: new Date(),
    };
  
    const user = await User.create(newUserData);

    if (!user.id) {
      throw new Error("User ID not found after creation");
    }

    // Log the user registration activity
    await logActivity(user.id, "Registration", "User registered successfully");

    // Send a notification to the user about the successful registration
    await sendNotification(user.id, "Welcome! Your account has been successfully created.");

    return user;
};


// services/user.service.ts
export const loginUser = async (userData: { email: string, password: string }): Promise<any> => {
  const { email, password } = userData;

  console.log("User Data received:", userData);

  if (!password) {
    throw new Error("Password is required!");
  }
  if (!email) {
    throw new Error("Email is required!");
  }

  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error("User not found!");
  }

  if (!user.password) {
    throw new Error("User password is missing!");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid credentials!");
  }

  // ✅ Include userrole in the token
  const token = jwt.sign(
    { id: user.id, email: user.email, userrole: user.userrole },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  );

  // ✅ Log the login activity only if user.id is not undefined
  if (user.id) {
    await logActivity(user.id, "Login", "User logged in successfully");
  } else {
    throw new Error("User ID is missing!");
  }

  // ✅ Send a notification to the user on successful login
  if (user.id) {
    await sendNotification(user.id, "You have successfully logged in!");
  }

  // ✅ Ensure userrole is returned in the response
  return {
    user: {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      userrole: user.userrole, // Role returned to frontend
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

