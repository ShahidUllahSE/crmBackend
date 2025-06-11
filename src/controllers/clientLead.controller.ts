import { Request, Response } from "express";
import {
  createClientLead,
  getClientLeadsByOrderId,
  getClientLeadById,
  getAllClientLeads,
  updateClientLeadById,
  deleteClientLeadById,
} from "../services/clientLead.service";
import { CustomRequest } from "../types/custom";

// Create a client lead
export const createClientLeadController = async (req: CustomRequest, res: Response): Promise<any> => {
  try {
    const userId = req.user?.id;
    const { order_id, campaign, leadData } = req.body;

    // Validate campaign object and required fields
    if (!order_id || !campaign || !campaign.id || !leadData) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: order_id, campaign.id, leadData",
      });
    }

    const campaign_id = campaign.id;

    const lead = await createClientLead({
      order_id,
      campaign_id,
      leadData,
      created_by: userId,
    });

    return res.status(201).json({
      success: true,
      message: "Client lead created successfully",
      data: lead,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};


// Get all client leads
export const getAllClientLeadsController = async (req: Request, res: Response): Promise<any> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const leads = await getAllClientLeads(page, limit);

    return res.status(200).json({
      success: true,
      message: "Client leads fetched successfully",
      ...leads, // includes: totalItems, data, totalPages, currentPage
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Get client leads by order ID
export const getClientLeadsByOrder = async (req: Request, res: Response): Promise<any> => {
  try {
    const { orderId } = req.params;
    if (!orderId || isNaN(Number(orderId))) {
      return res.status(400).json({ success: false, message: "Invalid orderId parameter" });
    }

    const leads = await getClientLeadsByOrderId(Number(orderId));
    return res.status(200).json({ success: true, data: leads });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Failed to fetch leads" });
  }
};

// Get single client lead by ID
export const getClientLead = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ success: false, message: "Invalid lead ID parameter" });
    }

    const lead = await getClientLeadById(Number(id));

    if (!lead) {
      return res.status(404).json({ success: false, message: "Lead not found" });
    }

    return res.status(200).json({ success: true, data: lead });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Update client lead
export const updateClientLead = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ success: false, message: "Invalid lead ID parameter" });
    }

    const updateData = req.body;

    const updatedLead = await updateClientLeadById(Number(id), updateData);
    return res.status(200).json({ success: true, message: "Client lead updated", data: updatedLead });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Delete client lead
export const deleteClientLead = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ success: false, message: "Invalid lead ID parameter" });
    }

    const result = await deleteClientLeadById(Number(id));
    return res.status(200).json({ success: true, message: result.message });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
