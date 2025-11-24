import { test, Browser, chromium, Page, expect} from "@playwright/test";
import moment from 'moment';
import jsondata from "../testdata/data.json"
test.describe("login @Sanity" , async()=>{
test("loginviaCSS @MUL123", async () => {
  const browser: Browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page: Page = await context.newPage();
  await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
  await page.locator("input[name='username']").fill("Admin");
  await page.locator("input[name='password']").fill("admin123");
  await page.locator("button[type='submit']").click();
  await page.waitForSelector("text=Dashboard");
  await page.screenshot({ path: "loginviaCSS_screenshot.png" });
  await browser.close();
});

test("loginviaXpath", async () => {
  const browser: Browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page: Page = await context.newPage();
  await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
  await page.locator("//input[@name='username']").fill("Admin");
  await page.locator("//input[@name='password']").fill("admin123");
  await page.locator("//button[@type='submit']").click();
  await page.waitForSelector("text=Dashboard");
  await page.screenshot({ path: "loginviaXpath_screenshot.png" });
  await browser.close();
});
})

test("loginviaInBuilt", async () => {
  const browser: Browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page: Page = await context.newPage();
  await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
  await page.getByPlaceholder("Username").fill("Admin");
  await page.getByPlaceholder("Password").fill("admin123");
  await page.getByRole('button',{name: "Login"}).click();
  await page.waitForSelector("text=Dashboard");
  await page.screenshot({ path: "loginviaInBuilt_screenshot.png" });
  await browser.close();
});

test("filterLocators", async() => {
  const browser: Browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page:Page = await context.newPage();
  await page.goto ("https://www.saucedemo.com/");
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.locator("input[name='login-button']").click();
  await page.waitForSelector("text=Swag Labs");
  await page.pause();
  const row_locator = page.locator('div.inventory_item');
  await row_locator
    .filter({ hasText: 'Sauce Labs Bike Light' })   
    .locator("[data-test='add-to-cart-sauce-labs-bike-light']")
    .click();

  await row_locator
    .filter({ hasText: 'Test.allTheThings() T-Shirt (Red)' })
    .locator("[data-test='add-to-cart-test.allthethings()-t-shirt-(red)']")
    .click();
    
  await page.locator("[data-test='shopping-cart-link']").click();
  await page.waitForSelector("text=Your Cart");
  await page.screenshot({path:"Screenshot_Cart.png"});
  await browser.close();
});

test("radioButton", async({page})=>{
  await page.goto("https://testautomationpractice.blogspot.com/");
  await page.locator("[value='female']").check();
  await expect(page.locator("[value='female']")).toBeChecked();
  await expect(page.locator("[value='male']")).not.toBeChecked();
});

test("singleCheckBox", async({page})=>{
  await page.goto("https://testautomationpractice.blogspot.com/");
  await page.locator("[value='female']").check();
  await expect(page.locator("[value='female']")).toBeChecked();
  await expect(page.locator("[value='male']")).not.toBeChecked();
  await page.locator('[value="monday"]').check();
  await page.screenshot();
});

test("allCheckBox", async({page})=>{
  await page.goto("https://testautomationpractice.blogspot.com/");
  await page.locator("[value='female']").check();
  await expect(page.locator("[value='female']")).toBeChecked();
  await expect(page.locator("[value='male']")).not.toBeChecked();
  let days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  for (let value of days){
    await page.locator(`[value='${value}']`).check();
    // await expect(page.locator(`[value='${day}']`)).toBeChecked();
  }
  await page.screenshot({ path: 'assignment/checkboxes.png' });
});

test("KeyBoardActions",async({page}) => {
 await page.goto("https://gotranscript.com/text-compare");
 await page.getByPlaceholder("Paste one version of the text here.").fill("Hi,How are you");
 await page.keyboard.press('Control+A');
 await page.keyboard.press('Control+C');
 await page.keyboard.down('Tab');
 await page.keyboard.up('Tab');
 await page.keyboard.press('Control+V');
 await page.locator("[name='simple']").check();
 await page.getByRole('button',{name:"Compare"}).click();
 await page.screenshot({ path: 'assignment/keyBoard_ScreenShot.png' });
});

test("Mouse_action", async({page}) => {
  await page.goto ("https://www.snapdeal.com/");
  await page.locator('.catText').filter({hasText:/^Men's Fashion$/}).hover();
  await page.locator("[//span[@class='linkTest']").filter({hasText:/^Sports Shoes$/}).click({button:"right"});
  //await page.locator("[href=['https://www.snapdeal.com/products/mens-footwear-sports-shoes']").filter({hasText:/^Sports Shoes$/}).click({button:"right"});
  await page.screenshot ({path: "Mouse_Action.png"});
});


test("promptBox" , async({page})=>{
  await page.goto("https://testautomationpractice.blogspot.com/");
  page.on('dialog' , async(dialog)=>{
    console.log(dialog.type());
    console.log(dialog.message());
    console.log(dialog.defaultValue());
    await dialog.accept("Hi,How are you");
  })
  await page.getByRole('button' ,{name:"Prompt Alert"}).click();
})


test("MultiplefileUploadasEvent" , async({page})=>{     
  page.goto("https://testautomationpractice.blogspot.com/");
      const uploadfile = page.waitForEvent('filechooser');
      await page.locator("#multipleFilesInput").click();
      const upload = await uploadfile;

  await upload.setFiles(["./tests/uploadFiles/sampletest.txt"]);
  await page.waitForTimeout(10000);
})


test("SinglefileUploadasEvent" , async({page})=>{     
  page.goto("https://testautomationpractice.blogspot.com/");
      const uploadfile = page.waitForEvent('filechooser');
      await page.locator("input[id='singleFileInput']").click();
      const upload = await uploadfile;

  await upload.setFiles(["./tests/uploadFiles/sampletest.txt"]);
  await page.waitForTimeout(10000);
}) 


test("datepicker" , async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/", { waitUntil: 'domcontentloaded' })
  // const datepicker1 = moment().add(5,"days").add(1,"months").format("MM/DD/YYYY");
  // const datepicker2 = moment().add(10,"days").add(3,"months").add(2,"years").format("MM/DD/YYYY");

  const dateRange1 = moment().add(5,"days").add(1,"months").format("YYYY-MM-DD");
  const dateRange2 = moment().add(10,"days").add(3,"months").format("YYYY-MM-DD");

  // await page.locator("input[id='datepicker']").fill(datepicker1);
  // await page.locator("input[id='txtDate']").fill(datepicker2);
  
  await page.waitForSelector("input[id='start-date']");
  await page.waitForSelector("input[id='end-date']");
  await page.getByPlaceholder("Start Date").fill(dateRange1);
  await page.getByPlaceholder("End Date").fill(dateRange2);

  await page.locator(".submit-btn").click();
})


test("download file-event handler", async({page})=>{
await page.goto("https://www.lambdatest.com/selenium-playground/generate-file-to-download-demo");
await page.locator("#textbox").click();
await page.locator("#textbox").fill("Hi,How are you");
await page.waitForSelector("button[id='create']]");
// await expect (page.locator("button[id='create']]")).toBeVisible();
await page.click("button[id='create']]");
// await expect (page.locator("#link-to-download")).toBeVisible();
// await page.locator("link-to-download").click();

  const download = page.waitForEvent("download");
  await page.locator("link-to-download").click();
  const file = await download;

  await file.saveAs("Download File/"+file.suggestedFilename());

})

test("Singletab", async({})=>{
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
  const pagePromise = context.waitForEvent('page');
  await page.getByText("OrangeHRM, Inc").click();
  const newPage = await pagePromise

  expect(newPage).toHaveTitle("Human Resources Management Software | HRMS | OrangeHRM");
  await newPage.getByPlaceholder("Your email address").fill("hello");
  await newPage.screenshot();

})

test("promise" , async({page})=>{
  const responsePromise = page.goto ("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

  responsePromise
    .then(async(response)=>{
      if (response){
        console.log(response.status);
        console.log(response.body)
      }
      else{
        console.log("no response recevied")
      }
    })
    .catch(error => console.error("error during navigation" , error))
})

test("mutipleTabs" , async()=>{
  const browser = await chromium.launch();
  const newContext = await browser.newContext();
  const page = await newContext.newPage();
  await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

  const numberOfTabs = 3;
  

  //for 3 tabs

  for (let i = 0 ; i < numberOfTabs ; i++ ){
    const NewPagePromise = await newContext.waitForEvent('page');
    await page.getByText("OrangeHRM, Inc").click();
    const NewPage = await NewPagePromise
  }

  const pages:any [] = [];
 
  //perform action on each tab

  for(let i=0; i < pages.length ; i++) {

    const tab = pages[i];
    expect(tab).toHaveTitle("Human Resources Management Software | HRMS | OrangeHRM");
    await tab.screenshot();
  }
})

