export const PERMISSIONS = {
  // User permissions
  USER_CREATE: "user:create",
  USER_GET: "user:get",
  USER_UPDATE: "user:update",
  USER_DELETE: "user:delete",
  USER_UPDATESTATUS: "user:updateStatus",

  // Campaign permissions
  CAMPAIGN_CREATE: "campaign:create",
  CAMPAIGN_GET: "campaign:get",
  CAMPAIGN_UPDATE: "campaign:update",
  CAMPAIGN_DELETE: "campaign:delete",

  // Order permissions
  ORDER_CREATE: "order:create",
  ORDER_GET: "order:get",
  ORDER_UPDATE: "order:update",
  ORDER_DELETE: "order:delete",
  ORDER_UPDATESTATUS:"order:updateStatus",
  // Lead permissions
  LEAD_CREATE: "lead:create",
  LEAD_GET_ALL: "lead:getAll",
  LEAD_GET_BY_CAMPAIGN: "lead:getByCampaign",
  LEAD_UPDATE: "lead:update",
  LEAD_DELETE: "lead:delete",

  // ✅ Client Lead permissions
  CLIENT_LEAD_CREATE: "clientLead:create",
  CLIENT_LEAD_GET_ALL: "clientLead:getAll",
  CLIENT_LEAD_GET_BY_ORDER: "clientLead:getByOrder",
  CLIENT_LEAD_GET_BY_ID: "clientLead:getById",
  CLIENT_LEAD_UPDATE: "clientLead:update",
  CLIENT_LEAD_DELETE: "clientLead:delete",
};
