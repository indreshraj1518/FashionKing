const express = require("express");
const ProductModel = require("../models/ProductModel");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// @route GET api/products
// @desc Create a new product
// @access private/admin

router.post("/", protect, admin, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      sku,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      rating,
      numReviews,
      tags,
      user,
      metaTittle,
      metaDescription,
      metaKeywords,
      dimensions,
      weight,
    } = req.body;

    const product = new ProductModel({
      name,
      description,
      price,
      discountPrice,
      countInStock,
      sku,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      rating,
      numReviews,
      tags,
      user: req.user._id, //Refrence to the admin user
      metaTittle,
      metaDescription,
      metaKeywords,
      dimensions,
      weight,
    });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// put  /api/products/:id
// update an  existing product id
// private /admin
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      sku,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      rating,
      numReviews,
      tags,
      user,
      metaTittle,
      metaDescription,
      metaKeywords,
      dimensions,
      weight,
    } = req.body;
    const product = await ProductModel.findById(req.params.id);
    if (product) {
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.discountPrice = discountPrice || product.discountPrice;
      product.countInStock = countInStock || product.countInStock;
      product.sku = sku || product.sku;
      product.category = category || product.category;
      product.brand = brand || product.brand;
      product.sizes = sizes || product.sizes;
      product.colors = colors || product.colors;
      product.collections = collections || product.collections;
      product.material = material || product.material;
      product.gender = gender || product.gender;
      product.images = images || product.images;
      product.isFeatured =
        isFeatured !== undefined ? isFeatured : product.isFeatured;
      product.isPublished =
        isPublished !== undefined ? isPublished : product.isPublished;
      product.rating = rating || product.rating;
      product.numReviews = numReviews || product.numReviews;
      product.tags = tags || product.tags;
      // product.user = req.user._id; //Refrence to the admin user
      // product.metaTittle = metaTittle || product.metaTittle;
      // product.metaDescription = metaDescription || product.metaDescription;
      // product.metaKeywords = metaKeywords || product.metaKeywords;
      product.dimensions = dimensions || product.dimensions;
      product.weight = weight || product.weight;
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// delete routes api/products/:id
// delete a product by id
// private /admin

router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const product = await ProductModel.findByIdAndDelete(req.params.id);
    if (product) {
      res.json({ message: "Product deleted" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get api/products
// get all products with optimal  query  filters
//  public
router.get("/", async (req, res) => {
  try {
    const {
      collection,
      sizes,
      colors,
      minPrice,
      maxPrice,
      sortBy,
      gender,
      search,
      category,
      material,
      brand,
      limit,
    } = req.query;

    // filter logic
    let query = {}; // Initialize query object

    if (collection && collection.toLowerCase() !== "all") {
      query.collection = collection;
    }
    if (category && category.toLowerCase() !== "all") {
      query.category = category;
    }
    if (material) {
      query.material = { $in: material.split(",") };
    }
    if (brand) {
      query.brand = { $in: brand.split(",") };
    }
    if (sizes) {
      query.sizes = { $in: sizes.split(",") };
    }
    if (colors) {
      query.colors = { $in: colors.split(",") };
    }

    if (gender) {
      query.gender = gender;
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // sort logic
    let sort = {};
    if (sortBy) {
      switch (sortBy) {
        case "priceAsc":
          sort = { price: 1 };
          break;
        case "priceDesc":
          sort = { price: -1 };
          break;
        case "popularity":
          sort = { rating: 1 };
          break;
        default:
          break;
      }
    }
    // fetch products and apply sorting and limit
    let products = await ProductModel.find(query)
      .sort(sort)
      .limit(Number(limit) || 0);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//get api/products/best-seller
//  retrive the products with highest rating
// public

router.get("/best-seller", async (req, res) => {
  try {
    const bestSeller = await ProductModel.findOne()
      .sort({ rating: -1 })
      .limit(10);
    if (bestSeller) {
      res.json(bestSeller);
    } else {
      res.status(404).json({ message: "No best seller products found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// get api/products/new-arrivals
// retrive latest 8 products- Creation Date
// public

router.get("/new-arrivals", async (req, res) => {
  try {
    const newArrivals = await ProductModel.find()
      .sort({ createdAt: -1 })
      .limit(8);
    if (newArrivals) {
      res.json(newArrivals);
    } else {
      res.status(404).json({ message: "No new arrivals products found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get /api/products/:id
// get a single product by Id
//  access:  public

router.get("/:id", async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// get api/products/similar/:id
// Retrive similar products based on the current product's gender and category
// public

router.get("/similar/:id", async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (product) {
      const { gender, category } = product;
      const similarProducts = await ProductModel.find({
        gender,
        category,
        _id: { $ne: product._id },
      })
        .limit(6)
        .populate("user", "name");
      res.json(similarProducts);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
