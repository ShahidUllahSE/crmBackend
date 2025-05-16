import express from "express";
import {
  deleteUserController,
  getUser,
  getUsers,
  login,
  registerUser,
  updateUserController,
} from "../controllers/user.controller";
import { checkPermission } from "../middleware/checkPermission";
import { PERMISSIONS } from "../constants/permissions";
import { verifyToken } from "../middleware/verifyToken.middleware";

const router = express.Router();

router.post(
  "/registerr",
  //   checkPermission(PERMISSIONS.USER_CREATE),
  registerUser
);

router.post("/login", login); // No permission needed for login

router.get(
  "/getAllUsers",
  verifyToken,
  checkPermission(PERMISSIONS.USER_GET),
  getUsers
);
router.get(
  "/getUserById/:id",
  verifyToken,
  checkPermission(PERMISSIONS.USER_GET),
  getUser
);

router.put(
  "/updateUserById/:id",
  verifyToken,
  checkPermission(PERMISSIONS.USER_UPDATE),
  updateUserController
);

router.delete(
  "/deleteUserById/:id",
  verifyToken,
  checkPermission(PERMISSIONS.USER_DELETE),
  deleteUserController
);

export default router;
