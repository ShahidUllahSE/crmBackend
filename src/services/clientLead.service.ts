import ClientLead, { ClientLeadCreationAttributes } from "../models/clientLead.model";

// Create a new client lead
export const createClientLead = async (leadData: ClientLeadCreationAttributes) => {
  const lead = await ClientLead.create(leadData);
  return lead;
};

// Get all client leads for a specific order
export const getClientLeadsByOrderId = async (orderId: number) => {
  const leads = await ClientLead.findAll({
    where: { order_id: orderId },
    include: ["campaign", "order"],
  });
  return leads;
};

// Get a single client lead by ID
export const getClientLeadById = async (id: number) => {
  const lead = await ClientLead.findByPk(id, {
    include: ["campaign", "order"],
  });
  return lead;
};

// Get all client leads
export const getAllClientLeads = async () => {
  const leads = await ClientLead.findAll({
    include: ["campaign", "order"],
  });
  return leads;
};

// Update a client lead by ID
export const updateClientLeadById = async (
  id: number,
  updateData: Partial<ClientLeadCreationAttributes>
) => {
  const lead = await ClientLead.findByPk(id);
  if (!lead) {
    throw new Error("Client lead not found");
  }

  await lead.update(updateData);
  return lead;
};

// Delete a client lead by ID
export const deleteClientLeadById = async (id: number) => {
  const lead = await ClientLead.findByPk(id);
  if (!lead) {
    throw new Error("Client lead not found");
  }

  await lead.destroy();
  return { message: "Client lead deleted successfully" };
};
