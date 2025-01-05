import { test, expect } from '@playwright/test';
import { HomePage } from '../../page-objects/HomePage';


test.describe('Footer tests', () => {
  let homePage;
  

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto(); // Navigate to the homepage
  });

  //This test checks if the footer is visible from the homepage
  test('Footer is visible', async ({ page }) => {
    await homePage.assertCheckFooter()
  });

  // This test checks if we can access the blog page from the footer
  test('Footer Blog Page Access', async ({ page }) => {
    await homePage.assertFooterBlog()
  });

  // This test checks if we can access the about us page from the footer
  test('Footer About Us Page Access', async ({ page }) => {
    await homePage.assertFooterAboutUs()
  });

  // This test checks if we can access the contact page from the footer
  test('Footer Contact Page Access', async ({ page }) => {
    await homePage.assertFooterContact()
  });

  // This test checks if we can access the shop page from the footer
  test('Footer Shop Page Access', async ({ page }) => {
    await homePage.assertFooterShop()
  });

});
