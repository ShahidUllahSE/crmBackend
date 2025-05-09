import { DataTypes, Model, Optional } from "sequelize";
import db from "../../../db";

// Full shape of the model
export interface ConversationParticipantAttributes {
  id: number;
  conversationId: number;
  userId: number;
  joinedAt?: Date;
}

// Fields optional during creation (id, joinedAt)
export type ConversationParticipantCreationAttributes = Optional<
  ConversationParticipantAttributes,
  "id" | "joinedAt"
>;

// Define model using Sequelize's generic Model interface
export const ConversationParticipant = db.define<
  Model<ConversationParticipantAttributes, ConversationParticipantCreationAttributes>
>("ConversationParticipant", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  conversationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  joinedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: "conversation_participants",
  timestamps: false,
});

export default ConversationParticipant;
