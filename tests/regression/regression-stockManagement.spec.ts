import { test, expect } from '@playwright/test';
import { ProductPage } from '../../page-objects/ProductPage';
import { HomePage } from '../../page-objects/HomePage';

test.describe('Stock Management Test', () => {
  let homePage;
  let productPage;

  // before the test we navigate to the homepage
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    productPage = new ProductPage(page);
    await homePage.goto(); // Navigate to the homepage
  });

  // In this test we will test if we can add more items that said in stock
  test('Boundry scenario - testing stock management system', async ({ page }) => {

    await homePage.clickSubCategoryItem('Psi', 'Hrana za pse') // Opens the product page
    await productPage.productTitle().first().click(); //opens product details
    await productPage.increaseStockByCurrentPlusOne()
    await productPage.assertStockNumberMatches()
  });

});
 