import { DataTypes, Model, Optional } from "sequelize";
import db from "../../db";

export interface CampaignAttributes {
  id: number;
  campaignName: string; // ✅ Added
  col_name: string;
  col_slug: string;
  col_type: "text" | "number" | "date" | "dropdown" | "radio" | "checkbox";
  default_value?: string;
  options?: string[];
  multiple?: boolean;
  dynamic_fields?: any;
}

export interface CampaignCreationAttributes extends Optional<CampaignAttributes, "id"> {}

export const Campaign = db.define<Model<CampaignAttributes, CampaignCreationAttributes>>("Campaign", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  campaignName: { // ✅ Added
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  col_name: {
    type: DataTypes.STRING(250),
    allowNull: false,
  },
  col_slug: {
    type: DataTypes.STRING(250),
    allowNull: false,
    unique: true,
  },
  col_type: {
    type: DataTypes.ENUM("text", "number", "date", "dropdown", "radio", "checkbox"),
    allowNull: false,
  },
  default_value: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  options: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  multiple: {
    type: DataTypes.TINYINT,
    allowNull: true,
    defaultValue: false,
  },
  dynamic_fields: {
    type: DataTypes.JSON,
    allowNull: true,
  }
}, {
  tableName: "campaigns",
  timestamps: true,
});

export default Campaign;
