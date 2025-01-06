import { test, expect } from '@playwright/test';
import { HomePage } from '../../page-objects/HomePage';
import { ProductPage } from '../../page-objects/ProductPage';
import { CartPage } from '../../page-objects/CartPage';


test.describe('Add Prodcut To Cart', () => {
  let homePage;
  let productPage;
  let cartPage;

  // before the test we navigate to the homepage
  test.beforeEach(async ({page}) => {
    homePage = new HomePage(page);
    productPage = new ProductPage(page)
    cartPage = new CartPage(page)
    await homePage.goto();
  }) 

  // Testing if we added the correct item inside of the cart
  test('Checking if item is in cart', async ({page}) => {

    await homePage.searchItem("Cat Nip"); // Enters the search query and proceeds
    await productPage.addToCartFirst(); // We add the first item to the cart
    await page.waitForTimeout(1000); // Wait for 1000 ms
    await productPage.openCart(); // We open the cart page
    await cartPage.assertProductTitleContainsWords("Cat Nip"); // We check if the item is inside of the cart

  })

})