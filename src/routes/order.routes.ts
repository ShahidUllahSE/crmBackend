import { Router } from "express";
import { 
  createOrderController, 
  getAllOrdersController, 
  getOrderByIdController, 
  updateOrderByIdController, 
  deleteOrderByIdController 
} from "../controllers/order.controller"; 
import { verifyToken } from "../middleware/verifyToken.middleware"; 

const router = Router();

router.post("/createOrder", verifyToken, createOrderController);

router.get("/orders", verifyToken, getAllOrdersController);

router.get("/orders/:id", verifyToken, getOrderByIdController);

router.put("/orders/:id", verifyToken, updateOrderByIdController);

router.delete("/orders/:id", verifyToken, deleteOrderByIdController);

export default router;
