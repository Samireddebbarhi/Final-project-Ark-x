const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Destination directory for storing uploads
const uploadDirectory = path.join(__dirname, "..", "uploads");

// Create the uploads directory if it doesn't exist
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDirectory); // Use the uploadDirectory as the destination folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Set unique filename
  },
});

// Create multer instance for single file upload
const upload = multer({ storage: storage });

module.exports = upload;
