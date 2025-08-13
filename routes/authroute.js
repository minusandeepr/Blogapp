const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authcontroller");
const authroute = require
router.get("/test", (req, res) => {
  res.json({ message: "Auth route is working" });
});
// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
