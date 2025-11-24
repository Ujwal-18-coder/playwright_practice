import { test, Browser, chromium, Page, expect} from "@playwright/test";

test("Alert  Box, Switch Tab  and Iframe" , async()=>{
    const browser: Browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page: Page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

//     //handle alert box

    await page.locator("input[id='name']").fill("test");
    page.once('dialog' , async (dialog) =>{
        expect(dialog.message()).toContain('Hello test');
        await dialog.accept();
    });
    await page.click("#alertbtn");

//     //handle new tab
    
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        page.getByRole('link', { name: 'Open Tab' }).click() // Opens a new tab
  ]);

    await newPage.waitForLoadState();
    await expect(newPage).toHaveURL("https://www.qaclickacademy.com/");
    await expect(newPage).toHaveTitle(/QAClick Academy/);
    await newPage.screenshot();
    await newPage.close();

    //Handle Iframe and click Mentorship tab

    const frame = page.frameLocator("#courses-iframe");
    await frame.locator("a[href='#/mentorship']").click();
    await frame.getByRole("button" , {name: "View Plans & Pricing"}).click();
    await expect(frame.locator("h3[class='tracking-tight text-4xl lg:text-5xl font-bold text-primary mb-3']")).toHaveText("PLATINUM");
  
})