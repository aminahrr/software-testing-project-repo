import { test, expect } from '@playwright/test';
import { HomePage } from '../../page-objects/HomePage';

test('POM Homepage Test', async ({page}) => {
  const homePage = new HomePage(page);

  await homePage.goto(); // Goes to the homepage of the website
  await page.waitForTimeout(3000); // Waits for 3000 milliseconds (GitHub test fix)

  // Homepage elements presence test
  await homePage.assertCheckHomePageElements()
  
}) 
