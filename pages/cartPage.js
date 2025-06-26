exports.cartPage = 
class cartPage {

    constructor(page) {
        this.page = page;
        this.productName = '#item_2_title_link';
        this.productDescription = '.inventory_details_desc.large_size';
        this.productPrice = '.inventory_details_price';
        this.productImage = '//img[@alt="Sauce Labs Onesie"]';
        this.productBackBtn = '#back-to-products';
        this.shoppingCart = '.shopping_cart_link';
        this.continueShoppingBtn = '#continue-shopping';
        this.removeBtn = '.btn.btn_secondary.btn_small.cart_button';
        this.checkoutBtn = '#checkout';
        
    }

    async verifyProduct(productname, productdescription, productprice) {
        await expect(this.page.locator(this.productImage)).toHaveText(productname);
        await this.page.locator(this.productName).click();
        await expect(this.page).toHaveURL('https://www.saucedemo.com/cart.html');
        await expect(this.page.locator(this.productDescription)).toContain(productdescription);
        await expect(this.page.locator(this.productPrice)).toHaveText(productprice);
        await expect(this.page.locator(this.productImage)).toBeVisible();
        await expect(this.page.locator(this.productBackBtn)).toBeVisible();
        await this.page.locator(this.shoppingCart).click();
    }

    async verifyCart() {
        await expect(this.page.locator(this.shoppingCart)).toBeVisible();
        await expect(this.page.locator(this.removeBtn)).toBeVisible();
        await expect(this.page.locator(this.checkoutBtn)).toBeVisible();
        await this.page.locator(this.checkoutBtn).click();
    }
}