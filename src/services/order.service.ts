import { OrderAttributes } from "../models/order.model";
import Order from "../models/order.model";
import Campaign from "../models/campaign.model";
import { getPagination, getPagingData } from "../utils/paginate";

// DTO for creating an order
export interface CreateOrderDTO {
  agent: string;
  campaign_id: number;
  state: string;
  priority_level: "High" | "Medium" | "Low" | "Gold Agent";
  age_range: string;
  lead_requested: number;
  fb_link?: string;
  notes?: string;
  area_to_use?: string;
  order_datetime: Date;
  assign_to_client?: {
    id: number;
    name: string;
  };
  assign_to_vendor?: {
    id: number;
    name: string;
  };
}

// Function to create an order
export const createOrder = async ( 
  orderData: CreateOrderDTO,
  createdBy: number
): Promise<any> => {
  try {
    const campaign = await Campaign.findByPk(orderData.campaign_id);
    if (!campaign) {
      throw new Error("Campaign not found");
    }

    const order = await Order.create({
      agent: orderData.agent,
      campaign_id: orderData.campaign_id,
      state: orderData.state,
      priority_level: orderData.priority_level,
      age_range: orderData.age_range,
      lead_requested: orderData.lead_requested,
      fb_link: orderData.fb_link,
      notes: orderData.notes,
      area_to_use: orderData.area_to_use,
      order_datetime: orderData.order_datetime,
      created_by: createdBy,
      assign_to_client: orderData.assign_to_client,
      assign_to_vendor: orderData.assign_to_vendor,
    });

    // Fetch the newly created order with campaign details
    const orderWithCampaign = await Order.findByPk(order.id, {
      include: [
        {
          model: Campaign,
          as: 'campaign',
        },
      ],
    });

    return orderWithCampaign?.toJSON();
  } catch (error: any) {
    throw new Error(error.message || "Failed to create order");
  }
};




export const getOrderById = async (
  id: number
): Promise<OrderAttributes & { campaign?: any } | null> => {
  try {
    const order = await Order.findByPk(id, {
      include: [
        {
          model: Campaign,
          as: "campaign", // This should match the alias used in your model association
        },
      ],
    });

    if (!order) return null;

    const orderJson = order.toJSON() as OrderAttributes & { campaign?: any };

    return orderJson;
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch order by ID");
  }
};

// Function to update an order by ID
export const updateOrderById = async (
  id: number,
  updatedData: Partial<CreateOrderDTO>,
  updatedBy: number
): Promise<OrderAttributes | null> => {
  try {
    const order = await Order.findByPk(id);
    if (!order) {
      throw new Error("Order not found");
    }

    await order.update({
      ...updatedData,
      updated_at: new Date(),
      created_by: updatedBy,
    });

    return order.toJSON() as OrderAttributes;
  } catch (error: any) {
    throw new Error(error.message || "Failed to update order");
  }
};

// Function to delete an order by ID
export const deleteOrderById = async (id: number): Promise<boolean> => {
  try {
    const order = await Order.findByPk(id);
    if (!order) {
      throw new Error("Order not found");
    }

    await order.destroy();
    return true;
  } catch (error: any) {
    throw new Error(error.message || "Failed to delete order");
  }
};
export const getAllOrders = async (
  page: number = 1,
  limit: number = 10
): Promise<ReturnType<typeof getPagingData>> => {
  try {
    const { offset, limit: pageLimit } = getPagination({ page, limit });

    const result = await Order.findAndCountAll({
      offset,
      limit: pageLimit,
      include: [
        {
          model: Campaign,
          as: "campaign",
        },
      ],
      order: [["created_at", "DESC"]], // optional: sort by date
    });

    return getPagingData(result, page, pageLimit);
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch paginated orders");
  }
};
// Unified function to set block status
export const setOrderBlockStatus = async (
  id: number,
  blockStatus: boolean
): Promise<OrderAttributes | null> => {
  try {
    const order = await Order.findByPk(id);
    if (!order) {
      throw new Error("Order not found");
    }
    await order.update({ is_blocked: blockStatus });
    return order.toJSON() as OrderAttributes;
  } catch (error: any) {
    throw new Error(error.message || "Failed to update block status");
  }
};
