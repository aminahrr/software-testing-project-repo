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


    // Actions

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
        
    }
    
