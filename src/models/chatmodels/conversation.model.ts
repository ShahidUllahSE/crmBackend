import { DataTypes, Model, Optional } from "sequelize";
import db from "../../../db";

// Attributes for the Conversation model
export interface ConversationAttributes {
  id: number;
  type: "private" | "group";
  name?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

// For creation, some fields are optional
export interface ConversationCreationAttributes
  extends Optional<ConversationAttributes, "id" | "name" | "createdAt" | "updatedAt"> {}

// Explicit Model instance type
export interface ConversationInstance
  extends Model<ConversationAttributes, ConversationCreationAttributes>,
    ConversationAttributes {}

export const Conversation = db.define<ConversationInstance>(
  "Conversation",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: DataTypes.ENUM("private", "group"),
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "conversations",
    timestamps: true,
  }
);

export default Conversation;
