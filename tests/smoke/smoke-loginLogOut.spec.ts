import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/LoginPage';
import { AccountPage } from '../../page-objects/AccountPage';

test('POM Login/Logout Test', async ({page}) => {
  const loginPage = new LoginPage(page);
  const accountPage = new AccountPage(page);

  await loginPage.goto();

  await loginPage.signIn('omerkrtina@gmail.com', 'qDfVm!WWmjiAyB*GELZ2kQkjn!@h9Qe9eK4DJvMapGBhGswZ6')
  await accountPage.assertLoggedIn();

  await accountPage.signOut();
  await loginPage.assertLoggedOut()
})

