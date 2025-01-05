import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { ProductPage } from '../../page-objects/ProductPage'


test.describe('Categories Field Test', () =>{
    let homePage: HomePage
    let productPage: ProductPage

        // before the test we navigate to the homepage
        test.beforeEach(async ({page}) =>{
            homePage = new HomePage(page)
            productPage = new ProductPage(page)
            await homePage.goto()
        })
    

        // This test checks if the filter functionality works
         test('sub category filter test', async ({page})=>{

            await homePage.clickSubCategoryItem('Psi', 'Hrana za pse') // Opens the subcategory
            await productPage.assertCheckSubCategory('Hrana za pse') // Checks if we are in the correct subcategory
            await page.getByText('Bioiberica, S.A 4').click() // Clicks on filter
            await productPage.checkResultsCount(4) // Check the number of items on the page
            
            
         })

    })