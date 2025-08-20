const jwt = require("jsonwebtoken");

// Protect routes - only logged-in users can access
exports.protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if header exists and starts with Bearer
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized, token missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Contains { id, email, role } from token payload
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Admin only routes
exports.adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied - Admins only" });
  }
  next();
};
