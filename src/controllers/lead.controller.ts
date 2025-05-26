import { Request, Response } from "express";
import * as LeadService from "../services/lead.service";

export const createLead = async (req: Request, res: Response): Promise<any> => {
  try {
    const { campaignName, leadData } = req.body;

    if (!campaignName || !leadData || typeof leadData !== "object") {
      return res.status(400).json({ message: "Invalid lead data." });
    }

    const lead = await LeadService.createLead({ campaignName, leadData });
    return res.status(201).json({ message: "Lead created successfully", lead });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAllLeads = async (_req: Request, res: Response): Promise<any> => {
  try {
    const leads = await LeadService.getAllLeads();
    return res.status(200).json(leads);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getLeadsByCampaign = async (req: Request, res: Response): Promise<any> => {
  try {
    const { campaignName } = req.params;
    const leads = await LeadService.getLeadsByCampaign(campaignName);

    if (leads.length === 0) {
      return res.status(404).json({ message: "No leads found for this campaign" });
    }

    return res.status(200).json(leads);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
