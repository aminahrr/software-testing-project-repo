import { test, expect } from '@playwright/test';
import { HomePage } from '../../page-objects/HomePage';
import { ProductPage } from '../../page-objects/ProductPage';
import { WishlistPage } from '../../page-objects/WishlistPage';

test.describe('Adding Product to Wishlist', () => {
  let homePage;
  let productPage
  let wishlistPage

  // before the test we navigate to the homepage
  test.beforeEach(async ({ page, browserName }) => {
    if (browserName === 'webkit') {
      await page.bringToFront(); // Ensure the browser is in focus
    }
    homePage = new HomePage(page);
    productPage = new ProductPage(page);
    wishlistPage = new WishlistPage(page);
    await homePage.goto(); 
  });

  // Testing if the adding to whislist functionality works
  test('Testing Adding Product To Wishlist', async ({ page }) => {

    await homePage.searchItem("Cat Nip"); // Enters the search query and proceeds
    await productPage.addToWishlistFirst(); // Adds first item to the wishlist
    await page.waitForTimeout(1000); // Waits for 500 milliseconds (GitHub test fix)
    await productPage.openWishlist(); // Opens the wishlist page
    await wishlistPage.assertProductTitleContainsWords("Cat Nip"); // Checks if the previously added item is on the wishlist page
  });

})