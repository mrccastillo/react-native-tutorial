import Book from "../models/Book.js";
import cloudinary from "../lib/cloudinary.js";

export const getBooks = async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  const skip = (page - 1) * limit;

  try {
    const books = await Book.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user", "username profileImage"); // Populate user field with name and email

    const totalBooks = await Book.countDocuments();

    res.status(200).json({
      books,
      currentPage: page,
      totalBooks: totalBooks,
      totalBooksPages: Math.ceil(totalBooks / limit),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const createBook = async (req, res) => {
  const { title, image, rating, caption } = req.body;
  const userId = req.userId; // Assuming you have userId in req object

  try {
    if (!title || !image || !rating || !caption) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const uploadResponse = await cloudinary.uploader.upload(image);
    // console.log(uploadResponse);
    const imageUrl = uploadResponse.secure_url;
    // console.log(imageUrl);

    // console.log("newBook");
    const newBook = new Book({
      title,
      image: imageUrl,
      rating,
      caption,
      user: userId,
    });

    console.log(newBook);

    const savedBook = await newBook.save();
    res.status(201).json({ savedBook, message: "Book added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteBook = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId; // Assuming you have userId in req object

  try {
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.user.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized action" });
    }

    // Delete the image from Cloudinary
    if (book.image && book.image.contains("cloudinary")) {
      try {
        const publicId = book.image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
      } catch (error) {
        console.error("Error deleting image from Cloudinary:", error);
        return res
          .status(500)
          .json({ message: "Error deleting image from Cloudinary" });
      }
    }

    await Book.findByIdAndDelete(id);
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
