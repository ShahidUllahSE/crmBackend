// models/associate.ts

import { User } from "./user.model";
import { Message } from "./chatmodels/message.model";
import { Conversation } from "./chatmodels/conversation.model";
import { ConversationParticipant } from "./chatmodels/conversationParticipant.model";

export const associateModels = () => {
  // Conversation ↔ Messages
  Conversation.hasMany(Message, { foreignKey: "conversationId" });
  Message.belongsTo(Conversation, { foreignKey: "conversationId" });

  // User ↔ Messages
  User.hasMany(Message, { foreignKey: "senderId" });
  Message.belongsTo(User, { foreignKey: "senderId" });

  // Conversation ↔ User (via ConversationParticipant)
  Conversation.belongsToMany(User, {
    through: ConversationParticipant,
    foreignKey: "conversationId",
    otherKey: "userId",
  });

  User.belongsToMany(Conversation, {
    through: ConversationParticipant,
    foreignKey: "userId",
    otherKey: "conversationId",
  });
};
