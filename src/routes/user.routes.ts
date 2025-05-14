import express from "express";
import {
  deleteUserController,
  getUsers,
  login,
  registerUser,
  updateUserController,
} from "../controllers/user.controller";
import { checkPermission } from "../middleware/checkPermission";
import { PERMISSIONS } from "../constants/permissions";

const router = express.Router();

router.post("/registerr", checkPermission(PERMISSIONS.USER_CREATE), registerUser);

router.post("/login", login); // No permission needed for login

router.get("/getAllUsers", checkPermission(PERMISSIONS.USER_GET), getUsers);

router.put("/updateUserById/:id", checkPermission(PERMISSIONS.USER_UPDATE), updateUserController);

router.delete("/deleteUserById/:id", checkPermission(PERMISSIONS.USER_DELETE), deleteUserController);

export default router;
