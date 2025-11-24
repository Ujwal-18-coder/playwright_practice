import { expect } from "@playwright/test";
import { test} from "../fixtures/login"


test("test1" , async({page,fixture1})=>{
    await page.waitForSelector("text=Dashboard");

})