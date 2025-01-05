import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/LoginPage';
import { AccountPage } from '../../page-objects/AccountPage';
import { HomePage } from '../../page-objects/HomePage';


test.describe('Login & Logout Test', () => {
  let homePage;
  let accountPage;
  let loginPage;
  
  // before the test we navigate to the homepage
  test.beforeEach(async ({page}) => {
    homePage = new HomePage(page);
    accountPage = new AccountPage(page);
    loginPage = new LoginPage(page);
    await homePage.goto();
  }) 

  // Testing the Login functionality
  test('Login Test', async ({page}) => {

  await loginPage.signIn('omerkrtina@gmail.com', 'qDfVm!WWmjiAyB*GELZ2kQkjn!@h9Qe9eK4DJvMapGBhGswZ6') // Entering the login credentials and proceeds
  await accountPage.assertLoggedIn(); // Checks for the WordPress Account Panel

  }) 

  // Testing the Logout functionality
  test('Logout test', async ({page}) => {

    // Login prerequisite
    await loginPage.signIn('omerkrtina@gmail.com', 'qDfVm!WWmjiAyB*GELZ2kQkjn!@h9Qe9eK4DJvMapGBhGswZ6') // Entering the login credentials and proceeds

    // Logout test
    await accountPage.signOut(); // Loging out
    await loginPage.assertLoggedOut() // Check for the WordPress Login Panel

  }) 

})