const Blog = require("../models/blog");

// Create Blog
exports.createBlog = async (req, res) => {
  try {
    const { title, content, userId } = req.body;
    const blog = new Blog({ title, content, userId });
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get all blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("userId", "username email");
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get blog by ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("userId", "username email");
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get blogs by user
exports.getBlogsByUser = async (req, res) => {
  try {
    const blogs = await Blog.find({ userId: req.params.userId });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

