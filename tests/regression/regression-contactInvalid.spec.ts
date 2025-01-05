import { test, expect } from '@playwright/test';
import { HomePage } from '../../page-objects/HomePage';
import { ContactPage } from '../../page-objects/ContactPage';

test.describe('Contact Message - Negative Scenarios', () => {
  let homePage;
  let contactPage;

  // before the test we navigate to the homepage
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    contactPage = new ContactPage(page);
    await homePage.goto(); 
  });

  // Testing if an error message will appear when not entering anything into the name input field
  test('Negative scenario - missing name field', async ({ page }) => {
    await contactPage.sendMessage('', 'student@student.ius.edu.ba' , 'Pozdrav, ovu stranicu koristimo za testiranje u projektu za Software Testing and Maintenance predmet. Ova poruka je samo za testiranje kontakt stranice. Izvinjavam se na smetnji.'); // Attempt login with missing name
    await contactPage.assertMissingField(); // Assert a missing field error message
  });

  // Testing if an error message will appear when not entering anything into the email input field
  test('Negative scenario - missing email field', async ({ page }) => {
    await contactPage.sendMessage('IUS Student', '' , 'Pozdrav, ovu stranicu koristimo za testiranje u projektu za Software Testing and Maintenance predmet. Ova poruka je samo za testiranje kontakt stranice. Izvinjavam se na smetnji.'); // Attempt login with missing email
    await contactPage.assertMissingField(); // Assert a missing field error message
  });

  // This test is excluded since the website is not configured correctly
  // The web developer didn't set the message input field as a required field hence the test will always fail...
  
  // test('Negative scenario - missing message field', async ({ page }) => {
  //   await contactPage.sendMessage('IUS Student', 'student@student.ius.edu.ba' , ''); // Attempt login with missing message
  //   await contactPage.assertMissingField(); // Assert a missing field error message
  // });

});