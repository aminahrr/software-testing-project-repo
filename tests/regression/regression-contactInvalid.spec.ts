import { test, expect } from '@playwright/test';
import { HomePage } from '../../page-objects/HomePage';
import { ContactPage } from '../../page-objects/ContactPage';

test.describe('Contact Message - Negative Scenarios', () => {
  let homePage;
  let contactPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    contactPage = new ContactPage(page);
    await homePage.goto(); // Navigate to the homepage
  });

  /*test('Positive scenario - All Valid Inputs', async ({ page }) => {
    await loginPage.signIn('IUS Student', 'student@student.ius.edu.ba' , 'Pozdrav, ovu stranicu koristimo za testiranje u projektu za Software Testing and Maintenance predmet. Ova poruka je samo za testiranje kontakt stranice. Izvinjavam se na smetnji.'); ); // Attempt login with incorrect credentials
    await loginPage.assertValidationMessage(); // Assert an error message is shown
  });*/
  test('Negative scenario - missing name field', async ({ page }) => {
    await contactPage.sendMessage('', 'student@student.ius.edu.ba' , 'Pozdrav, ovu stranicu koristimo za testiranje u projektu za Software Testing and Maintenance predmet. Ova poruka je samo za testiranje kontakt stranice. Izvinjavam se na smetnji.'); // Attempt login with missing name
    await contactPage.assertMissingField(); // Assert a missing field error message
  });

  //TEST FAILS BUT ITS NOT MY FAULT I SWEAR 
  test('Negative scenario - missing message field', async ({ page }) => {
    await contactPage.sendMessage('IUS Student', 'student@student.ius.edu.ba' , ''); // Attempt login with missing message
    await contactPage.assertMissingField(); // Assert a missing field error message
  });

  test('Negative scenario - missing email field', async ({ page }) => {
    await contactPage.sendMessage('IUS Student', '' , 'Pozdrav, ovu stranicu koristimo za testiranje u projektu za Software Testing and Maintenance predmet. Ova poruka je samo za testiranje kontakt stranice. Izvinjavam se na smetnji.'); // Attempt login with missing email
    await contactPage.assertMissingField(); // Assert a missing field error message
  });


});