import { test, expect } from '@playwright/test';
import { HomePage } from '../../page-objects/HomePage';
import { ProductPage } from '../../page-objects/ProductPage';
import { CartPage } from '../../page-objects/CartPage';


test.describe('Check Total', () => {
  let homePage;
  let productPage;
  let cartPage;

  // before the test we navigate to the homepage
  test.beforeEach(async ({page}) => {
    homePage = new HomePage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    await homePage.goto();
  }) 


  // This test checks if the price of items in cart add up correctly to the total price
  test('Checking Total Price', async ({page}) => {
  

  await homePage.searchItem("Cat Nip"); // Enters the search query and proceeds
  await productPage.addToCartFirst(); // Adds the first item to the cart
  await homePage.searchItem("Hrana Za Pse"); // Enters the search query and proceeds
  await productPage.addToCartFirst(); 
  await productPage.openCart();
  await cartPage.assertCartTotal();
  

})

});