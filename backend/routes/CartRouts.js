const express = require("express");
const CartModel = require("../models/CartModel");
const productModel = require("../models/ProductModel");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Helper function to get cart by userId or guestId
const getCart = async (userId, guestId) => {
  let cart;
  if (userId) {
    cart = await CartModel.findOne({ userId });
  } else if (guestId) {
    cart = await CartModel.findOne({ guestId });
  } else {
    return null;
  }
  if (!cart) {
    cart = new CartModel({ userId, guestId });
    await cart.save();
  }
  return cart;
};

// @route POST api/cart
// @desc Add a product to the cart for a guest or logged-in user
// @access Public
router.post("/", protect, async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;

  try {
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Ensure guestId is always available if userId is missing
    const finalGuestId = guestId || `guest_${Date.now()}`;

    // Get existing cart or create a new one
    let cart = await getCart(userId, finalGuestId);

    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) =>
          p.productId.toString() === productId &&
          p.size === size &&
          p.color === color
      );

      if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({
          productId,
          name: product.name,
          image: product.images?.[0]?.url || "",
          price: product.price,
          size,
          color,
          quantity,
        });
      }

      // Update total price
      cart.totalPrice = cart.products.reduce(
        (acc, curr) => acc + curr.price * curr.quantity,
        0
      );

      await cart.save();
      return res.json(cart);
    } else {
      // Create a new cart with either userId or guestId
      const newCart = await CartModel.create({
        user: userId || undefined, // ✅ Ensure it's optional
        guestId: finalGuestId, // ✅ Ensure guestId is always set
        products: [
          {
            productId,
            name: product.name,
            image: product.images?.[0]?.url || "",
            price: product.price,
            size,
            color,
            quantity,
          },
        ],
        totalPrice: product.price * quantity,
      });

      return res.json(newCart);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
// @route PUT api/cart
//  @desc update product quantity in the cart for a guest or logged-in user
// access public
router.put("/", async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;
  try {
    let cart = await getCart(userId, guestId);
    if (!cart) return res.status(404).json({ message: "cart not found" });

    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color
    );
    if (productIndex > -1) {
      if (quantity > 0) {
        cart.products[productIndex].quantity = quantity;
      } else {
        cart.products.splice(productIndex, 1);
        // Remove product if quantity is 0
      }
      cart.totalPrice = cart.products.reduce(
        (acc, curr) => acc + curr.price * curr.quantity,
        0
      );
      await cart.save();
      return res.json(cart);
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route DELETE api/cart
//  @dest Remove a product from the cart
// @access public

router.delete("/", async (req, res) => {
  const { productId, size, color, guestId, userId } = req.body;
  try {
    let cart = await getCart(userId, guestId);
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color
    );
    if (productIndex > -1) {
      cart.products.splice(productIndex, 1);
      cart.totalPrice = cart.products.reduce(
        (acc, curr) => acc + curr.price * curr.quantity,
        0
      );
      await cart.save();
      return res.json(cart);
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route GET api/cart
// @desc Get logged in user's guest  user's cart
// @access public
router.get("/", async (req, res) => {
  const { userId, guestId } = req.body;
  try {
    let cart = await getCart(userId, guestId);
    if (cart) {
      res.json(cart);
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route post api/cart/merge
// @desc Merge guest cart into user cart on login
// @access private

router.post("/merge", protect, async (req, res) => {
  const { guestId } = req.body;
  try {
    // Find the guest and user cart
    let guestCart = await CartModel.findOne({ guestId });
    const userCart = await CartModel.findOne({ user: req.user._id });
    if (guestCart) {
      if (guestCart.products.length === 0) {
        return res.status(400).json({ message: "Guest cart is empty" });
      }
      // Merge products from guest cart into user cart
      if (userCart) {
        guestCart.products.forEach((guestItem) => {
          const productIndex = userCart.products.findIndex(
            (p) =>
              p.productId.toString() === guestItem.productId &&
              p.size === guestItem.size &&
              p.color === guestItem.color
          );
          if (productIndex > -1) {
            userCart.products[productIndex].quantity += guestItem.quantity;
          } else {
            userCart.products.push(guestItem);
          }
        });
        userCart.totalPrice = userCart.products.reduce(
          (acc, curr) => acc + curr.price * curr.quantity,
          0
        );
        await userCart.save();

        // remove the guest cart after merging
        try {
          await CartModel.findOneAndDelete({ guestId });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Error deleting guest cart" });
        }
        return res.json(userCart);
      } else {
        // if the user has no existing  cart ,assign the guest cart to the user
        guestCart.user = req.user._id;
        guestCart.guestId = undefined;
        await guestCart.save();
        return res.json(guestCart);
      }
    } else {
      if (userCart) {
        // guest cart has already been merged with user cart
        return res.json(userCart);
      }
      return res.status(404).json({ message: "Guest cart not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
