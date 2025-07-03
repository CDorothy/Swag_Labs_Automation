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
    await expect(page).toHaveURL(logindata.url); // verify if the user is on product page

    const product = new productPage(page);
    await product.addToCart(productdata.productname);
    await product.clickOnCart();
    await page.waitForTimeout(2000);
    await expect(page).toHaveURL(productdata.url);

    const cart = new cartPage(page);
    await expect(page.locator(cart.productName)).toHaveText(cartdata.productname);  //verify product name

    await cart.verifyProduct();
    await expect(page).toHaveURL(cartdata.url); //verify url
    await expect(page.locator(cart.productDescription)).toHaveText(cartdata.productdescription); //verify product description
    await expect(page.locator(cart.productPrice)).toHaveText(cartdata.productprice); //verify product price
    await expect(page.locator(cart.productImage)).toBeVisible(); //verify if image is visible
    await expect(page.locator(cart.productBackBtn)).toBeVisible(); //verify if backbutton is present

    await cart.goBackToCart();
    await expect(page.locator(cart.shoppingCart)).toBeVisible();
    await expect(page.locator(cart.removeBtn)).toBeVisible();
    await expect(page.locator(cart.checkoutBtn)).toBeVisible();

    await cart.verifyCart();

    await expect(page).toHaveURL(cartdata.checkouturl);

    await page.waitForTimeout(2000);

    await page.close();

})