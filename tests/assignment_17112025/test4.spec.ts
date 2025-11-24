import { test, Browser, chromium, Page, expect} from "@playwright/test";
import {loginFunctionality} from "../assignment/page"

test("pageObjectModel" , async({page})=>{
    const OrangeHRM = new loginFunctionality(page);
    await OrangeHRM.goto();
    await OrangeHRM.login();
    
})