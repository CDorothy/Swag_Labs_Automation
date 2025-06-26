import { expect, test } from '@playwright/test';
import { loginPage } from '../pages/loginPage';
import { productPage } from '../pages/productPage';
import { cartPage } from '../pages/cartPage';
import logindata from '../testdata/loginData.json';
import productdata from '../testdata/productData.json';
import cartdata from '..//testdata/cartData.json';

test("cart page", async({page}) => {

    const login = new loginPage(page);

    await login.goToLoginPage();

    page.on("Google Dialog", async(newalert) => {
        expect(newalert.type()).toContain("alert") //verify the type of alert
        expect(newalert.message()).toContain("Change your password") //verify the message

        await newalert.accept(); //accept it
    })

    await login.login(logindata.username, logindata.password);

    await page.waitForTimeout(2000);

    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

    const product = new productPage(page);

    await product.addToCart(productdata.productname);

    await product.clickOnCart(productdata.url);

    await page.waitForTimeout(2000);

    await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");

    const cart = new cartPage(page);

    await cart.verifyProduct(cartdata.productname, cartdata.productdescription, cartdata.productprice);

    await cart.verifyCart();

    await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-one.html");

    await page.waitForTimeout(2000);

    await page.close();

})