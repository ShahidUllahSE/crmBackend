import { DataTypes, Model, Optional } from "sequelize";
import db from "../../db";
import { UserAttributes } from "../interfaces/user.interface"; // Import the interface

// Define attributes required when creating a new user (optional fields)
interface UserCreationAttributes extends Optional<UserAttributes, "id" | "created_at" | "updated_at"> {}

// Extend Sequelize Model with correct types
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public firstname!: string;
  public lastname!: string;
  public email!: string;
  public password!: string;
  public phone?: string;
  public address?: string;
  public website?: string;
  public coverage?: string;
  public linkedin?: string;
  public useruimage?: string;
  public vendor!: string;
  public userrole!: "admin" | "vendor" | "client";
  public smtpemail?: string;
  public smtppassword?: string;
  public smtpincomingserver?: string;
  public smtpoutgoingserver?: string;
  public smtpport?: string;
  public branchname?: string;
  public branchslug?: string;
  public branchcountry?: string;
  public branchaddress?: string;
  public brancheader?: string;
  public branchnavbar?: string;
  public branchnavtext?: string;
  public branchnavhover?: string;
  public branchlogo?: string;
  public branchlogoheight?: string;
  public branchlogowidth?: string;
  public block!: boolean;
  public referred_to?: string;
  public last_login?: Date;
  public token!: string;
  public created_at!: Date;
  public updated_at!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstname: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    lastname: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: true,
      unique: true,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    website: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    coverage: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    linkedin: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    useruimage: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },

    // Vendor-specific fields
    vendor: {
      type: DataTypes.STRING(300),
      allowNull: true,
    },

    // Role-based user type
    userrole: {
      type: DataTypes.ENUM("admin", "vendor", "client"),
      allowNull: true,
    },

    // SMTP Configuration Fields
    smtpemail: {
      type: DataTypes.STRING(300),
      allowNull: true,
    },
    smtppassword: {
      type: DataTypes.STRING(300),
      allowNull: true,
    },
    smtpincomingserver: {
      type: DataTypes.STRING(300),
      allowNull: true,
    },
    smtpoutgoingserver: {
      type: DataTypes.STRING(300),
      allowNull: true,
    },
    smtpport: {
      type: DataTypes.STRING(300),
      allowNull: true,
    },

    // Branch Details
    branchname: {
      type: DataTypes.STRING(300),
      allowNull: true,
    },
    branchslug: {
      type: DataTypes.STRING(300),
      allowNull: true,
    },
    branchcountry: {
      type: DataTypes.STRING(300),
      allowNull: true,
    },
    branchaddress: {
      type: DataTypes.STRING(300),
      allowNull: true,
    },
    brancheader: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    branchnavbar: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    branchnavtext: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    branchnavhover: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    branchlogo: {
      type: DataTypes.STRING(300),
      allowNull: true,
    },
    branchlogoheight: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    branchlogowidth: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },

    // User Status & Tracking
    block: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    referred_to: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    last_login: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    // Timestamp fields
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, // Can't use onUpdate in init, handled manually
    },
  },
  {
    sequelize: db,
    modelName: "User",
    tableName: "users",
    timestamps: true, // Manually handling created_at & updated_at
  }
);

// Hook to update 'updated_at' manually
User.beforeUpdate((user) => {
  user.updated_at = new Date();
});

export default User;
