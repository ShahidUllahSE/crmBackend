import { DataTypes, Model, Optional } from "sequelize";
import db from "../../db";
import { UserAttributes } from "../interfaces/user.interface"; // Import the interface

// Define attributes required when creating a new user (optional fields)
interface UserCreationAttributes extends Optional<UserAttributes, "id" | "created_at" | "updated_at"> {}

// Define the User model interface to include the 'created_at' and 'updated_at' fields
interface UserModel extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {
  created_at: Date;
  updated_at: Date;
}

// Define the User model using sequelize.define (functional approach)
export const User = db.define<UserModel>("User", {
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
}, {
  tableName: "users",
  timestamps: true, // Manually handling created_at & updated_at
});

// Hook to update 'updated_at' manually
User.beforeUpdate((user) => {
  user.updated_at = new Date();
});

export default User;




// User Model with proper role typing
// import { DataTypes, Model, Optional, BelongsToGetAssociationMixin } from "sequelize";
// import db from "../../db";
// import Role, { RoleAttributes } from "./role.model";  // Import Role and its attributes
// import { VendorAttributes } from "./vendor.model";
// import { ClientAttributes } from "./client.model";

// export interface UserAttributes {
//   id: number;
//   firstname: string;
//   lastname: string;
//   email: string;
//   password: string;
//   phone: string;
//   address: string;
//   website: string;
//   linkedin: string;
//   useruimage: string;
//   block: boolean;
//   referred_to: string;
//   last_login: Date;
//   token: string;
//   roleId: number;
//   created_at: Date;
//   updated_at: Date;
//   vendorData?: VendorAttributes;
//   clientData?: ClientAttributes;
// }

// interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'created_at' | 'updated_at'> {}

// interface UserModel extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {
//   role?: RoleAttributes;  // Use RoleAttributes as the type for role
//   getRole: BelongsToGetAssociationMixin<typeof Role>;  // Access role using the correct type
// }

// const User = db.define<UserModel>("User", {
//   id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//   firstname: {
//     type: DataTypes.STRING(250),
//     allowNull: true,
//   },
//   lastname: {
//     type: DataTypes.STRING(250),
//     allowNull: true,
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   phone: {
//     type: DataTypes.STRING(100),
//     allowNull: true,
//   },
//   address: {
//     type: DataTypes.STRING(100),
//     allowNull: true,
//   },
//   website: {
//     type: DataTypes.STRING(100),
//     allowNull: true,
//   },
//   linkedin: {
//     type: DataTypes.STRING(100),
//     allowNull: true,
//   },
//   useruimage: {
//     type: DataTypes.STRING(250),
//     allowNull: true,
//   },
//   block: {
//     type: DataTypes.BOOLEAN,
//     defaultValue: true,
//   },
//   referred_to: {
//     type: DataTypes.STRING(250),
//     allowNull: true,
//   },
//   last_login: {
//     type: DataTypes.DATE,
//     allowNull: true,
//   },
//   token: {
//     type: DataTypes.TEXT,
//     allowNull: true,
//   },
//   roleId: {
//     type: DataTypes.INTEGER,
//     references: {
//       model: Role, // Reference the Role model
//       key: "id",
//     },
//     allowNull: false,
//     onDelete: 'CASCADE',
//   },
//   created_at: {
//     type: DataTypes.DATE,
//     defaultValue: DataTypes.NOW,
//   },
//   updated_at: {
//     type: DataTypes.DATE,
//     defaultValue: DataTypes.NOW,
//   },
// }, {
//   tableName: "users",
//   timestamps: true,
// });

// User.belongsTo(Role, { foreignKey: 'roleId', onDelete: 'CASCADE' });

// export default User;
