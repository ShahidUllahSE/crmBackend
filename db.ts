import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const db = new Sequelize("crm", "root", "", {
  host: process.env.DB_HOST,
  dialect: "mysql",
  // logging: console.log, // Enable logging to see SQL queries
});

const connectDB = async () => {
  try {
    await db.authenticate();
    console.log("✅ Database connected successfully");

    // Force sync (WARNING: This will DROP and recreate tables)
    await db.sync({ alter: true }); 
    console.log("✅ All models synchronized (Tables Created)");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
  }
};

connectDB();

export default db;
