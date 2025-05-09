import { DataTypes, Model, Optional } from "sequelize";
import db from "../../../db";

export interface MessageAttributes {
  id: number;
  conversationId: number;
  senderId: number;
  content: string;
  isRead: boolean;
  createdAt?: Date;
}

export interface MessageCreationAttributes extends Optional<MessageAttributes, "id" | "isRead" | "createdAt"> {}

export const Message = db.define<Model<MessageAttributes, MessageCreationAttributes>>("Message", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  conversationId: { type: DataTypes.INTEGER, allowNull: false },
  senderId: { type: DataTypes.INTEGER, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
  isRead: { type: DataTypes.BOOLEAN, defaultValue: false },
}, {
  tableName: "messages",
  timestamps: true,
});

export default Message;
