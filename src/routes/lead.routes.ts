import { Router } from "express";
import * as LeadController from "../controllers/lead.controller";
import { verifyToken } from "../middleware/verifyToken.middleware";
import { checkPermission } from "../middleware/checkPermission";
import { PERMISSIONS } from "../constants/permissions";

const router = Router();

router.post(
  "/leads",
  verifyToken,
  checkPermission(PERMISSIONS.LEAD_CREATE),
  LeadController.createLead
);

router.get(
  "/leads",
  verifyToken,
  checkPermission(PERMISSIONS.LEAD_GET_ALL),
  LeadController.getAllLeads
);

router.get(
  "/leads/campaign/:campaignName",
  verifyToken,
  checkPermission(PERMISSIONS.LEAD_GET_BY_CAMPAIGN),
  LeadController.getLeadsByCampaign
);

export default router;
