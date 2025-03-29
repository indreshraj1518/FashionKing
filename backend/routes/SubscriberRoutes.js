const express = require("express");
const ScbscriberModule = require("../models/SubscriberModel");

const router = express.Router();

// @route Post api/subscribe
// @des Hanle newsletter subscription
// @access public

router.post("/subscribe", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Please provide an email" });
    }

    const existingSubscriber = await ScbscriberModule.findOne({ email });

    if (existingSubscriber) {
      return res.status(400).json({ message: "Email already subscribed" });
    }

    const newSubscriber = new ScbscriberModule({ email });

    await newSubscriber.save();

    res.status(201).json({ message: "Successfully subscribed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
