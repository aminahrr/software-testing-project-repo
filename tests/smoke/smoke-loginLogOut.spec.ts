import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/LoginPage';
import { AccountPage } from '../../page-objects/AccountPage';
import { HomePage } from '../../page-objects/HomePage';

test('POM Login/Logout Test', async ({page}) => {
  const loginPage = new LoginPage(page);
  const accountPage = new AccountPage(page);
  const homePage = new HomePage(page);

  await homePage.goto(); // Goes to the homepage of the website

  // Login test
  await loginPage.signIn('omerkrtina@gmail.com', 'qDfVm!WWmjiAyB*GELZ2kQkjn!@h9Qe9eK4DJvMapGBhGswZ6') // Entering the login credentials and proceeds
  await page.waitForTimeout(3000); // Waits for 3000 milliseconds (GitHub test fix)
  await accountPage.assertLoggedIn(); // Checks for the WordPress Account Panel


  // Logout test
  await accountPage.signOut(); // Loging out
  await page.waitForTimeout(3000); // Waits for 3000 milliseconds (GitHub test fix)
  await loginPage.assertLoggedOut() // Check for the WordPress Login Panel
})

