const express = require("express");
const userModel = require("../models/UserModel");
const { protect, admin } = require("../middleware/authMiddleware");
const UserModel = require("../models/UserModel");

const router = express.Router();

// @route GET api/admin/users
// @desc get all users (Admin only)
// @access private/Admin

router.get("/", protect, admin, async (req, res) => {
  try {
    const users = await userModel.find({});
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @route POST api/admin/users
// @desc Add a user (admin only)
// @access Private/admin

router.post("/", protect, admin, async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    let user = await userModel.findOne({ email });

    if (user) return res.status(400).json({ message: "User already exists" });

    user = new userModel({ name, email, password, role: role || "customer" });

    // const salt = await user.generateSalt();
    // user.password = await user.hashPassword(password, salt);

    await user.save();

    res.json({ message: "User created successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @route PUT api/admin/users/:id
// @desc Upadte user info (admin only)-Name, email and role
// @access Private /Admin

router.put("/:id", protect, admin, async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.role = req.body.role || user.role;
    }
    const updateUSer = await user.save();

    res.json({ message: "User updated successfully", updateUSer });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @routes Delete api/admin/users/:id
// @desc Delete a user
// @access Private /Admin

router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
