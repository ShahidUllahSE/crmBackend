import Role from "../models/role.model";
import Permission from "../models/permission.model";
import RolePermission from "../models/rolePermission.model";

// Service to create a role and associate permissions
export const createRole = async (roleData: { name: string, permissions: number[] }) => {
  const { name, permissions } = roleData;

  try {
    // Create the role
    const role = await Role.create({ name });

    // Ensure the role ID is valid
    if (!role || !role.id) {
      throw new Error("Role creation failed, role ID is null.");
    }

    console.log("Role created with ID:", role.id);  // Debugging log to verify role ID

    // Associate permissions if provided
    if (permissions && permissions.length > 0) {
      // Fetch the permissions from the database
      const existingPermissions = await Permission.findAll({
        where: { id: permissions }
      });

      // Ensure permissions are valid
      if (existingPermissions.length === 0) {
        throw new Error("No valid permissions found.");
      }

      // Map and create role_permissions entries
      const rolePermissions = existingPermissions.map((permission: any) => ({
        roleId: role.id,  // Corrected to `roleId`
        permissionId: permission.id
      }));

      // Insert role_permissions entries in bulk
      await RolePermission.bulkCreate(rolePermissions);

      console.log("Permissions associated with role successfully.");
    }

    // Return the created role object
    return { message: "Role created successfully", role };
  } catch (error: any) {
    // Log the error for better diagnostics
    console.error("Error creating role:", error);

    // Handle Sequelize validation errors
    if (error.name === 'SequelizeValidationError') {
      const errorMessages = error.errors.map((err: any) => err.message);
      return { message: "Validation error", details: errorMessages };
    }

    // Handle foreign key constraint error
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return { message: "Foreign key constraint failed. Ensure role and permission IDs are valid.", details: error.sqlMessage };
    }

    // Handle other types of errors
    return { message: "Error occurred while creating the role.", details: error.message };
  }
};



export const getAllRolesWithPermissions = async () => {
  const roles = await Role.findAll({
    include: [
      {
        model: Permission,
        through: { attributes: [] }  // exclude join table data
      }
    ]
  });
  return roles;
};

export const updateRolePermissions = async (roleId: number, permissions: number[]) => {
  const role = await Role.findByPk(roleId);
  if (!role) throw new Error("Role not found");

  // Remove existing permissions
  await RolePermission.destroy({ where: { role_id: roleId } });

  // Add new permissions
  const newMappings = permissions.map(pid => ({
    role_id: roleId,
    permission_id: pid,
  }));
  await RolePermission.bulkCreate(newMappings);

  return await getAllRolesWithPermissions();
};


export const deleteRole = async (roleId: number) => {
  try {
    // Check if role exists
    const role = await Role.findByPk(roleId);
    if (!role) {
      return { message: "Role not found", success: false };
    }

    // Delete associated role-permission entries first
    await RolePermission.destroy({ where: { role_id: roleId } });

    // Delete the role itself
    await Role.destroy({ where: { id: roleId } });

    return { message: "Role deleted successfully", success: true };
  } catch (error: any) {
    console.error("Error deleting role:", error);
    return {
      message: "Error occurred while deleting the role.",
      success: false,
      details: error.message,
    };
  }
};
