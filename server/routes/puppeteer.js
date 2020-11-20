const express = require("express");
const puppeteer = require("../puppeteer/Shopzio");
const router = express.Router();

// const fileUploadController = require("../controllers/file-upload");

router.post("", async (req, res, next) => {
  try {
    let a = await puppeteer.puppeteerRun();
    return res.status(200).json(a);
  } catch (error) {
    console.log(error);
    return res.status(422).json({
      message: `Error at post route for puppeteer: ${error}`,
    });
  }
});

module.exports = router;
