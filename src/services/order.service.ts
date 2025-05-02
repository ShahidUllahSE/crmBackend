import { OrderAttributes } from "../models/order.model"; 
import Order from "../models/order.model";
import Campaign from "../models/campaign.model"; 

export interface CreateOrderDTO {
  agent_id: number;
  campaign_id: number;
  state: string;
  priority_level: "High" | "Medium" | "Low" | "Gold Agent";
  age_range: string;
  lead_requested: boolean;
  fb_link?: string;
  notes?: string;
  area_to_use?: string;
  order_datetime: Date;
}

// Function to create an order
export const createOrder = async (orderData: CreateOrderDTO, createdBy: number): Promise<OrderAttributes> => {
  try {
    // Check if the Campaign exists
    const campaign = await Campaign.findByPk(orderData.campaign_id);
    if (!campaign) {
      throw new Error("Campaign not found");
    }

    // Create the order
    const order = await Order.create({
      agent_id: orderData.agent_id,
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
    });

    return order.toJSON() as OrderAttributes;  // Return the created order
  } catch (error: any) {
    throw new Error(error.message || "Failed to create order");
  }
};

// Function to get an order by ID
export const getOrderById = async (id: number): Promise<OrderAttributes | null> => {
  try {
    const order = await Order.findByPk(id);
    return order ? order.toJSON() as OrderAttributes : null;
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch order by ID");
  }
};

// Function to update an order by ID
export const updateOrderById = async (id: number, updatedData: Partial<CreateOrderDTO>, updatedBy: number): Promise<OrderAttributes | null> => {
  try {
    // Find the order by ID
    const order = await Order.findByPk(id);
    if (!order) {
      throw new Error("Order not found");
    }

    // Update the order
    await order.update({
      ...updatedData,
      updated_at: new Date(), // Ensure the `updated_at` field is updated
      created_by: updatedBy,  // Optionally, track who updated the record
    });

    return order.toJSON() as OrderAttributes;  // Return the updated order
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
    return true;  // Indicate that the order was successfully deleted
  } catch (error: any) {
    throw new Error(error.message || "Failed to delete order");
  }
};

// Function to get all orders
export const getAllOrders = async (): Promise<OrderAttributes[]> => {
  try {
    const orders = await Order.findAll();
    return orders.map((order) => order.toJSON() as OrderAttributes);
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch orders");
  }
};
