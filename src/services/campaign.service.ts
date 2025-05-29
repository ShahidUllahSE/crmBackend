import Campaign from "../models/campaign.model";
import {
  CampaignAttributes,
  CampaignCreationAttributes,
} from "../models/campaign.model";

// export const createCampaign = async (
//   data: CampaignCreationAttributes[]
// ): Promise<CampaignAttributes[]> => {
//   try {
//     if (!data || data.length === 0) {
//       throw new Error("No campaign data provided.");
//     }
//     const campaignName = data[0].campaignName;
//     if (!campaignName) {
//       throw new Error("Campaign name is missing.");
//     }
//     // :x: Don't add required fields again, assuming they are sent from frontend
//     const created = await Campaign.bulkCreate(data);
//     return created.map((c) => c.get());
//   } catch (error: any) {
//     console.error("Error creating campaign:", error);
//     throw new Error(`Error creating campaign: ${error.message}`);
//   }
// };

// ✅ Get all campaigns (all fields)


export const createCampaign = async (
  data: CampaignCreationAttributes[]
): Promise<CampaignAttributes> => {
  try {
    if (!data || data.length === 0) {
      throw new Error("No campaign data provided.");
    }

    const campaignName = data[0].campaignName;
    if (!campaignName) {
      throw new Error("Campaign name is missing.");
    }

    // Compose fields array from input
    const fields = data.map((field) => ({
      col_name: field.fields[0].col_name,
      col_slug: field.fields[0].col_slug,
      col_type: field.fields[0].col_type,
      default_value: field.fields[0].default_value,
      options: field.fields[0].options,
      multiple: field.fields[0].multiple,
      dynamic_fields: field.fields[0].dynamic_fields,
    }));

    // Save the campaign
    const created = await Campaign.create({
      campaignName,
      fields,
    });

    return created.get();
  } catch (error: any) {
    console.error("Error creating campaign:", error);
    throw new Error(`Error creating campaign: ${error.message}`);
  }
};



export const getAllCampaigns = async (): Promise<CampaignAttributes[]> => {
  try {
    const campaigns = await Campaign.findAll();
    return campaigns.map((c) => c.get());
  } catch (error: any) {
    throw new Error(`Error retrieving campaigns: ${error.message}`);
  }
};  

// ✅ Get all fields by campaign ID
export const getCampaignById = async (
  id: number
): Promise<CampaignAttributes[]> => {
  try {
    const campaignEntry = await Campaign.findByPk(id);
    if (!campaignEntry) return [];

    const campaignName = campaignEntry.getDataValue("campaignName");

    const campaignFields = await Campaign.findAll({ where: { campaignName } });
    return campaignFields.map((c) => c.get());
  } catch (error: any) {
    throw new Error(`Error retrieving campaign: ${error.message}`);
  }
};

// ✅ Update a specific field by ID
// export const updateCampaign = async (
//   id: number,
//   data: CampaignCreationAttributes
// ): Promise<CampaignAttributes | null> => {
//   try {
//     const campaign = await Campaign.findByPk(id);
//     if (!campaign) {
//       throw new Error("Campaign field not found");
//     }

//     await campaign.update({
//       col_name: data.col_name,
//       col_slug: data.col_slug,
//       col_type: data.col_type,
//       default_value: data.default_value,
//       options: data.options,
//       multiple: data.multiple,
//       dynamic_fields: data.dynamic_fields,
//     });

//     return campaign.get();
//   } catch (error: any) {
//     throw new Error(`Error updating campaign: ${error.message}`);
//   }
// };

// export const updateCampaign = async (
//   id: number,
//   data: { campaignName: string; fields: any[] }
// ): Promise<any> => {
//   try {
//     // 1. Get existing campaign by ID
//     const existingCampaign = await Campaign.findOne({ where: { id } });

//     if (!existingCampaign) {
//       throw new Error("Campaign not found");
//     }

//     // 2. Delete all existing fields under old campaign name
//     await Campaign.destroy({
//       where: { campaignName: existingCampaign.campaignName },
//     });

//     // 3. Create new fields under the NEW campaign name
//     const newFields = await Promise.all(
//       data.fields.map(async (field) => {
//         return await Campaign.create({
//           campaignName: data.campaignName, // ✅ Use updated name here
//           col_name: field.col_name,
//           col_slug: field.col_slug,
//           col_type: field.col_type,
//           default_value: field.default_value,
//           options: field.options,
//           multiple: field.multiple,
//           dynamic_fields: field.dynamic_fields,
//         });
//       })
//     );

//     return {
//       campaignName: data.campaignName,
//       fields: newFields.map((field) => field.get()),
//     };
//   } catch (error: any) {
//     throw new Error(`Error updating campaign: ${error.message}`);
//   }
// };

// ✅ Delete a specific field by ID
// export const deleteCampaign = async (id: number): Promise<boolean> => {
//   try {
//     const campaign = await Campaign.findByPk(id);
//     if (!campaign) {
//       throw new Error("Campaign field not found");
//     }
//     await campaign.destroy();
//     return true;
//   } catch (error: any) {
//     throw new Error(`Error deleting campaign: ${error.message}`);
//   }
// };





export const updateCampaign = async (
  id: number,
  data: { campaignName: string; fields: any[] }
): Promise<any> => {
  try {
    // 1. Get existing campaign by ID
    const existingCampaign = await Campaign.findOne({ where: { id } });

    if (!existingCampaign) {
      throw new Error("Campaign not found");
    }

    // 2. Update the campaign with new name and fields
    existingCampaign.campaignName = data.campaignName;
    existingCampaign.fields = data.fields;

    // 3. Save updated campaign
    await existingCampaign.save();

    return existingCampaign.get();
  } catch (error: any) {
    throw new Error(`Error updating campaign: ${error.message}`);
  }
};

export const deleteCampaign = async (id: number): Promise<boolean> => {
  try {
    const campaign = await Campaign.findByPk(id);

    if (!campaign) {
      throw new Error("Campaign field not found");
    }
    const campaignName = campaign.get("campaignName"); // safer and avoids TS error
    await Campaign.destroy({
      where: { campaignName },
    });
    return true;
  } catch (error: any) {
    throw new Error(`Error deleting campaign: ${error.message}`);
  }
};
