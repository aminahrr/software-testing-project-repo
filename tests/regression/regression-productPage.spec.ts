import { test, expect } from '@playwright/test';
import { HomePage } from '../../page-objects/HomePage';
import { ProductPage } from '../../page-objects/ProductPage';



test.describe('Product Page Test', () => {
  let homePage;
  let productPage;


  // before the test we navigate to the homepage
  test.beforeEach(async ({page}) => {
    homePage = new HomePage(page);
    productPage = new ProductPage(page)
    await homePage.goto();
  }) 

  // Testing if the product page elements are visible
  test('Checking if product page element are present', async ({page}) => {

    await homePage.clickSubCategoryItem('Psi', 'Hrana za pse') // Opens the product page
    

  })

})