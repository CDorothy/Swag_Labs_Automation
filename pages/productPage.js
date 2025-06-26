exports.productPage = 
class productPage {

    constructor(page) {
        this.page = page;
        this.productConatiner = '.inventory_item';
        this.listOfProduct = '.inventory_item_name ';
        this.addToCartBtn = '.btn.btn_primary.btn_small.btn_inventory';
        this.shoppingCart = '.shopping_cart_link';
        //this.clickOnCheckout = '#checkout';
    }

    async addToCart(productname) {
        const productList = await this.page.locator(this.productConatiner);
        const count = await productList.count();
        

        for(let i = 0; i < count; i++) {
            const product = await productList.nth(i);
            const name = await product.locator(this.listOfProduct);

            if(productname === await name.textContent()) {
                await product.locator(this.addToCartBtn).click();
                break;
            }
        }
        
    }

    async clickOnCart() {
        await this.page.locator(this.shoppingCart).click();
    }

}