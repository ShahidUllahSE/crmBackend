import { Router } from "express";
import {
  createClientLeadController,
  getClientLeadsByOrder,
  getClientLead,
} from "../controllers/clientLead.controller";
import { verifyToken } from "../middleware/verifyToken.middleware"; // Adjust as needed

const router = Router();

// POST /api/client-leads
router.post("/createClientLead", verifyToken, createClientLeadController);

// GET /api/client-leads/order/:orderId
router.get("/GetClientOrder/:orderId", verifyToken, getClientLeadsByOrder);

// GET /api/client-leads/:id
router.get("/getClientLeadById:id", verifyToken, getClientLead);

export default router;
