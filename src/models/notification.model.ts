// models/notification.model.ts
import { DataTypes, Model } from "sequelize";
import db from "../../db";

export interface NotificationAttributes {
  id?: number;
  userId: number;
  message: string;
  isRead: boolean;
  created_at?: Date;
}

export const Notification = db.define<Model<NotificationAttributes>>("Notification", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  message: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  isRead: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: "notifications",
  timestamps: false,
});

export default Notification;
