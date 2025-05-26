// models/lead/lead.model.ts
import { DataTypes, Model, Optional } from "sequelize";
import db from "../../db";

// Define the attributes for a Lead
export interface LeadAttributes {
  id: number;
  campaignName: string;
  leadData: any; // this stores dynamic campaign fields
}

// Define attributes used during creation (id is optional)
export interface LeadCreationAttributes extends Optional<LeadAttributes, "id"> {}

// Extend the Model
class LeadModel extends Model<LeadAttributes, LeadCreationAttributes>
  implements LeadAttributes {
  public id!: number;
  public campaignName!: string;
  public leadData!: any;
}

// Define the model
export const Lead = db.define<LeadModel>(
  "Lead",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    campaignName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    leadData: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    tableName: "leads",
    timestamps: true,
    indexes: [
      {
        fields: ["campaignName"],
      },
    ],
  }
);

// Export the model and interfaces
export default Lead;
