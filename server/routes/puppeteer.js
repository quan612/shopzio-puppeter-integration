const express = require("express");
const puppeteer = require("../puppeteer/Shopzio");
const router = express.Router();
const fs = require("fs");
// const fileUploadController = require("../controllers/file-upload");

router.post("", async (req, res, next) => {
  try {
    const options = req.body;

    let rawData = fs.readFileSync("productsList.json");
    if (!rawData) return res.status(412).send({ error: "No file found" });

    let productsList = JSON.parse(rawData);

    let result = await puppeteer.puppeteerRun(productsList, options);
    fs.unlinkSync("productsList.json");

    return res.status(200).json(result);
  } catch (error) {
    return res.status(401).send(`Error at post route for puppeteer: ${error}`);
  }
});

module.exports = router;
