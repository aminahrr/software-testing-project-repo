import { test, expect } from '@playwright/test';
import { HomePage } from '../../page-objects/HomePage';
import { ProductPage } from '../../page-objects/ProductPage';

test.describe('Navigation Bar Tests', () => {
  let homePage;
  let productPage

  // before the test we navigate to the homepage
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    productPage = new ProductPage(page);
    await homePage.goto(); 
  });

  // Testing if the navigation bar open the homepage
  test('NavBar Test - Homepage', async ({ page }) => {
    await homePage.assertCheckNavHomepage();
  });

  // Testing if the navigation bar open the shop page
  test('NavBar Test - Shop', async ({ page }) => {
    await homePage.assertCheckNavShop();
  });

  // Testing if the navigation bar open the contact page
  test('NavBar Test - Contact', async ({ page }) => {
    await homePage.assertCheckNavContact();
  });

  // Testing if the navigation bar open the about us page
  test('NavBar Test - About Us', async ({ page }) => {
    await homePage.assertCheckNavAboutUs();
  });

  // Testing if the navigation bar open the blog page
  test('NavBar Test - Blog', async ({ page }) => {
    await homePage.assertCheckNavBlog();
  });

  // Testing if the navigation bar open the dogs category page
  test('NavBar Test - Dogs', async ({ page }) => {
    await homePage.assertCheckNavDogs();
  });

  // Testing if the navigation bar open the cats category page
  test('NavBar Test - Cats', async ({ page }) => {
    await homePage.assertCheckNavCats();
  });

  // Testing if the navigation bar open the birds category page
  test('NavBar Test - Birds', async ({ page }) => {
    await homePage.assertCheckNavBirds();
  });

  // Testing if the navigation bar open the small animals category page
  test('NavBar Test - Small Animals', async ({ page }) => {
    await homePage.assertCheckNavSmallAnimals();
  });

  // Testing if the navigation bar open the aquaristics category page
  test('NavBar Test - Aquaristics', async ({ page }) => {
    await homePage.assertCheckNavAquaristics();
  });

  // Testing if the navigation bar open the terrarium category page
  test('NavBar Test - Terrarium', async ({ page }) => {
    await homePage.assertCheckNavTerrarium();
  });

  // Testing if the navigation bar open the pharmacy category page
  test('NavBar Test - Pharmacy', async ({ page }) => {
    await homePage.assertCheckNavPharmacy();
  });

  // Testing if the navigation bar open the my pet page
  test('NavBar Test - My Pet', async ({ page }) => {
    await homePage.assertCheckNavMyPet();
  });

  // Testing if the navigation bar open the search bar
  test('NavBar Test - Search Bar', async ({ page }) => {
    await homePage.assertCheckNavSearch();
  });

  // Testing if the navigation bar open the account page
  test('NavBar Test - Account', async ({ page }) => {
    await homePage.assertCheckNavAccount();
  });

  // Testing if the navigation bar open the wishlist page
  test('NavBar Test - Wishlist', async ({ page }) => {
    await homePage.assertCheckNavWishlist();
  });

  // Testing if the navigation bar open the cart page
  test('NavBar Test - Cart', async ({ page }) => {
    await homePage.assertCheckNavCart();
  });

  

});