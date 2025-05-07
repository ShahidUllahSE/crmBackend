import { Request, Response } from "express";
import * as CampaignService from "../services/campaign.service";

// Create a new campaign
export const createCampaignn = async (req: Request, res: Response): Promise<any> => {
  try {
    const fields = req.body as any[]; // Expecting an array of field objects including campaignName in at least the first one

    if (!Array.isArray(fields) || fields.length === 0 || !fields[0].campaignName) {
      return res.status(400).json({ message: "Invalid data. Must include campaignName and at least one field." });
    }

    const campaign = await CampaignService.createCampaign(fields);
    return res.status(201).json(campaign);
  } catch (error: any) {
    console.error("Error in createCampaign controller:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Get all campaigns
export const getAllCampaigns = async (req: Request, res: Response): Promise<any> => {
  try {
    const campaigns = await CampaignService.getAllCampaigns();
    if (!campaigns || campaigns.length === 0) {
      return res.status(404).json({ message: "No campaigns found" });
    }
    return res.status(200).json(campaigns);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// Get a single campaign by ID
export const getCampaignById = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const campaign = await CampaignService.getCampaignById(Number(id));
    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }
    return res.status(200).json(campaign);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// Update a campaign by ID
export const updateCampaign = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const data = req.body;

    const campaign = await CampaignService.updateCampaign(Number(id), data);
    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }
    return res.status(200).json(campaign);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete a campaign by ID
export const deleteCampaign = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const success = await CampaignService.deleteCampaign(Number(id));
    if (!success) {
      return res.status(404).json({ message: "Campaign not found" });
    }
    return res.status(200).json({ message: "Campaign deleted successfully" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
