exports.cartPage = 
class cartPage {

    constructor(page) {
        this.page = page;
        this.productName = '.inventory_item_name';
        this.productDescription = '.inventory_details_desc.large_size';
        this.productPrice = '.inventory_details_price';
        this.productImage = '//img[@alt="Sauce Labs Onesie"]';
        this.productBackBtn = '#back-to-products';
        this.shoppingCart = '.shopping_cart_link';
        this.continueShoppingBtn = '#continue-shopping';
        this.removeBtn = '.btn.btn_secondary.btn_small.cart_button';
        this.checkoutBtn = '#checkout';
        
    }

    async verifyProduct() {
        await this.page.locator(this.productName).click();
    }

    async goBackToCart() {
        await this.page.locator(this.shoppingCart).click();
    }

    async verifyCart() {
        await this.page.locator(this.checkoutBtn).click();
    }
}