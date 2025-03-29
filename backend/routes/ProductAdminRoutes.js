const express = require("express");
const productModels = require("../models/ProductModel");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// @route GET api/admin/products
// @desc get all products (admin only)
// @access private/admin

router.get("/", protect, admin, async (req, res) => {
  try {
    const products = await productModels.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
