exports.checkoutPage=
class checkoutPage {

    constructor(page) {
        this.page = page;
        this.firstName = '#first-name';
        this.lastName = '#last-name';
        this.postalCode = '#postal-code';
        this.cancelBtn = '#cancel';
        this.cartText = '//span[text()="Your Cart"]';
        this.checkoutBtn = '#checkout';
        this.titleCheckoutPage = '//span[@data-test="title"]';
        this.continueBtn = '#continue';
    }

    async goBackToCartPage() {
        await this.page.locator(this.cancelBtn).click();
    }

    async goBackToCheckOutPage() {
        await this.page.locator(this.checkoutBtn).click();
    }

    async fillCheckoutPage(firstname, lastname, zipcode) {
        await this.page.locator(this.firstName).fill(firstname);
        await this.page.locator(this.lastName).fill(lastname);
        await this.page.locator(this.postalCode).fill(zipcode);
        await this.page.locator(this.continueBtn).click();
    }
}