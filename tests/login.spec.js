import {test, expect} from '@playwright/test';
import { loginPage } from '../pages/loginPage';
import logindata from '../testdata/loginData.json';

test("Login Test", async({page}) => {

    const login = new loginPage(page);

    await login.goToLoginPage();

    page.on("Google Dialog", async(newalert) => {
        expect(newalert.type()).toContain("alert") //verify the type of alert
        expect(newalert.message()).toContain("Change your password") //verify the message

        await newalert.accept(); //accept it
    })

    await login.login(logindata.username, logindata.password, logindata.url);

    await page.waitForTimeout(2000);

    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

    await page.waitForTimeout(2000);

})

