import { Request, Response } from "express";
import { createRole, getAllRolesWithPermissions, updateRolePermissions } from "../services/role.service";

export const createRoleController = async (req: Request, res: Response):Promise<any> => {
  try {
    const role = await createRole(req.body);
    return res.status(201).json({ message: "Role created successfully", role });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getRolesController = async (_req: Request, res: Response):Promise<any> => {
  try {
    const roles = await getAllRolesWithPermissions();
    return res.status(200).json({ roles });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateRolePermissionsController = async (req: Request, res: Response):Promise<any> => {
  try {
    const roleId = parseInt(req.params.id);
    const permissions = req.body.permissions;  // array of permission IDs

    const updated = await updateRolePermissions(roleId, permissions);
    return res.status(200).json({ message: "Role permissions updated", roles: updated });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
