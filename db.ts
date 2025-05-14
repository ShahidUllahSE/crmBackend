// db.ts
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const db = new Sequelize("crm", "root", "", {
  host: process.env.DB_HOST,
  dialect: "mysql",
});

export const connectDB = async () => {
  try {
    await db.authenticate();
    console.log("✅ Database connected successfully");

    await db.sync({ force: true }); // This will create all tables
    console.log("✅ All models synchronized");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
    throw error;
  }
};

export default db;
