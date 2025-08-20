const Blog = require("../models/blog");

// Create Blog
exports.createBlog = async (req, res) => {
  try {
    const { title, content} = req.body;
    const blog = new Blog({ title, content, userId: req.user.id });
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

// Update blog
exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Only owner can update
    if (blog.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to update this blog" });
    }

    blog.title = req.body.title || blog.title;
    blog.content = req.body.content || blog.content;
    const updatedBlog = await blog.save();

    res.json(updatedBlog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// Delete blog
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Allow admin OR blog owner
    if (req.user.role !== "admin" && blog.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this blog" });
    }

    await blog.deleteOne();
    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
