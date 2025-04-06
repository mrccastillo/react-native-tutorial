import express from "express";
import { register } from "../controller/authController.js";

const router = express.Router();

router.post("/register", (req, res) => {
  console.log("Login request received");
});

router.post("/login", (req, res) => {
  console.log("Login request received");
});

export default router;
