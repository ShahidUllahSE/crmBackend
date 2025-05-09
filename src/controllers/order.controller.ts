import { CustomRequest } from "../types/custom";
import { Response } from "express";
import {
  createOrder,
  getOrderById,
  updateOrderById,
  deleteOrderById,
  getAllOrders
} from "../services/order.service";
import { CreateOrderDTO } from "../services/order.service";

// Create Order
export const createOrderController = async (req: CustomRequest, res: Response): Promise<any> => {
  const orderData: CreateOrderDTO = req.body;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "User ID not found in request",
    });
  }

  // Validate assign_to_client format
  if (
    orderData.assign_to_client &&
    (!orderData.assign_to_client.id || !orderData.assign_to_client.name)
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid 'assign_to_client' format. Both id and name are required.",
    });
  }

  // Validate assign_to_vendor format
  if (
    orderData.assign_to_vendor &&
    (!orderData.assign_to_vendor.id || !orderData.assign_to_vendor.name)
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid 'assign_to_vendor' format. Both id and name are required.",
    });
  }

  try {
    const createdOrder = await createOrder(orderData, userId);
    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: createdOrder,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || "An error occurred while creating the order",
    });
  }
};

// Get Order by ID
export const getOrderByIdController = async (req: CustomRequest, res: Response): Promise<any> => {
  const { id } = req.params;

  try {
    const order = await getOrderById(Number(id));
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || "An error occurred while fetching the order",
    });
  }
};

// Update Order by ID
export const updateOrderByIdController = async (req: CustomRequest, res: Response): Promise<any> => {
  const { id } = req.params;
  const updatedData: Partial<CreateOrderDTO> = req.body;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "User ID not found in request",
    });
  }

  // Validate assign_to_client format
  if (
    updatedData.assign_to_client &&
    (!updatedData.assign_to_client.id || !updatedData.assign_to_client.name)
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid 'assign_to_client' format. Both id and name are required.",
    });
  }

  // Validate assign_to_vendor format
  if (
    updatedData.assign_to_vendor &&
    (!updatedData.assign_to_vendor.id || !updatedData.assign_to_vendor.name)
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid 'assign_to_vendor' format. Both id and name are required.",
    });
  }

  try {
    const updatedOrder = await updateOrderById(Number(id), updatedData, userId);
    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order updated successfully",
      data: updatedOrder,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || "An error occurred while updating the order",
    });
  }
};

// Delete Order by ID
export const deleteOrderByIdController = async (req: CustomRequest, res: Response): Promise<any> => {
  const { id } = req.params;

  try {
    const isDeleted = await deleteOrderById(Number(id));
    if (!isDeleted) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || "An error occurred while deleting the order",
    });
  }
};

// Get All Orders
export const getAllOrdersController = async (req: CustomRequest, res: Response): Promise<any> => {
  try {
    const orders = await getAllOrders();

    return res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || "An error occurred while fetching orders",
    });
  }
};
