import { RolePermission } from "../models/rolePermission.model";

// Service to get all role-permission relationships
export const getAllRolePermissions = async () => {
  try {
    const rolePermissions = await RolePermission.findAll();
    return rolePermissions;
  } catch (error: any) {
    throw new Error("Error fetching role permissions: " + error.message);
  }
};

// Service to get a role-permission relationship by roleId and permissionId
export const getRolePermissionByIds = async (roleId: number, permissionId: number) => {
  try {
    const rolePermission = await RolePermission.findOne({
      where: { roleId, permissionId },
    });
    if (!rolePermission) {
      throw new Error("Role-Permission relationship not found");
    }
    return rolePermission;
  } catch (error: any) {
    throw new Error("Error fetching role permission: " + error.message);
  }
};
