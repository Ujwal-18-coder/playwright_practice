import { test, Browser, chromium, Page, expect} from "@playwright/test";
import moment from 'moment';
import jsondata from "../testdata/data.json"

for (const dt of jsondata) {
test(`jsontest ${dt.id}` , ()=>{
    console.log(dt.username);
    console.log(dt.id);

})



}