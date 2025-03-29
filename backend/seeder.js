const mongoose = require("mongoose");
const ProductModel = require("./models/ProductModel"); // Make sure file name is correct
const UserModel = require("./models/UserModel"); // Ensure this is correct
const dotenv = require("dotenv");
const productData = require("./data/products");

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Function to seed data
const seedData = async () => {
  try {
    // Clear existing data
    await ProductModel.deleteMany();
    await UserModel.deleteMany();

    // Create new admin user
    const createdUser = await UserModel.create({
      name: "Admin User",
      email: "admin@example.com",
      password: "password@193",
      role: "admin",
    });

    // Assign user ID to products
    const userID = createdUser._id;
    const sampleProducts = productData.map((product) => {
      return { ...product, user: userID };
    });

    // Insert sample products into the database
    await ProductModel.insertMany(sampleProducts);
    console.log("Data seeding completed!");
    process.exit();
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedData();
