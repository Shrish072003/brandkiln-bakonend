const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Directory to save uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Initialize multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit for files
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).fields([
  { name: 'knowlegeCentreIcon', maxCount: 1 },
  { name: 'lHS_key_Image', maxCount: 1 },
  { name: 'bullet1_Img', maxCount: 1 },
  { name: 'bullet2_Img', maxCount: 1 },
  { name: 'bullet3_Img', maxCount: 1 },
  { name: 'bullet4_Img', maxCount: 1 },
  { name: 'bullet5_Img', maxCount: 1 }
]);

// Check File Type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

module.exports = upload;
