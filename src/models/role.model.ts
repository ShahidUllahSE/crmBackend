import { DataTypes, Model } from "sequelize";
import db from "../../db";

export interface RoleAttributes {
  id: number;
  role: 'admin' | 'vendor' | 'client';
}

interface RoleModel extends Model<RoleAttributes>, RoleAttributes {}

const Role = db.define<RoleModel>("Role", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  role: {
    type: DataTypes.ENUM('admin', 'vendor', 'client'),
    allowNull: false,
    unique: true,
  },
}, {
  tableName: 'roles',
  timestamps: true,
});

export default Role;
