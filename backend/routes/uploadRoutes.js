const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const stremifier = require("streamifier");
require("dotenv").config();

// cloudinary configration

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});
const storage = multer.memoryStorage();

const upload = multer({ storage });

const router = express.Router();

router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image Uploaded" });
    }
    const streamUpload = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream((error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        });
        // Use steramifier to convert file buffer to a stream
        stremifier.createReadStream(fileBuffer).pipe(stream);
      });
    };
    // call the stream Uploadload function
    const result = await streamUpload(req.file.buffer);
    // Respond with the upload image url
    res.json({ imageUrl: result.secure_url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
