import express from "express";
import "dotenv/config";

//db
import { connectDB } from "./lib/db.js";

//routes
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";

//middleware
import protectRoute from "./middlewares/protectRoute.js";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/books", protectRoute, bookRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
