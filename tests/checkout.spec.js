import {test, expect} from '@playwright/test';
import { loginPage } from '../pages/loginPage';
import { productPage } from '../pages/productPage';
import { cartPage } from '../pages/cartPage';
import { checkoutPage } from '../pages/checkoutPage';
import checkoutdata from '../testdata/checkoutData.json';

test('testing checkout page', async({page}) => {

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

    const checkout = new checkoutPage(page);

    await checkout.goBackToCartPage();
    await expect(checkout.cartText).toHaveText("Your Cart");

    await checkout.goBackToCheckOutPage();

    await checkout.fillCheckoutPage(checkoutdata.firstname, checkoutdata.lastname, checkoutdata.zipcode);
})