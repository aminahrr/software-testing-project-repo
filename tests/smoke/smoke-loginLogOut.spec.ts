import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/LoginPage';
import { AccountPage } from '../../page-objects/AccountPage';

test('test', async ({ page }) => {
  await page.goto('https://pandicapet.shop/');
  await page.getByRole('link', { name: 'My Account' }).click();
  await page.getByLabel('Korisničko ime ili email').click();
  await page.getByLabel('Korisničko ime ili email').fill('omerkrtina@gmail.com');
  await page.getByLabel('Šifra *').click();
  await page.getByLabel('Šifra *').fill('qDfVm!WWmjiAyB*GELZ2kQkjn!@h9Qe9eK4DJvMapGBhGswZ6');
  await page.getByRole('button', { name: 'Prijava' }).click();
});


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

