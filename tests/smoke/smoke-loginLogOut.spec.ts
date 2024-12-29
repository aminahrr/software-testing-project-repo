import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/LoginPage';
import { AccountPage } from '../../page-objects/AccountPage';

test('POM Login/Logout Test', async ({page}) => {
  const loginPage = new LoginPage(page);
  const accountPage = new AccountPage(page);

  await loginPage.goto(); // Goes to the homepage of the website

  // The next line enters the login credentials and proceeds
  await loginPage.signIn('omerkrtina@gmail.com', 'qDfVm!WWmjiAyB*GELZ2kQkjn!@h9Qe9eK4DJvMapGBhGswZ6')
  await page.waitForTimeout(3000); // Waits for 3000 milliseconds (GitHub test fix)
  await accountPage.assertLoggedIn(); // Checks for the WordPress Account Panel



  await accountPage.signOut(); // Loging out
  await page.waitForTimeout(3000); // Waits for 3000 milliseconds (GitHub test fix)
  await loginPage.assertLoggedOut() // Check for the WordPress Login Panel
})

