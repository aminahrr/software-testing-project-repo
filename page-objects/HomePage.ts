import { expect, Locator, Page } from "@playwright/test";
import { AbstractPage } from "./AbstractPage";

export class HomePage extends AbstractPage{

    // Instruction to which hyperlink we are pointing

    public async goto(){
        await this.page.goto('https://pandicapet.shop/')
    }

    // Locators

    signInLink = () => this.page.getByRole('link', { name: 'My Account' }) // Sign in button locator
    searchButton = () => this.page.getByRole('button', { name: 'Search' }) // Search button locator
    searchTextInput = () => this.page.getByPlaceholder('Start typing...') // Search input box locator
    searchResultButton = () => this.page.getByRole('button', { name: 'View all results' }) // Search result button locator
    header = () => this.page.locator("#main-header") // Header locator duh
    navBar = () => this.page.locator('#top-bar-menu') // NavBar locator duh2
    heroSection = () => this.page.locator('.l-inner > .elementor > section > div').first() // Hero section locator
    footer = () => this.page.locator('.l-section.c-footer.c-footer--mobile-buttons-menu') // Footer locator
    productListing = () => this.page.locator('.c-product-grid__item') // Universal locator for a product I guess
    categoryLink = (categoryName: string) => this.page.locator(`.category-link:has-text("${categoryName}")`);
    

    // Actions

    // This action click on the search button, if none is present it throws an error
    // Used for further actions
    async clickSearchResultButton(){

        const searchButton: Locator = this.searchResultButton();

        if (await searchButton.isVisible()){
            await this.searchResultButton().click()
        } else {
             // Throw an error if the search result button is not visible
             throw new Error("Such item is not available.");
        }
    }

    // This action searches for any item provided with the search parameter
    public async searchItem(search: string){
        await this.searchButton().click()
        await this.searchTextInput().fill(search)
        await this.page.waitForTimeout(3000); // Waits for 3000 milliseconds (GitHub test fix)
        await this.clickSearchResultButton()
        } 
        

    // Assertions

    // This assertion checks if the elements needed on homepage
    // are visible/present
    public async assertCheckHomePageElements(){
        await expect(this.header()).toBeVisible()
        await expect(this.navBar()).toBeVisible()
        await expect(this.heroSection()).toBeVisible()
        await expect(this.footer()).toBeVisible()
        await expect(this.productListing().first()).toBeVisible() // Now just checks for at least one product
    }
    async navigateToProductCategory(categoryName: string) {
        const category = this.categoryLink(categoryName);
    
        if (await category.isVisible()) {
          await category.click();
        } else {
          throw new Error(`Category "${categoryName}" not found.`);
        }
      }

    }

    
    
