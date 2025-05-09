import Campaign from "../models/campaign.model";
import { CampaignAttributes, CampaignCreationAttributes } from "../models/campaign.model";

// Default columns for every campaign
const requiredFields: Omit<CampaignCreationAttributes, "campaignName" | "id">[] = [
  { col_name: "Agent Name", col_slug: "agent_name", col_type: "text", default_value: "Default" },
  { col_name: "First Name", col_slug: "first_name", col_type: "text", default_value: "Default" },
  { col_name: "Last Name", col_slug: "last_name", col_type: "text", default_value: "Default" },
  { col_name: "Phone Number", col_slug: "phone_number", col_type: "text", default_value: "Default" },
  { col_name: "Date", col_slug: "date", col_type: "date", default_value: "2025-05-08" },
  { col_name: "State", col_slug: "state", col_type: "text", default_value: "TX" },
];

export const createCampaign = async (data: CampaignCreationAttributes[]): Promise<CampaignAttributes[]> => {
  try {
    console.log("Data passed to service:", data); // Log to verify the incoming data

    if (!data || data.length === 0) {
      throw new Error("No campaign data provided.");
    }

    // Ensure campaignName exists in at least one field
    const campaignName = data[0].campaignName;
    if (!campaignName) {
      throw new Error("Campaign name is missing.");
    }

    // 1. Prepare required fields
    const requiredFieldEntries = requiredFields.map(field => ({
      campaignName,
      ...field,
    }));

    // 2. Prepare dynamic fields from request
    const dynamicFieldEntries = data.map(field => ({
      campaignName,
      col_name: field.col_name,
      col_slug: field.col_slug,
      col_type: field.col_type,
      default_value: field.default_value !== undefined ? String(field.default_value) : undefined,
      options: field.options,
      multiple: field.multiple,
      dynamic_fields: field.dynamic_fields || null,
    }));

    // Combine and create all fields
    const allEntries = [...requiredFieldEntries, ...dynamicFieldEntries];
    if (allEntries.length === 0) {
      throw new Error("At least one field must be provided.");
    }

    const created = await Campaign.bulkCreate(allEntries);
    return created.map(c => c.get());
  } catch (error: any) {
    console.error("Error creating campaign:", error);
    throw new Error(`Error creating campaign: ${error.message}`);
  }
};


// ✅ Get all campaigns (all fields)
export const getAllCampaigns = async (): Promise<CampaignAttributes[]> => {
  try {
    const campaigns = await Campaign.findAll();
    return campaigns.map(c => c.get());
  } catch (error: any) {
    throw new Error(`Error retrieving campaigns: ${error.message}`);
  }
};

// ✅ Get all fields by campaign ID
export const getCampaignById = async (id: number): Promise<CampaignAttributes[]> => {
  try {
    const campaignEntry = await Campaign.findByPk(id);
    if (!campaignEntry) return [];

    const campaignName = campaignEntry.getDataValue("campaignName");

    const campaignFields = await Campaign.findAll({ where: { campaignName } });
    return campaignFields.map(c => c.get());
  } catch (error: any) {
    throw new Error(`Error retrieving campaign: ${error.message}`);
  }
};

// ✅ Update a specific field by ID
export const updateCampaign = async (
  id: number,
  data: CampaignCreationAttributes
): Promise<CampaignAttributes | null> => {
  try {
    const campaign = await Campaign.findByPk(id);
    if (!campaign) {
      throw new Error("Campaign field not found");
    }

    await campaign.update({
      col_name: data.col_name,
      col_slug: data.col_slug,
      col_type: data.col_type,
      default_value: data.default_value,
      options: data.options,
      multiple: data.multiple,
      dynamic_fields: data.dynamic_fields,
    });

    return campaign.get();
  } catch (error: any) {
    throw new Error(`Error updating campaign: ${error.message}`);
  }
};

// ✅ Delete a specific field by ID
export const deleteCampaign = async (id: number): Promise<boolean> => {
  try {
    const campaign = await Campaign.findByPk(id);
    if (!campaign) {
      throw new Error("Campaign field not found");
    }
    await campaign.destroy();
    return true;
  } catch (error: any) {
    throw new Error(`Error deleting campaign: ${error.message}`);
  }
};
