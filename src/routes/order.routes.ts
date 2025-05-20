import { Router } from "express";
import {
  createOrderController,
  getAllOrdersController,
  getOrderByIdController,
  updateOrderByIdController,
  deleteOrderByIdController,
} from "../controllers/order.controller";
import { verifyToken } from "../middleware/verifyToken.middleware";
import { checkPermission } from "../middleware/checkPermission";
import { PERMISSIONS } from "../constants/permissions";

const router = Router();

router.post(
  "/createOrder",
  verifyToken,
  checkPermission(PERMISSIONS.ORDER_CREATE),
  createOrderController
);

router.get(
  "/orders",
  verifyToken,
  checkPermission(PERMISSIONS.ORDER_GET),
  getAllOrdersController
);

router.get(
  "/orders/:id",
  verifyToken,
  checkPermission(PERMISSIONS.ORDER_GET),
  getOrderByIdController
);

router.put(
  "/orders/:id",
  verifyToken,
  checkPermission(PERMISSIONS.ORDER_UPDATE),
  updateOrderByIdController
);

router.delete(
  "/orders/:id",
  verifyToken,
  checkPermission(PERMISSIONS.ORDER_DELETE),
  deleteOrderByIdController
);

export default router;
