const express = require("express");
const router = express.Router();
const { createBlog, getAllBlogs, getBlogById, getBlogsByUser } = require("../controllers/blogController");
const { protect } = require("../middlewares/auth");

// Only logged-in users can create a blog
router.post("/", protect, createBlog);

// Anyone can view blogs
router.get("/", getAllBlogs);
router.get("/:id", getBlogById);
router.get("/user/:userId", getBlogsByUser);

module.exports = router;

