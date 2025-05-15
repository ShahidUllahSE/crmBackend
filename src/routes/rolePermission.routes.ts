import express from "express";
import * as RolePermissionController from "../controllers/rolePermission.controller";

const router = express.Router();

// Route to get all role-permission relationships
router.get("/getAllRolePermissions", RolePermissionController.getAllRolePermissionsController);

// Route to get a role-permission relationship by roleId and permissionId
router.get("/getRolePermissionById/:roleId/:permissionId", RolePermissionController.getRolePermissionByIdsController);

export default router;
