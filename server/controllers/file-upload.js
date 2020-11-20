const upload = require("../services/multer");

const fileUploadController = (req, res, next) => {
  upload(req, res, (error) => {
    if (error) {
      res.status(422).json({
        message: `Error at single upload: ${error}`,
      });
    }
    next();
  });
};

module.exports = fileUploadController;
