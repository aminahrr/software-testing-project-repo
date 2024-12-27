// Example: A basic example of a clean test script for login
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test('Verify User Login Functionality', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login('testuser', 'password123');
  await expect(page).toHaveURL('https://example.com/dashboard');
});
