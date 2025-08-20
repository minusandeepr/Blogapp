const express = require("express");
const router = express.Router();
const {
  createBlog,
  getAllBlogs,
  getBlogById,
  getBlogsByUser,
  updateBlog, 
  deleteBlog
} = require("../controllers/blogcontroller");
const { protect, adminOnly } = require("../middlewares/auth");

// Create blog (only logged-in users)
router.post("/", protect, createBlog);

// Get all blogs
router.get("/", getAllBlogs);

// Get blogs by user
router.get("/user/:userId", getBlogsByUser);


// Get blog by ID
router.get("/:id", getBlogById);


router.put("/:id", protect, updateBlog);


// Delete blog (admin can delete any, user can delete own)
router.delete("/:id", protect, deleteBlog);

module.exports = router;
