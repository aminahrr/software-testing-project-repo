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
    footerBlog = () => this.page.getByRole('contentinfo').getByRole('link', { name: 'Blog' })// Button locator which navigates us to the blog page from the footer
    footerAboutUs = () => this.page.getByRole('contentinfo').getByRole('link', { name: 'O nama' })// Button locator which navigates us to the about us page from the footer
    footerContact = () => this.page.getByRole('contentinfo').getByRole('link', { name: 'Kontakt' })// Button locator which navigates us to the contact page from the footer
    footerShop = () => this.page.getByRole('contentinfo').getByRole('link', { name: 'Shop' })// Button locator which navigates us to the shop page from the footer
    

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
        
    // This action navigates us to the product category using the string provided with the method 
    async navigateToProductCategory(categoryName: string) {
        const category = this.categoryLink(categoryName);
    
        if (await category.isVisible()) {
            await category.click();
        } else {
            throw new Error(`Category "${categoryName}" not found.`);
        }
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
    

    // This assertion checks if the footer is visible
    public async assertCheckFooter(){
        await expect(this.footer()).toBeVisible()
    }

    // This assertion navigates us to the about us page and checks if the about us page opens
    public async assertFooterAboutUs(){
        await this.footerAboutUs().click()
        const currentUrl = this.page.url()
        await expect(currentUrl).toBe('https://pandicapet.shop/o-nama/')
    }

    // This assertion navigates us to the contact page and checks if the contact page opens
    public async assertFooterContact(){
        await this.footerContact().click()
        const currentUrl = this.page.url()
        await expect(currentUrl).toBe('https://pandicapet.shop/kontakt/')
    }

    // This assertion navigates us to the shop page and checks if the shop page opens
    public async assertFooterShop(){
        await this.footerShop().click()
        const currentUrl = this.page.url()
        await expect(currentUrl).toBe('https://pandicapet.shop/shop/')
    }

    // This assertion navigates us to the blog page and checks if the blog page opens
    public async assertFooterBlog(){
        await this.footerBlog().click()
        const currentUrl = this.page.url()
        await expect(currentUrl).toBe('https://pandicapet.shop/blog/')
    }

    }