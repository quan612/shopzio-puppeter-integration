const express = require("express");
const puppeteer = require("../puppeteer/Shopzio");
const router = express.Router();
const fs = require("fs");
// const fileUploadController = require("../controllers/file-upload");

router.post("", async (req, res, next) => {
  try {
    let rawData = fs.readFileSync("productsList.json");
    if (!rawData) return res.status(412).send({ error: "No file found" });
    let productsList = JSON.parse(rawData);
    let a = await puppeteer.puppeteerRun(productsList);
    fs.unlinkSync("productsList.json");
    return res.status(200).json(a);
  } catch (error) {
    console.log(error);
    return res.status(422).json({
      message: `Error at post route for puppeteer: ${error}`,
    });
  }
});

module.exports = router;
