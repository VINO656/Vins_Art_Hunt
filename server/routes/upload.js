const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const adminAuth = require('../middleware/auth');

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: function (req, file, cb) {
    // Generate a unique filename using Date
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// POST endpoint to handle single image upload
router.post('/', adminAuth, (req, res) => {
  upload.single('image')(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      console.error('Multer Error:', err);
      return res.status(400).json({ error: `Upload error: ${err.message}` });
    } else if (err) {
      // An unknown error occurred when uploading.
      console.error('Unknown Upload Error:', err);
      return res.status(500).json({ error: `Server error: ${err.message}` });
    }

    // Everything went fine.
    try {
      if (!req.file) {
        console.error('Upload Error: No file provided in request');
        return res.status(400).json({ error: 'No image file provided' });
      }
      
      const imageUrl = `/uploads/${req.file.filename}`;
      res.status(200).json({ imageUrl });
    } catch (err) {
      console.error('Upload Error Exception:', err);
      res.status(500).json({ error: err.message || 'Server error during upload processing' });
    }
  });
});

module.exports = router;
