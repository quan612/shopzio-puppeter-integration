const express = require("express");
const utils = require("../utils");
const router = express.Router();

const fileUploadController = require("../controllers/file-upload");

router.post("", fileUploadController, async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(422).json({
        message: `The file is not presented`,
      });
    }

    let bstr = await utils.arrayBufferToBinary(req.file);
    let jsonObj = utils.sheetToJson(bstr);

    return res.status(200).json(jsonObj);
  } catch (error) {
    console.log(error);
    return res.status(422).json({
      message: `Error at post route for file upload: ${error}`,
    });
  }
});

module.exports = router;
