const multer = require("multer");
// const storage = multer.memoryStorage();

const storage = multer.memoryStorage({
  destination: function (req, file, cb) {
    cb(null, "./data");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage }).single("file");

module.exports = upload;
