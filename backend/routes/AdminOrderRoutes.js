const express = require("express");
const OrderModels = require("../models/OrderModel");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// @route GET api/admin/orders
// @desc Get all ordern(admin only);
// @access private /admin

router.get("/", protect, admin, async (req, res) => {
  try {
    const orders = await OrderModels.find({}).populate("user", "name email");
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});
// @route PUT api/admin/orders/:id
// @desc Update order status
//@access private /admin

router.put("/:id", protect, admin, async (req, res) => {
  try {
    const order = await OrderModels.findById(req.params.id).populate(
      "user",
      "name"
    );
    if (order) {
      order.status = req.body.status || order.status;
      order.isDelivered =
        req.body.status === "Delivered" ? true : order.isDelivered;
      order.deliveredAt =
        req.body.status === "Delivered" ? Date.now() : order.deliveredAt;

      const updateOrder = await order.save();
      res.json(updateOrder);
    } else {
      return res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});
// @route api/admin/orders/:id
// @desc Delete an order
// @access Private/admin

router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const order = await OrderModels.findByIdAndDelete(req.params.id);
    if (order) {
      res.json({ message: "Order deleted successfully" });
    } else {
      return res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
