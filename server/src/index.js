import express from "express";
import "dotenv/config";

//db
import { connectDB } from "./lib/db.js";

//routes
import authRoutes from "./routes/authRoutes.js";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
