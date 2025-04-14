import express from "express";
import "dotenv/config";
import cors from "cors";
import job from "./lib/cron.js";

//db
import { connectDB } from "./lib/db.js";

//routes
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";

//middleware
import protectRoute from "./middlewares/protectRoute.js";

const app = express();
const PORT = process.env.PORT || 8000;
job.start();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/books", protectRoute, bookRoutes);

app.get("/alive", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
