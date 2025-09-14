import express from "express";
import dotenv from "dotenv";
import sequelize from "./Config/db.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Test DB connection
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully!");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
  }
};

connectDB();

// Simple test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
