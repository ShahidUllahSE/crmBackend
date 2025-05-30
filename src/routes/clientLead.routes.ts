import { Router } from "express";
import {
  createClientLeadController,
  getClientLeadsByOrder,
  getClientLead,
  getAllClientLeadsController,
  updateClientLead,
  deleteClientLead,
} from "../controllers/clientLead.controller";
import { verifyToken } from "../middleware/verifyToken.middleware"; // Adjust if path differs

const router = Router();

// Create a new client lead
router.post("/createClientLead", verifyToken, createClientLeadController);

// Get all client leads
router.get("/getAllClientLeads", verifyToken, getAllClientLeadsController);

// Get client leads by order ID
router.get("/getClientOrder/:orderId", verifyToken, getClientLeadsByOrder);

// Get a single client lead by ID
router.get("/getClientLeadById/:id", verifyToken, getClientLead);

// Update client lead by ID
router.put("/updateClientLead/:id", verifyToken, updateClientLead);

// Delete client lead by ID
router.delete("/deleteClientLead/:id", verifyToken, deleteClientLead);

export default router;
