const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

// Middleware to verify JWT
const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decode.user.id).select("-password");
      //   exclude password
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ msg: "Token is not valid" });
    }
  }
};

// Middleware to check if user is admin
const admin = async (req, res, next) => {
  try {
    if (req.user && req.user.role === "admin") {
      next();
    } else {
      return res.status(403).json({ msg: "User is not an admin" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server Error" });
  }
};

module.exports = { protect, admin };
