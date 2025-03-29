const express = require("express");
const orderModel = require("../models/OrderModel");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// @route GET api/orders/my-orders
//@desc Get logged-in users orders
// @access private

router.get("/my-orders", protect, async (req, res) => {
  try {
    const orders = await orderModel
      .find({ user: req.user._id })
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

//@route get api/orders/:id
// @description vGet order details by ID
// @access private

router.get("/:id", protect, async (req, res) => {
  try {
    const order = await orderModel
      .findById(req.params.id)
      .populate("user", "name email");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.user.id.toString() !== req.user.id.toString()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
