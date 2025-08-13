const express = require("express");
const router = express.Router();
const { getAllBlogs } = require("../controllers/blogController");
const { protect, adminOnly } = require("../middlewares/auth");

// Only admin can access these routes
router.get("/blogs", protect, adminOnly, getAllBlogs);

module.exports = router;
