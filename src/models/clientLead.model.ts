import { DataTypes, Model, Optional } from "sequelize";
import db from "../../db";
import Order from "./order.model";
import Campaign from "./campaign.model";

// Interface for attributes
export interface ClientLeadAttributes {
  id: number;
  order_id: number;
  campaign_id: number;
  leadData: Record<string, any>; // dynamic fields from campaign
  created_by?: number; // optional
  status: "pending" | "accepted" | "rejected"; // new field
}

// Optional fields for creation
export interface ClientLeadCreationAttributes extends Optional<ClientLeadAttributes, "id" | "status"> {}

// Define the model
class ClientLeadModel
  extends Model<ClientLeadAttributes, ClientLeadCreationAttributes>
  implements ClientLeadAttributes {
  public id!: number;
  public order_id!: number;
  public campaign_id!: number;
  public leadData!: Record<string, any>;
  public created_by?: number;
  public status!: "pending" | "accepted" | "rejected";
}

const ClientLead = db.define<ClientLeadModel>(
  "ClientLead",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Order,
        key: "id",
      },
    },
    campaign_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Campaign,
        key: "id",
      },
    },
    leadData: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("pending", "accepted", "rejected"),
      allowNull: false,
      defaultValue: "pending",
    },
  },
  {
    tableName: "client_leads",
    timestamps: true,
  }
);

export default ClientLead;
