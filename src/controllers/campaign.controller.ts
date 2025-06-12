import { Request, Response } from "express";
import * as CampaignService from "../services/campaign.service";

// // ✅ Create a new campaign (with required + dynamic fields)
// export const createCampaignn = async (
//   req: Request,
//   res: Response
// ): Promise<any> => {
//   try {
//     const { campaignName, fields } = req.body;

//     // Check if campaignName is provided and fields is a non-empty array
//     if (!campaignName || !Array.isArray(fields) || fields.length === 0) {
//       return res
//         .status(400)
//         .json({
//           message:
//             "Invalid data. Must include campaignName and at least one field.",
//         });
//     }

//     // Prepare the data for the service
//     const campaignData = fields.map((field: any) => ({
//       campaignName,
//       col_name: field.col_name,
//       col_slug: field.col_slug,
//       col_type: field.col_type,
//       default_value:
//         field.default_value !== undefined
//           ? String(field.default_value)
//           : undefined,
//       options: field.options,
//       multiple: field.multiple,
//       dynamic_fields: field.dynamic_fields || null,
//     }));

//     // Call the service to create the campaign
//     const campaign = await CampaignService.createCampaign(campaignData);
//     return res
//       .status(201)
//       .json({ message: "Campaign created successfully", campaign });
//   } catch (error: any) {
//     console.error("Error in createCampaign controller:", error);
//     return res
//       .status(500)
//       .json({ message: `Error creating campaign: ${error.message}` });
//   }
// };


export const createCampaignn = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { campaignName, fields } = req.body;

    // Validate input
    if (!campaignName || !Array.isArray(fields) || fields.length === 0) {
      return res.status(400).json({
        message: "Invalid data. Must include campaignName and at least one field.",
      });
    }

    // Prepare data as an array with one object (to match your service expectation)
    const campaignData = [
      {
        campaignName,
        fields: fields.map((field: any) => ({
          col_name: field.col_name,
          col_slug: field.col_slug,
          col_type: field.col_type,
          default_value:
            field.default_value !== undefined
              ? String(field.default_value)
              : undefined,
          options: field.options,
          multiple: field.multiple,
          dynamic_fields: field.dynamic_fields || null,
        })),
      },
    ];

    // Call service with this structured data
    const campaign = await CampaignService.createCampaign(campaignData);

    return res.status(201).json({
      message: "Campaign created successfully",
      campaign,
    });
  } catch (error: any) {
    console.error("Error in createCampaign controller:", error);
    return res.status(500).json({
      message: `Error creating campaign: ${error.message}`,
    });
  }
};




// ✅ Get all campaigns, grouped by campaignName
export const getAllCampaigns = async (req: Request, res: Response): Promise<any> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const campaignsResult = await CampaignService.getAllCampaigns({ page, limit });

    if (!campaignsResult || campaignsResult.data.length === 0) {
      return res.status(404).json({ message: "No campaigns found" });
    }

    // Group fields by campaignName
    const grouped = campaignsResult.data.reduce((acc: any, field: any) => {
      const name = field.campaignName;
      if (!acc[name]) acc[name] = [];
      acc[name].push(field);
      return acc;
    }, {});

    return res.status(200).json({
      success: true,
      message: "Campaigns fetched successfully",
      groupedCampaigns: grouped,
      totalItems: campaignsResult.totalItems,
      totalPages: campaignsResult.totalPages,
      currentPage: campaignsResult.currentPage,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// ✅ Get all fields for a campaign by ID
export const getCampaignById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;
    const fields = await CampaignService.getCampaignById(Number(id));

    if (!fields || fields.length === 0) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    return res
      .status(200)
      .json({ campaignName: fields[0].campaignName, fields });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};



export const updateCampaign = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;
    const data = req.body;

 
    const updated = await CampaignService.updateCampaign(Number(id), data);
    if (!updated) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    return res.status(200).json({ message: "Campaign updated", updated });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// ✅ Delete a single field (by ID)
export const deleteCampaign = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;
    const success = await CampaignService.deleteCampaign(Number(id));

    if (!success) {
      return res.status(404).json({ message: "Field not found in campaign" });
    }

    return res.status(200).json({ message: "Field deleted successfully" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
