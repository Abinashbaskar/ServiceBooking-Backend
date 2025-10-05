import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import sequelize from "./Config/db.js";
import userRoutes from "./Routes/AuthRoutes.js";
import { notFound, errorHandler } from "./MiddleWares/errorMiddleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

// Enable CORS for your React frontend
app.use(
  cors({
    origin: "http://localhost:5173", // your React app origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // if you use cookies or sessions
  })
);

// Test DB connection
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully!");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
    process.exit(1); // exit if DB connection fails
  }
};
connectDB();

app.use("/api/users", userRoutes);

app.use(notFound);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
