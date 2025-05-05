// services/activity.service.ts
import ActivityLog from "../models/activityLog.model";

export const logActivity = async (userId: number, action: string, details?: string) => {
  await ActivityLog.create({ userId, action, details });
};
