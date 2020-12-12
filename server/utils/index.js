const XLSX = require("xlsx");
const fs = require("fs");

const sheetToJson = async (binaryString) => {
  let workbook = XLSX.read(binaryString, { type: "binary" });
  let first_sheet_name = workbook.SheetNames[0];
  let worksheet = workbook.Sheets[first_sheet_name];

  let jsonObj = XLSX.utils.sheet_to_json(worksheet, {
    raw: true,
  });
  let data = JSON.stringify(jsonObj);
  fs.writeFile("productsList.json", data, (err) => {
    if (err) {
      throw err;
    }
  });

  return jsonObj;
};

const arrayBufferToBinary = (file) => {
  let data = new Uint8Array(file.buffer);
  let arr = new Array();
  for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
  let bstr = arr.join("");

  return bstr;
};

exports.sheetToJson = sheetToJson;
exports.arrayBufferToBinary = arrayBufferToBinary;
