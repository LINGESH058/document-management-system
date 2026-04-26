const express = require('express');
const router = express.Router();
const multer = require('multer');
const File = require('../models/File');
const fs = require('fs');

// Ensure uploads folder exists
if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

// Multer storage (FIXED PATH)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/'); // IMPORTANT FIX
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });


// ROUTES

// Upload File (FULL FIX)
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    console.log(req.file); // DEBUG

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const newFile = new File({
      filename: req.file.filename,
      path: req.file.path
    });

    await newFile.save();

    res.status(200).json(newFile);

  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({
      message: 'Upload failed',
      error: error.message
    });
  }
});


// Get all files
router.get('/', async (req, res) => {
  try {
    const files = await File.find();
    res.json(files);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching files' });
  }
});


// Delete file
router.delete('/:id', async (req, res) => {
  try {
    const file = await File.findById(req.params.id);

    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }

    await file.deleteOne();

    res.json({ message: 'Deleted successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Delete failed' });
  }
});

module.exports = router;