import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import db from "../../db";  // Ensure your Sequelize instance is imported correctly

// Define the attributes for the Order model
export interface OrderAttributes {
  id: number;
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
  created_by: number;
  created_at: Date;
  updated_at: Date;
}

// Define attributes required when creating an order (optional fields)
export interface OrderCreationAttributes extends Optional<OrderAttributes, "id" | "created_at" | "updated_at"> {}

const initOrderModel = () => {
  // Define the Order model using Sequelize's Model.init() in a functional style
  return db.define<Model<OrderAttributes, OrderCreationAttributes>>(
    "Order",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      agent_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      campaign_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      priority_level: {
        type: DataTypes.ENUM("High", "Medium", "Low", "Gold Agent"),
        allowNull: false,
      },
      age_range: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lead_requested: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      fb_link: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      notes: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      area_to_use: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      order_datetime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "orders",
      timestamps: true,
    }
  );
};

const Order = initOrderModel(); // Initialize the model with the Sequelize instance

export default Order;
