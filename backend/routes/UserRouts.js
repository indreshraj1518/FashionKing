const express = require("express");
const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // regestration logic

    // check if user already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });
    // create a new user
    user = new User({ name, email, password });
    await user.save();

    // create jwt  payload
    const payload = {
      user: {
        id: user._id,
        role: user.role,
      },
    };
    // sign jwt token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "48h" }, // 48 hour
      (err, token) => {
        if (err) throw err;
        // send the user and token in response
        res.status(201).json({
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});
// login rotes
// post  /api/users/login
// public
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });
    // check the password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });
    // create jwt  payload
    const payload = {
      user: {
        id: user._id,
        role: user.role,
      },
    };
    // sign jwt token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "48h" }, // 48 hour
      (err, token) => {
        if (err) throw err;
        // send the user and token in response
        res.json({
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});
// route GET /api/users/profile
// Get  logged-in user profile(protected route)
// privet user

router.get("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
