import ClientLead, { ClientLeadCreationAttributes } from "../models/clientLead.model";

export const createClientLead = async (leadData: ClientLeadCreationAttributes) => {
  const lead = await ClientLead.create(leadData);
  return lead;
};

export const getClientLeadsByOrderId = async (orderId: number) => {
  const leads = await ClientLead.findAll({
    where: { order_id: orderId },
    include: ["campaign", "order"],
  });
  return leads;
};

export const getClientLeadById = async (id: number) => {
  const lead = await ClientLead.findByPk(id, {
    include: ["campaign", "order"],
  });
  return lead;
};
