import { test, Browser, chromium, Page, expect} from "@playwright/test";
import moment from 'moment';
import jsondata from "../testdata/signup.json"

const dt = jsondata;
test("Sign up and create new account" , async({page})=>{
    await page.goto ("https://automationexercise.com/");
    await page.getByText(" Signup / Login").click();
    await page.getByPlaceholder("Name").fill(dt.Name);
    await page.locator("input[data-qa='signup-email']").fill(dt.EmailAddress);
    await page.getByRole("button" , {name: "Signup"}).click();
    await expect(page.locator('h2:has-text("Enter Account Information")')).toBeVisible();
    await page.check("#id_gender1");
    await page.locator("input[type='password']").fill(dt.Password);
    await page.selectOption("#days", "18");
    await page.selectOption("#months","April");
    await page.selectOption("#years","1997");
    await page.locator("input[name='newsletter']").click();
    await page.locator("input[name='optin']").click();
    await page.fill('#first_name', dt.firstName);
    await page.fill('#last_name', dt.lastName);
    await page.fill('#address1', dt.address1);
    await page.fill('#state', dt.state);
    await page.fill('#city', dt.city);
    await page.fill('#zipcode', dt.zipcode);
    await page.fill('#mobile_number', dt.mobileNumber);
    await page.locator("button[data-qa='create-account']").click();
    await expect(page.locator('h2[data-qa="account-created"]')).toHaveText('Account Created!');










})