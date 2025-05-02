import { DataTypes, Model } from "sequelize";
import db from "../../db";
import User from "./user.model";

export interface VendorAttributes {
  id: number;
  userId: number;
  companyName: string;
  productDetails: string;
}

interface VendorModel extends Model<VendorAttributes>, VendorAttributes {}

const Vendor = db.define<VendorModel>("Vendor", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    allowNull: false,
    onDelete: 'CASCADE',
  },
  companyName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  productDetails: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  tableName: "vendors",
  timestamps: true,
});

Vendor.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });

export default Vendor;
