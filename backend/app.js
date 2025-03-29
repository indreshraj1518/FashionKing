const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/UserRouts");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/CartRouts");
const CheckOutRoute = require("./routes/CheckOutRoutes");
const orderRoutes = require("./routes/OrderRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const subscribeRoutes = require("./routes/SubscriberRoutes");
const adminRoutes = require("./routes/AdminRoutes");
const productAdminRoutes = require("./routes/ProductAdminRoutes");
const adminOrderRoutes = require("./routes/AdminOrderRoutes");

dotenv.config();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 8080;
// connect the db\

connectDB();

// Routes for API
app.use("/api/users", userRoutes);

app.use("/api/products", productRoutes);

app.use("/api/cart", cartRoutes);

app.use("/api/checkout", CheckOutRoute);

app.use("/api/orders", orderRoutes);

app.use("/api/upload", uploadRoutes);

app.use("/api", subscribeRoutes);

app.use("/api/admin/users", adminRoutes);

app.use("/api/admin/products", productAdminRoutes);

app.use("/api/admin/orders", adminOrderRoutes);

app.get("/", (req, res) => {
  res.send("Hello from the server!");
});

app.listen(port, (req, res) => {
  console.log(`Server is running on port ${port}`);
});
