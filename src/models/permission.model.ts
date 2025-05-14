import { DataTypes, Model, Optional } from "sequelize";
import db from "../../db";

// Define the attributes of the Permission model
interface PermissionAttributes {
  id: number;
  name: string;
}

// Define creation attributes (id is optional during creation)
interface PermissionCreationAttributes extends Optional<PermissionAttributes, "id"> {}

export const Permission = db.define<Model<PermissionAttributes, PermissionCreationAttributes>>("Permission", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  }
}, {
  tableName: "permissions",
  timestamps: false,
});

export default Permission;
