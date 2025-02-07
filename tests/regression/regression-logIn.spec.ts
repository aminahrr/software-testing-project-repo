import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/LoginPage';
import { HomePage } from '../../page-objects/HomePage';

test.describe('Login Regression - Negative Scenarios', () => {
  let homePage;
  let loginPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    await homePage.goto(); // Navigate to the homepage
  });

  test('Negative scenario - incorrect credentials', async ({ page }) => {
    await loginPage.signIn('kurzenis@gmail.com', 'pass'); // Attempt login with incorrect credentials
    await loginPage.assertErrorMessage(); // Assert an error message is shown
  });

  test('Negative scenario - missing password field', async ({ page }) => {
    await loginPage.signIn('kurzenis@gmail.com', ''); // Attempt login with missing password
    await loginPage.assertMissingPasswordField(); // Assert a missing field error message
  });

});
