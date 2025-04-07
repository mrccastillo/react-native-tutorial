import express from "express";
import {
  createBook,
  deleteBook,
  getBooks,
} from "../controller/bookController.js";
const router = express.Router();

router.get("/", getBooks);
router.post("/", createBook);
router.delete("/:id", deleteBook);

export default router;
