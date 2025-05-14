import { DataTypes, Model } from "sequelize";
import db from "../../db";

class RolePermission extends Model {
  public roleId!: number;
  public permissionId!: number;
}

RolePermission.init(
  {
    roleId: {
      type: DataTypes.INTEGER,
      references: {
        model: "roles", // Foreign key referencing the roles table
        key: "id",
      },
      allowNull: false, // Ensure it's not null
    },
    permissionId: {
      type: DataTypes.INTEGER,
      references: {
        model: "permissions", // Foreign key referencing the permissions table
        key: "id",
      },
      allowNull: false, // Ensure it's not null
    },
  },
  {
    sequelize: db,
    tableName: "role_permissions",
    modelName: "RolePermission",
    timestamps: false, // No timestamps needed for join table
    indexes: [
      {
        unique: true, // Ensure there are no duplicate role-permission pairs
        fields: ["roleId", "permissionId"],
      },
    ],
  }
);

export default RolePermission;
