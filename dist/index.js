"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const data_source_1 = require("./data-source");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
// Initialize database connection
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log("Data Source has been initialized!");
})
    .catch((err) => {
    console.error("Error during Data Source initialization:", err);
    process.exit(1);
});
// Create express app
const app = (0, express_1.default)();
const PORT = 3005;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
// Routes
app.use("/api/users", userRoutes_1.default);
// Default route
app.get("/", (req, res) => {
    res.send("User API is running");
});
// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
