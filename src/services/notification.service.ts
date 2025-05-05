// services/notification.service.ts
import Notification from "../models/notification.model";

export const sendNotification = async (userId: number, message: string) => {
  const notification = await Notification.create({ userId, message, isRead: false });

  // Optionally: emit via Socket.IO
  if (global.io) {
    global.io.to(`user_${userId}`).emit("notification", { message });
  }

  return notification;
};
