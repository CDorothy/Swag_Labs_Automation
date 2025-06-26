const { expect } = require("@playwright/test");

exports.loginPage =
class loginPage {

    constructor(page) {
        this.page = page;
        this.loginLink = "https://www.saucedemo.com/";
        this.userName = "#user-name";
        this.passWord = "#password";
        this.loginBtn = "#login-button";
    }


    async goToLoginPage() {
        await this.page.goto(this.loginLink);
    }

    async login(username, password) {
        await this.page.locator(this.userName).fill(username);
        await this.page.locator(this.passWord).fill(password);
        await this.page.locator(this.loginBtn).click();
    }
}