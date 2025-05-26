// services/lead.service.ts
import Lead, {
    LeadAttributes,
    LeadCreationAttributes,
  } from "../models/lead.model";
  
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
  
  export const getAllLeads = async (): Promise<LeadAttributes[]> => {
    try {
      const leads = await Lead.findAll();
      return leads.map((lead) => lead.get());
    } catch (error: any) {
      throw new Error(`Error fetching leads: ${error.message}`);
    }
  };
  
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
  