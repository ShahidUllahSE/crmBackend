import Lead, {
  LeadAttributes,
  LeadCreationAttributes,
} from "../models/lead.model";

// Create Lead
export const createLead = async (
  data: LeadCreationAttributes
): Promise<LeadAttributes> => {
  try {
    const lead = await Lead.create(data);
    return lead.get();
  } catch (error: any) {
    throw new Error(`Error creating lead: ${error.message}`);
  }
};

// Get All Leads
export const getAllLeads = async (): Promise<LeadAttributes[]> => {
  try {
    const leads = await Lead.findAll();
    return leads.map((lead) => lead.get());
  } catch (error: any) {
    throw new Error(`Error fetching leads: ${error.message}`);
  }
};

// Get Leads by Campaign
export const getLeadsByCampaign = async (
  campaignName: string
): Promise<LeadAttributes[]> => {
  try {
    const leads = await Lead.findAll({ where: { campaignName } });
    return leads.map((lead) => lead.get());
  } catch (error: any) {
    throw new Error(
      `Error fetching leads for campaign ${campaignName}: ${error.message}`
    );
  }
};

// Update Lead
export const updateLead = async (
  id: number,
  updatedData: Partial<LeadCreationAttributes>
): Promise<LeadAttributes> => {
  try {
    const lead = await Lead.findByPk(id);
    if (!lead) {
      throw new Error("Lead not found");
    }

    await lead.update(updatedData);
    return lead.get();
  } catch (error: any) {
    throw new Error(`Error updating lead: ${error.message}`);
  }
};

// Delete Lead
export const deleteLead = async (id: number): Promise<void> => {
  try {
    const lead = await Lead.findByPk(id);
    if (!lead) {
      throw new Error("Lead not found");
    }

    await lead.destroy();
  } catch (error: any) {
    throw new Error(`Error deleting lead: ${error.message}`);
  }
};
