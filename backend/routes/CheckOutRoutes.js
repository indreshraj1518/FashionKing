const express = require("express");
const checkOutModel = require("../models/CheckOutModel");
const cartModel = require("../models/CartModel");
// const productModel = require("../models/ProductModel");
const orderModel = require("../models/OrderModel");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// @route api/checkout
// create a new  checkout session
// access  private

router.post("/", protect, async (req, res) => {
  const { checkoutItems, shippingAddress, paymentMethod, totalPrice } =
    req.body;

  if (!checkoutItems || checkoutItems.length === 0) {
    return res.status(400).json({ message: "No checkout items provided" });
  }
  try {
    // Create a new checkout session
    const newCheckout = await checkOutModel.create({
      user: req.user.id,
      shippingAddress,
      paymentMethod,
      totalPrice,
      paymentStatus: "pending",
      isPaid: false,
    });
    console.log(`checkout created  for user ${req.user._id}`);
    res.status(201).json(newCheckout);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route api/checkout/:id/pay
// @description Update to mark as paid after successful payment
// @access private

router.put("/:id/pay", protect, async (req, res) => {
  const { paymentStatus, paymentDetails } = req.body;
  try {
    const checkout = await checkOutModel.findById(req.params.id);

    if (!checkout) {
      return res.status(404).json({ message: "Checkout not found" });
    }
    if (paymentStatus === "paid") {
      checkout.paymentStatus = paymentStatus;
      checkout.paymentDetails = paymentDetails;
      checkout.isPaid = true;
      checkout.paidAt = Date.now();
      await checkout.save();
      res.json(checkout);
    } else {
      return res.status(400).json({ message: "Payment status is not valid" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route api/checkout/:id/finalize
// @des Finalise checkout and convert to an order after payment confermation
// @access private

router.post("/:id/finalize", protect, async (req, res) => {
  try {
    const checkout = await checkOutModel.findById(req.params.id);
    if (!checkout) {
      return res.status(404).json({ message: "Checkout not found" });
    }
    if (checkout.isPaid && !checkout.isFinalized) {
      // create final order based on the checkout details
      const finalOrder = await orderModel.create({
        user: checkout.user,
        orderItems: checkout.checkOutItems,
        shippingAddress: checkout.shippingAddress,
        paymentMethod: checkout.paymentMethod,
        totalPrice: checkout.totalPrice,
        isPaid: true,
        paidAt: checkout.paidAt,
        isDelivered: false,
        paymentStatus: "paid",
        paymentDetails: checkout.paymentDetails,
      });
      //   mark the checkout as finilized
      checkout.isFinalized = true;
      checkout.finalizedAt = Date.now();
      await checkout.save();
      //   delete the cart associated with the user
      await cartModel.findOneAndDelete({ user: checkout.user });
      res.json(finalOrder);
    } else if (checkout.isFinalized) {
      return res
        .status(400)
        .json({ message: "Checkout is  already finalized" });
    } else {
      res.status(400).json({ message: "checkout is not paid" });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
