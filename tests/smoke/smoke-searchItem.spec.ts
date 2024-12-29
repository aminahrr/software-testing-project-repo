import { test, expect } from '@playwright/test';
import { HomePage } from '../../page-objects/HomePage';
import { ProductPage } from '../../page-objects/ProductPage';

test('POM Search Test', async ({page}) => {
  const productPage = new ProductPage(page);
  const homePage = new HomePage(page);

  await homePage.goto(); // Goes to the homepage of the website

  const searchQuery = "Cat Nip"; // The item we are searching for
  await homePage.searchItem(searchQuery); // Enters the search query and proceeds
  await page.waitForTimeout(3000); // Waits for 3000 milliseconds (GitHub test fix)
  await productPage.assertProductTitleContainsWords(searchQuery); // Verifies if the product is found

})