import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://pandicapet.shop/');
  await page.getByRole('link', { name: 'My Account' }).click();
  await page.getByLabel('Korisničko ime ili email').click();
  await page.getByLabel('Korisničko ime ili email').fill('omerkrtina@gmail.com');
  await page.getByLabel('Šifra *').click();
  await page.getByLabel('Šifra *').fill('qDfVm!WWmjiAyB*GELZ2kQkjn!@h9Qe9eK4DJvMapGBhGswZ6');
  await page.getByRole('button', { name: 'Prijava' }).click();
});