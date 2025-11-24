import { test, Browser, chromium, Page, expect} from "@playwright/test";
import moment from 'moment';

test('Handle multiple date pickers with Moment.js', async ({ page }) => {
  // Navigate to your page
  await page.goto('https://your-app-url.com');

  // --- 1. Date Picker 1 (mm/dd/yyyy) ---
  const date1 = moment().add(5, 'days').format('MM/DD/YYYY'); // 5 days from today
  await page.fill('input[placeholder="mm/dd/yyyy"]', date1);

  // --- 2. Date Picker 2 (dd/mm/yyyy) ---
  const date2 = moment().add(10, 'days').format('DD/MM/YYYY'); // 10 days from today
  await page.fill('input[placeholder="dd/mm/yyyy"]', date2);

  // --- 3. Date Range Picker (dd-mm-yyyy) ---
  const startDate = moment().add(1, 'month').format('DD-MM-YYYY'); // Start date: +1 month
  const endDate = moment().add(2, 'month').format('DD-MM-YYYY');   // End date: +2 months

  // Fill start and end date fields
  const dateRangeInputs = await page.locator('input[placeholder="dd-mm-yyyy"]');
  await dateRangeInputs.nth(0).fill(startDate);
  await dateRangeInputs.nth(1).fill(endDate);

  // Click Submit
  await page.click('button:has-text("Submit")');

  // Optional: Validate submission or result
  await expect(page.locator('#result')).toContainText('Success');
});
