import express from "express";
import dotenv from "dotenv";
import sequelize from "./Config/db.js";
import userRoutes from "./Routes/AuthRoutes.js";
import { notFound, errorHandler } from "./MiddleWares/errorMiddleware.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// DB connection
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully!");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
  }
};
connectDB();

// Routes
app.use("/api/users", userRoutes);   // << ✅ mount routes here

// Error handlers
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
