import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/LoginPage';
import { AccountPage } from '../../page-objects/AccountPage';

test('POM Login Test', async ({page}) => {
  const loginPage = new LoginPage(page);
  const accountPage = new AccountPage(page);

  await loginPage.goto();
  await loginPage.clickEmailInputBox();
  await loginPage.emailInputBox().fill('omerkrtina@gmail.com');
  await loginPage.clickPasswordInputBox();
  await loginPage.passwordInputBox().fill('qDfVm!WWmjiAyB*GELZ2kQkjn!@h9Qe9eK4DJvMapGBhGswZ6');
  await loginPage.clickLoginButton();

  await accountPage.assertLoggedIn();
})

test('POM Logout Test', async ({page}) => {
  const loginPage = new LoginPage(page);
  const accountPage = new AccountPage(page);

  await loginPage.goto();
  await loginPage.clickEmailInputBox();
  await loginPage.emailInputBox().fill('omerkrtina@gmail.com');
  await loginPage.clickPasswordInputBox();
  await loginPage.passwordInputBox().fill('qDfVm!WWmjiAyB*GELZ2kQkjn!@h9Qe9eK4DJvMapGBhGswZ6');
  await loginPage.clickLoginButton();

  await accountPage.assertLoggedIn();
})