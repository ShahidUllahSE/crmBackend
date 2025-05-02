import { Router } from "express";
import{createCampaignn,getAllCampaigns,getCampaignById,updateCampaign,deleteCampaign} from "../controllers/campaign.controller";  // Adjust based on your file structure

const router = Router();

// Define campaign routes
router.post("/createCampaign", createCampaignn);  // Create campaign
router.get("/getAllCampaigns",getAllCampaigns);   // Get all campaigns
router.get("/getCampaignById/:id", getCampaignById);  // Get campaign by ID
router.put("/updateCampaignById/:id", updateCampaign);  // Update campaign
router.delete("/deleteCampaign/:id",deleteCampaign);  // Delete campaign

export default router;
