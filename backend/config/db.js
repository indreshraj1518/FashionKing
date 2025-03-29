const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("mongodb connected successfully");
  } catch (error) {
    console.error(`Error connecting to mongodb: ${error.message}`);
    process.exit(1);
  }
};
module.exports = connectDB;
