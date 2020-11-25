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
    await new Promise((resolve) => setTimeout(resolve, 1000));

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

  async addToOrder(page, productsList) {
    await page.evaluate(async () => {
      let a = document.getElementById("btnAddNewRow");
      a.click();
    });

    await new Promise((resolve) => setTimeout(resolve, 2000));

    // loop is here
    for (let product of productsList) {
      // qty
      // await page.evaluate(async () => {
      //   let qtyTextBox = document.getElementById("Qty");
      //   qtyTextBox.value = "1";
      // });

      //item id
      let productNumber = product.PartNumber;
      await page.type("input[id='ItemID']", productNumber, { delay: 300 });
      await new Promise((resolve) => setTimeout(resolve, 1500));
      await page.keyboard.press("ArrowDown");
      let anotherDropDown = await page.$x("//ul[@id='ui-id-2']");
      anotherDropDown[0].click();

      await new Promise((resolve) => setTimeout(resolve, 2000));
      // click on add item
      let addItemButton = await page.$x("//button[@id='save']");
      addItemButton[0].click();
      await new Promise((resolve) => setTimeout(resolve, 2100));
    }

    // await new Promise((resolve) => setTimeout(resolve, 2000));
    // end loop
    let closeModalBtn = await page.$x("//button[@class='close']");
    closeModalBtn[0].click();
    // await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  async getOrderNumber(page) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return await page.evaluate(async () => {
      let liOrder = document.querySelectorAll(
        "ul[class='breadcrumb breadcrumb-top'] li"
      )[2];
      return liOrder.innerText;
    });
  }
}

module.exports = OrderPuppeteer;
