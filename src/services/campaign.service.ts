import Campaign from "../models/campaign.model";
import { CampaignAttributes, CampaignCreationAttributes } from "../models/campaign.model";

// Create a new campaign
export const createCampaign = async (data: CampaignCreationAttributes[]): Promise<CampaignAttributes> => {
  try {
    console.log("Creating campaign with data:", data);

    const dynamicFields = data.map(field => ({
      col_name: field.col_name,
      col_slug: field.col_slug,
      col_type: field.col_type,
      default_value: field.default_value,
      options: field.options,
      multiple: field.multiple,
    }));

    const campaign = await Campaign.create({
      campaignName: data[0].campaignName, // ✅ Include campaignName
      col_name: data[0].col_name,
      col_slug: data[0].col_slug,
      col_type: data[0].col_type,
      default_value: data[0].default_value,
      options: data[0].options,
      multiple: data[0].multiple,
      dynamic_fields: dynamicFields,
    });

    console.log("Campaign created:", campaign);
    return campaign.get();
  } catch (error: any) {
    console.error("Error creating campaign:", error);
    throw new Error(`Error creating campaign: ${error.message}`);
  }
};

// Get all campaigns
export const getAllCampaigns = async (): Promise<CampaignAttributes[]> => {
  try {
    const campaigns = await Campaign.findAll();
    return campaigns.map(c => c.get());
  } catch (error: any) {
    throw new Error(`Error retrieving campaigns: ${error.message}`);
  }
};

// Get a single campaign by ID
export const getCampaignById = async (id: number): Promise<CampaignAttributes | null> => {
  try {
    const campaign = await Campaign.findByPk(id);
    return campaign ? campaign.get() : null;
  } catch (error: any) {
    throw new Error(`Error retrieving campaign: ${error.message}`);
  }
};

// Update a campaign by ID
export const updateCampaign = async (id: number, data: CampaignCreationAttributes): Promise<CampaignAttributes | null> => {
  try {
    const campaign = await Campaign.findByPk(id);
    if (!campaign) {
      throw new Error("Campaign not found");
    }

    await campaign.update({
      campaignName: data.campaignName, // ✅ Allow updating campaignName
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

// Delete a campaign by ID
export const deleteCampaign = async (id: number): Promise<boolean> => {
  try {
    const campaign = await Campaign.findByPk(id);
    if (!campaign) {
      throw new Error("Campaign not found");
    }
    await campaign.destroy();
    return true;
  } catch (error: any) {
    throw new Error(`Error deleting campaign: ${error.message}`);
  }
};
