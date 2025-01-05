import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { ProductPage } from '../../page-objects/ProductPage'


test.describe('Search Item Tests', () =>{
let homePage: HomePage
let productListingPage: ProductPage


    // before each test we navigate to the homepage
    test.beforeEach(async ({page}) =>{
        homePage = new HomePage(page)
        productListingPage = new ProductPage(page)
        await homePage.goto()
    })


    // Negative test; Entering invalid prompt awaiting no results
    test('Negative Scenario', async ({page})=>{
        await homePage.searchItem('Ratkoslava Armaturevic')
        await homePage.assertNoSearchResults()
    })

    // Checks the number of items on the product page of the search term
    test('Check items in search', async ({page})=>{
        await homePage.searchItem('Cat Nip')
        await productListingPage.checkResultsCount(3)
    })




   
})