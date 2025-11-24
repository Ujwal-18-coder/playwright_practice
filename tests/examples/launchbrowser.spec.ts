import {test,chromium, Browser, Page} from "@playwright/test"

test("launch browser", async () =>{
    const browser:Browser = await chromium.launch({headless:false});
    const context = await browser.newContext();
    const page:Page= await context.newPage();
    await page.goto ("https://www.gmail.com");
    await page.screenshot({ path: "gmail_screenshot.png" });
    await browser.close();   
})