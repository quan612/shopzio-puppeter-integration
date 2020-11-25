class Login {
  constructor() {
    this.elements = {
      emailTextBox: "login-email",
      email: "HiLine Gift",

      passwordTextBox: "login-password",
      password: "37348128",

      loginButton: "button",
    };
  }

  async login(page) {
    try {
      let elements = this.elements;
      await page.evaluate(async (elements) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        let el;
        el = document.getElementById(elements.emailTextBox);
        el.value = elements.email;

        await new Promise((resolve) => setTimeout(resolve, 1000));
        el = document.getElementById(elements.passwordTextBox);
        el.value = elements.password;

        el = document.getElementsByName(elements.loginButton);
        await el[0].click();
      }, elements);
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = Login;
