const puppeteer = require("puppeteer");
const Login = require("../page-objects/shopzio/login");
const OrderPuppeteer = require("../page-objects/shopzio/home/create-order");

const puppeteerRun = async (productsList, options) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      defaultViewport: null,
      args: ["--start-maximized", "--window-size=1920,1040"],
      //args: ["--start-maximized"],
    });

    const page = await browser.newPage();

    await page.setViewport({
      width: 1366,
      height: 768,
    });

    await page.goto("https://manage.repzio.com/");
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const loginController = new Login();
    await loginController.login(page);
    // await new Promise((resolve) => setTimeout(resolve, 10000));
    await page.waitForNavigation();

    let orderController = new OrderPuppeteer();
    await orderController.goToCreateOrder(page);
    await page.waitForNavigation();

    await orderController.enterCustomerName(page);
    await orderController.submitNewOrder(page);
    await new Promise((resolve) => setTimeout(resolve, 5000));
    await orderController.addToOrder(page, productsList, options);

    let orderId = await orderController.getOrderNumber(page);

    browser.close();
    return { orderId };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

exports.puppeteerRun = puppeteerRun;
