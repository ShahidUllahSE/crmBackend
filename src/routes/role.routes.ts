import express from "express";
import {
  createRoleController,
  getRolesController,
  updateRolePermissionsController,
} from "../controllers/role.controller";

const router = express.Router();

router.post("/create", createRoleController);
router.get("/all", getRolesController);
router.put("/update/:id", updateRolePermissionsController);

export default router;
