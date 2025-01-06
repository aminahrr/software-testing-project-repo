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
    await productPage.assertPagination() // Checks if the pagination is present
    await productPage.assertProductPhoto() // Checks if the product photo is present
    await productPage.assertFilterSidebar() // Checks if the filter sidebar is present
    await productPage.assertOrdering() // Checks if the ordering filter option present
    await productPage.assertNumberOfItems() // Checks if the number of items is present
    await productPage.assertCategoryTitle() // Checks if the category title is present
    await productPage.assertProductCard() // Checks if the product photo is present
    
    
  })

})