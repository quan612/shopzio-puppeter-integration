class OrderPuppeteer {
  constructor() {
    this.elements = {
      orderTab: "//a[@title='Orders']",
      createOrderTab: "//a[@href='/orders/create']",
    };
  }

  async goToCreateOrder(page) {
    let order = await page.$x(this.elements.orderTab);
    await order[0].click();
    await new Promise((resolve) => setTimeout(resolve, 4000));

    let createOrder = await page.$x(this.elements.createOrderTab);
    await createOrder[0].click();
  }

  async enterCustomerName(page) {
    await page.type("input[name='findcustomer']", "90791", { delay: 300 });
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await page.keyboard.press("ArrowDown");

    let customerDropDownBox = await page.$x("//ul[@id='ui-id-2']");
    customerDropDownBox[0].click();

    await new Promise((resolve) => setTimeout(resolve, 3000));
  }

  async submitNewOrder(page) {
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
  }

  async addToOrder(page, productsList, options) {
    if (options.removeBlankQty) {
      productsList = productsList.filter((product) =>
        product.hasOwnProperty("Order QTY")
      );
    }
    if (productsList.length === 0) {
      console.log("There is no product to work on here");
      return;
    }

    await page.evaluate(async () => {
      // let a = document.getElementById("btnAddNewRow");
      // a.click();

      buttons = document.querySelector("a[id='btnAddNewRow']");
      await buttons.click();
    });

    await new Promise((resolve) => setTimeout(resolve, 2000));

    let productNumber;
    // loop is here
    for (let product of productsList) {
      try {
        //item id
        if (product.hasOwnProperty("PartNumber")) {
          productNumber = product["PartNumber"];
          await page.type("input[id='ItemID']", productNumber, { delay: 500 });
          await new Promise((resolve) => setTimeout(resolve, 2000));
          await page.keyboard.press("ArrowDown");
          let itemDropDown = await page.$x("//ul[@id='ui-id-2']");
          await itemDropDown[0].click();
          await new Promise((resolve) => setTimeout(resolve, 2000));
        }

        // qty
        if (product.hasOwnProperty("Order QTY")) {
          let qty = product["Order QTY"].toString();
          await page.click("input[id='Qty']", { clickCount: 3 });
          await page.keyboard.press("Backspace");
          await page.type("input[id='Qty']", qty, { delay: 1000 });
        }

        // price override
        let customPrice = product["Wholesale Price"].toString();
        if (customPrice !== 0) {
          await page.click("input[id='PriceOverride']", { clickCount: 3 });
          await page.keyboard.press("Backspace");
          await page.type("input[id='PriceOverride']", customPrice, {
            delay: 1000,
          });
        } else {
          await page.click("input[id='PriceOverride']", { clickCount: 3 });
          await page.keyboard.press("Backspace");
          await page.type("input[id='PriceOverride']", "0", {
            delay: 1000,
          });
        }

        // click on add item
        let addItemButton = await page.$x("//button[@id='save']");
        addItemButton[0].click();
        await new Promise((resolve) => setTimeout(resolve, 2100));
      } catch (error) {
        console.log(error);
        throw "Error at product: " + productNumber;
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 2000));
    // end loop
    let closeModalBtn = await page.$x("//button[@class='close']");
    closeModalBtn[0].click();
  }

  async getOrderNumber(page) {
    //await new Promise((resolve) => setTimeout(resolve, 6000));
    return await page.evaluate(async () => {
      let liOrder = document.querySelectorAll(
        "ul[class='breadcrumb breadcrumb-top'] li"
      )[2];
      return liOrder.innerText;
    });
  }
}

module.exports = OrderPuppeteer;
