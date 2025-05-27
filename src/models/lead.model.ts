// models/lead/lead.model.ts
import { DataTypes, Model, Optional } from "sequelize";
import db from "../../db";

export interface LeadAttributes {
  id: number;
  campaignName: string;
  leadData: any;
}

export interface LeadCreationAttributes extends Optional<LeadAttributes, "id"> {}

class Lead extends Model<LeadAttributes, LeadCreationAttributes> implements LeadAttributes {
  public id!: number;
  public campaignName!: string;
  public leadData!: any;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Lead.init(
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
    sequelize: db,
    tableName: "leads",
    timestamps: true,
    indexes: [
      {
        fields: ["campaignName"],
      },
    ],
  }
);

export default Lead;
