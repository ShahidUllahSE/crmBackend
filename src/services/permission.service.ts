import { Permission } from "../models/permission.model";

// Service to get all permissions
export const getAllPermissions = async () => {
  try {
    const permissions = await Permission.findAll();
    return permissions;
  } catch (error: any) {
    throw new Error("Error fetching permissions: " + error.message);
  }
};

// Service to get a permission by ID
export const getPermissionById = async (id: number) => {
  try {
    const permission = await Permission.findByPk(id);
    if (!permission) {
      throw new Error("Permission not found");
    }
    return permission;
  } catch (error: any) {
    throw new Error("Error fetching permission: " + error.message);
  }
};
