import { test, expect } from '@playwright/test';
import { HomePage } from '../../page-objects/HomePage';
import { ProductPage } from '../../page-objects/ProductPage';


test.describe('Single Page', () => {
  let homePage;
  let productPage;

  // before the test we navigate to the homepage
  test.beforeEach(async ({page}) => {
    homePage = new HomePage(page);
    productPage = new ProductPage(page)
    await homePage.goto();
  }) 

  // Testing if we added the correct item inside of the cart
  test('Product Details Validation', async ({page}) => {
    await homePage.navMyPetButton().click();
    await page.waitForTimeout(300); // Waits for 300 milliseconds (GitHub test fix)
    await productPage.productTitle().first().click(); //opens product details
    await productPage.assertCheckProductDetails( 'Betta Splendens-Delta borac', 15); //opens details page of first item in search
    
  })

})