import {test as basetest , Page , expect } from "@playwright/test"

type fixture1 = {
 
    fixture1 : string

}

export const test = basetest.extend<fixture1>({
    fixture1:async({page},use)=>{
        const fixture1 = "logintoOragnehrmlive"
        await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
        await page.locator("//input[@name='username']").fill("Admin");
        await page.locator("//input[@name='password']").fill("admin123");
        await page.locator("//button[@type='submit']").click();
        await use (fixture1)
        //await page.screenshot({ path: "customfixture_screenshot.png" , fullPage : true});
        expect (await page.screenshot({fullPage:true})).toMatchSnapshot('customfixture_screenshot.png')
        
        
    }
})