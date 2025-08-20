const User = require("../models/user");
//const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register
exports.registerUser = async (req, res) => {
  try {
    console.log("Register request body:", req.body);
    const { username, email, password, role } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    console.log("User exists check:", !!user);
    if (user) {
      console.log("Registration failed: User already exists");
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
   // const hashedPassword = await bcrypt.hash(password, 10);

    // create and Save user
    user = new User({ username, email, password, role: role|| "user"});
    await user.save();
    console.log("User registered:", user);

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: err.message });
  }
};

// Login
exports.loginUser = async (req, res) => {
  try {
    console.log("Login request body:", req.body);
    const { email, password } = req.body;
    console.log("Login attempt:", email, password);

    // Find user  
    const user = await User.findOne({ email });
    console.log("User found:", !!user, user ? user.email : null);
    if (!user) {
      console.log("Login failed: User not found");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare password
    const isMatch = await user.matchPassword(password);
    console.log("Password match:", isMatch);
    if (!isMatch) {
      console.log("Login failed: Password mismatch");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({ message: "Login successful", token });
  } catch (err) {
     console.error("Login error:", err);
    res.status(500).json({ error: err.message });
  }
};



