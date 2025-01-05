import { test, expect } from '@playwright/test';
import { HomePage } from '../../page-objects/HomePage';

test.describe('Homepage Test', () => {
  let homePage;
  
   // before the test we navigate to the homepage
    test.beforeEach(async ({page}) => {
      homePage = new HomePage(page);
      await homePage.goto();
    }) 

  // We are testing if all homepage elements are present
  test('Testing Homepage Elements', async ({page}) => {

    await homePage.assertCheckHomePageElements()
    
  }) 
})