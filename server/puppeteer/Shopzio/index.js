const puppeteer = require("puppeteer");
// const url = process.argv[2];
// if (!url) {
//     throw "Please provide URL as a first argument";
// }
const puppeteerRun = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"],
  });
  const page = await browser.newPage();
  await page.goto("https://manage.repzio.com/");
  await new Promise((resolve) => setTimeout(resolve, 1000));

  //login
  await page.evaluate(async () => {
    let nameTextBox = document.getElementById("login-email");
    nameTextBox.value = "HiLine Gift";

    let passwordTextBox = document.getElementById("login-password");
    passwordTextBox.value = "37348128";

    let loginButton = document.getElementsByName("button");
    await loginButton[0].click();
  });
  await page.waitForNavigation();

  const Orders = await page.$x("//a[@title='Orders']");
  await Orders[0].click();

  const CreateOrder = await page.$x("//a[@href='/orders/create']");
  await CreateOrder[0].click();
  //   await navigationPromise();

  await page.waitForNavigation();

  await page.type("input[name='findcustomer']", "90791", { delay: 300 });
  await new Promise((resolve) => setTimeout(resolve, 1000));
  await page.keyboard.press("ArrowDown");

  let customerDropDownBox = await page.$x("//ul[@id='ui-id-2']");
  customerDropDownBox[0].click();

  await new Promise((resolve) => setTimeout(resolve, 3000));

  await page.evaluate(async () => {
    let buttons = document.querySelector("button[value='Next']");
    await buttons.click();
    buttons = document.querySelector("button[value='Next']");
    await buttons.click();

    //   Invoice page
    let placeByRep = document.getElementById("placedByDropdownTogglerBtn");
    await placeByRep.click();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    let siblings = placeByRep.parentElement.children;
    await siblings[1].children[0].click();

    // WrittenForRepNumber
    await new Promise((resolve) => setTimeout(resolve, 1000));
    document.querySelector(
      "select[id='WrittenForRepNumber'] option:nth-child(2)"
    ).selected = true;

    //  order type
    await new Promise((resolve) => setTimeout(resolve, 1000));
    document.querySelector(
      "select[id='OrderStatus'] option:nth-child(7)"
    ).selected = true;

    // do not ship before
    await new Promise((resolve) => setTimeout(resolve, 1000));
    let doNotShipBefore = document.getElementById("DoNotShipBefore");
    doNotShipBefore.value = "2020-11-19";

    //
    await new Promise((resolve) => setTimeout(resolve, 1000));
    buttons = document.querySelector("button[value='Submit']");
    buttons.click();
  });

  await new Promise((resolve) => setTimeout(resolve, 5000));
  await page.evaluate(async () => {
    let a = document.getElementById("btnAddNewRow");
    a.click();
  });

  // add to order
  //   let addToOrderLink = await page.$x('//a[@id="btnAddNewRow"]');
  //   await new Promise((resolve) => setTimeout(resolve, 1000));
  //   addToOrderLink[0].click();

  // qty
  //   let qtyTextbox = document.getElementById("Qty");
  //   qtyTextbox.value = "2";

  // item id
  //   await page.type("input[id='ItemID']", "37400-BL", { delay: 300 });
  //   await new Promise((resolve) => setTimeout(resolve, 1000));
  //   await page.keyboard.press("ArrowDown");
  //   let anotherDropDown = await page.$x("//ul[@id='ui-id-2']");
  //   anotherDropDown[0].click();

  await new Promise((resolve) => setTimeout(resolve, 3000));
  browser.close();
  return { message: "success" };
};

exports.puppeteerRun = puppeteerRun;
