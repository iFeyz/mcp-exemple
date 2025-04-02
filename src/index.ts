import express from "express";
import cors from "cors";
import morgan from "morgan";
import { AppDataSource } from "./data-source";
import userRoutes from "./routes/userRoutes";

// Initialize database connection
AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
    process.exit(1);
  });

// Create express app
const app = express();
const PORT = 3005;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/users", userRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("User API is running");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 