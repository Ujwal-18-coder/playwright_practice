import { test, Browser, chromium, Page, expect} from "@playwright/test";
import moment from 'moment';
import jsondata from "../testdata/signup.json"

const xt = jsondata
test("product checkout" , async({page})=>{
    await page.goto ("https://automationexercise.com/login");
    await page.locator("input[data-qa='login-email']").fill(xt.EmailAddress);
    await page.locator("input[data-qa='login-password']").fill(xt.Password);
    await page.locator("button[data-qa='login-button']").click();
    await expect(page.getByText("Logged in as NewUser1719")).toBeVisible();
    await page.getByRole('link', { name: 'Products' }).click();
    // await page.locator("a[href='/product_details/2']").click();
   
    const product = page.locator('.product-image-wrapper').first();
    await product.hover();
    await product.getByText('Add to cart', { exact: true }).first().click()

    await page.getByRole('link' , {name : 'View Cart'}).click();
    await page.getByText('Proceed To Checkout').click();
    await page.getByRole("link" , {name: "Place Order"}).click();

    await page.fill('[data-qa="name-on-card"]', xt.nameoncard);
    await page.fill('[data-qa="card-number"]', xt.cardNumber);
    await page.fill('[data-qa="cvc"]', xt.cvv);
    await page.fill('[data-qa="expiry-month"]', xt.expiryMonth);
    await page.fill('[data-qa="expiry-year"]', xt.expiryYear);
    await page.getByRole("button" , {name: "Pay and Confirm Order"}).click();
    await expect (page.locator("h2[data-qa='order-placed']")).toHaveText("Order Placed!");









})