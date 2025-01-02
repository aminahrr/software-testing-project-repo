import { test, expect } from '@playwright/test';
import { HomePage } from '../../page-objects/HomePage';
import { ProductPage } from '../../page-objects/ProductPage';
import { WishlistPage } from '../../page-objects/WishlistPage';

test('POM Add To Wishlist Test', async ({page}) => {
  const productPage = new ProductPage(page);
  const homePage = new HomePage(page);
  const wishlistPage = new WishlistPage(page)

  await homePage.goto(); // Goes to the homepage of the website

  const searchQuery = "Cat Nip"; // The item we are searching for
  await homePage.searchItem(searchQuery); // Enters the search query and proceeds
  await page.waitForTimeout(3000); // Waits for 3000 milliseconds (GitHub test fix)
  
  await productPage.addToWishlistFirst();
  await page.waitForTimeout(3000); 
  await productPage.openWishlist();
  await wishlistPage.assertProductTitleContainsWords("Cat Nip");

})