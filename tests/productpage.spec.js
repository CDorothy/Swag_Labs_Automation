import {test, expect} from '@playwright/test';
import { loginPage } from '../pages/loginPage';
import { productPage } from '../pages/productPage';
import logindata from '../testdata/loginData.json';
import productdata from '../testdata/productData.json';

test("product page", async({page}) => {

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

    await product.clickOnCart();

    await page.waitForTimeout(2000);

    await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");

    await page.waitForTimeout(2000);

    await page.close();

})