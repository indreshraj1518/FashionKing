const mongoose = require("mongoose");

const subscriberSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  subscribeAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Subscriber", subscriberSchema);
