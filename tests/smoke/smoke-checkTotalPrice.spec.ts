import { test, expect } from '@playwright/test';
import { HomePage } from '../../page-objects/HomePage';
import { ProductPage } from '../../page-objects/ProductPage';
import { CartPage } from '../../page-objects/CartPage';

test('POM Check Total Price', async ({page}) => {
  const productPage = new ProductPage(page);
  const homePage = new HomePage(page);
  const cartPage = new CartPage(page);

  await homePage.goto(); // Goes to the homepage of the website

  const searchQuery = "Cat Nip"; // The item we are searching for
  await homePage.searchItem(searchQuery); // Enters the search query and proceeds
  await page.waitForTimeout(3000); // Waits for 3000 milliseconds (GitHub test fix)
  await productPage.addToCartFirst();
  const searchQuery2 = "Hrana Za Pse"; // The item we are searching for
  await homePage.searchItem(searchQuery2); // Enters the search query and proceeds
  await page.waitForTimeout(3000); // Waits for 3000 milliseconds (GitHub test fix)
  await productPage.addToCartFirst(); 
  await page.waitForTimeout(3000);
  await productPage.openCart();
  await page.waitForTimeout(3000);
  await cartPage.assertCartTotalCorrect();
  

})