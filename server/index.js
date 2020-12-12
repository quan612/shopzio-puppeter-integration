const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors());
app.use(bodyParser.json());

//routes
const fileUploadRoutes = require("./routes/file-upload");
const puppeteerRoutes = require("./routes/puppeteer");

app.use("/api/upload", fileUploadRoutes);
app.use("/api/puppeteer", puppeteerRoutes);

const distPath = path.join(__dirname, "..", "build");
app.use(express.static(distPath));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(distPath, "index.html"));
});

app.listen(PORT, () => {
  console.log("server is running");
});
