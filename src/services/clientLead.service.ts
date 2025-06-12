import ClientLead, { ClientLeadCreationAttributes } from "../models/clientLead.model";
import Campaign from "../models/campaign.model";
import Order from "../models/order.model";
import { getPagination, getPagingData } from "../utils/paginate";

// Create a new client lead
export const createClientLead = async (leadData: ClientLeadCreationAttributes) => {
  const lead = await ClientLead.create(leadData);
  return lead;
};

// Get all client leads for a specific order, including full campaign & order data
export const getClientLeadsByOrderId = async (orderId: number) => {
  const leads = await ClientLead.findAll({
    where: { order_id: orderId },
    include: [
      {
        model: Campaign,
        as: "campaign",
      },
      {
        model: Order,
        as: "order",
      },
    ],
  });
  return leads;
};

// Get a single client lead by ID
export const getClientLeadById = async (id: number) => {
  const lead = await ClientLead.findByPk(id, {
    include: [
      { model: Campaign, as: "campaign" },
      { model: Order, as: "order" },
    ],
  });
  return lead;
};

// Get all client leads with pagination
export const getAllClientLeads = async (page: number = 1, limit: number = 10) => {
  const { offset } = getPagination({ page, limit });

  const data = await ClientLead.findAndCountAll({
    offset,
    limit,
    include: [
      { model: Campaign, as: "campaign" },
      { model: Order, as: "order" },
    ],
    order: [["createdAt", "DESC"]],
  });

  return getPagingData(data, page, limit);
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

// Accept or Reject a client lead (status update)
export const updateClientLeadStatus = async (
  id: number,
  status: "accepted" | "rejected"
) => {
  const lead = await ClientLead.findByPk(id);
  if (!lead) {
    throw new Error("Client lead not found");
  }

  await lead.update({ status });
  return { message: `Client lead ${status} successfully`, lead };
};
