import { Router } from "express";
import {
  createCampaignn,
  getAllCampaigns,
  getCampaignById,
  updateCampaign,
  deleteCampaign
} from "../controllers/campaign.controller";
import express from "express";

import { verifyToken } from "../middleware/verifyToken.middleware";
import { checkPermission } from "../middleware/checkPermission";
import { PERMISSIONS } from "../constants/permissions";

const router = express.Router();
// Create campaign
router.post(
    "/createCampaign",
    verifyToken,
    checkPermission(PERMISSIONS.CAMPAIGN_CREATE),
    createCampaignn
  );
  
  // Get all campaigns
  router.get(
    "/getAllCampaigns",
    verifyToken,
    checkPermission(PERMISSIONS.CAMPAIGN_GET),
    getAllCampaigns
  );
  
  // Get campaign by ID
  router.get(
    "/getCampaignById/:id",
    verifyToken,
    checkPermission(PERMISSIONS.CAMPAIGN_GET),
    getCampaignById
  );
  
  // Update campaign
  router.put(
    "/updateCampaignById/:id",
    verifyToken,
    checkPermission(PERMISSIONS.CAMPAIGN_UPDATE),
    updateCampaign
  );
  
  // Delete campaign
  router.delete(
    "/deleteCampaign/:id",
    verifyToken,
    checkPermission(PERMISSIONS.CAMPAIGN_DELETE),
    deleteCampaign
  );
export default router;