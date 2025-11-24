import { test, Browser, chromium, Page, expect , Locator} from "@playwright/test";
import {pageURL} from "../testdata/url"

export class loginFunctionality{
    page:Page;
    static PageUrl = pageURL.url;
    private username:Locator;
    private password:Locator;
    private submit:Locator;
    constructor(page:Page)
    {
        this.page=page;
        this.username=page.locator("input[name='username']");
        this.password=page.locator("input[name='password']");
        this.submit=page.locator("button[type='submit']");
    }

    async goto () {
        await this.page.goto(loginFunctionality.PageUrl);
    }

    async login () {
        await this.username.fill("Admin");
        await this.password.fill("admin123");
        await this.submit.click();
    }
 















}