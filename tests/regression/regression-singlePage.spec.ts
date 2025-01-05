import { test, expect } from '@playwright/test';
import { HomePage } from '../../page-objects/HomePage';
import { ProductPage } from '../../page-objects/ProductPage';

/*      Product Details Validation: Check for the presence of the product name, description, price, and images.
	  X Add to Cart: Ensure that clicking “Add to Cart” updates the cart with the correct product and quantity.
		Image Carousel: Validate the functionality of image galleries or carousels.
		Stock Status: Check if the correct stock status (in stock/out of stock) is displayed.*/

test.describe('Add Prodcut To Cart', () => {
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

    //await homePage.searchItem("Cat Nip"); // Enters the search query and proceeds
    //await productPage.addToCartFirst(); // We add the first item to the cart
    //await productPage.detailsOfFirst(); //opens details page of first item in search
    //await productPage.stockStatus();
    //await productPage.openCart(); // We open the cart page
    await homePage.clickSubCategoryItem('Psi', 'Hrana za pse') // Opens the product page
    await productPage.productCard2().first().click();
    await productPage.detailsOfProduct(); //opens details page of first item in search

  })

})