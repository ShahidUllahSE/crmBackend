import { Request, Response } from "express";
import { createClientLead, getClientLeadsByOrderId, getClientLeadById } from "../services/clientLead.service";
import { CustomRequest } from "../types/custom";

export const createClientLeadController = async (req: CustomRequest, res: Response):Promise<any> => {
  try {
    const userId = req.user?.id;
    const { order_id, campaign_id, leadData } = req.body;

    if (!order_id || !campaign_id || !leadData) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: order_id, campaign_id, leadData",
      });
    }

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

export const getClientLeadsByOrder = async (req: Request, res: Response):Promise<any> => {
  try {
    const { orderId } = req.params;
    const leads = await getClientLeadsByOrderId(Number(orderId));

    return res.status(200).json({
      success: true,
      data: leads,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch leads",
    });
  }
};

export const getClientLead = async (req: Request, res: Response):Promise<any> => {
  try {
    const { id } = req.params;
    const lead = await getClientLeadById(Number(id));

    if (!lead) {
      return res.status(404).json({ success: false, message: "Lead not found" });
    }

    return res.status(200).json({ success: true, data: lead });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
