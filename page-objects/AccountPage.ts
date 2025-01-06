import { expect, Locator, Page } from "@playwright/test";
import { AbstractPage } from "./AbstractPage";

export class AccountPage extends AbstractPage{
    
    // Instruction to which hyperlink we are pointing

    public async goto(){
        await this.page.goto('https://pandicapet.shop/racun/')
    }
        
    // Locators

    accountPanel = () => this.page.locator('.c-account__col-content') 
    logOutButton = () => this.page.getByRole('link', { name: ' Log out' })
  
    // Actions
    
    public async signOut(){
        await this.logOutButton().click()
    }

    // Assertions


    // This assertion is checking if we are logged in by checking if the
    // WordPress account pannel is visible
    public async assertLoggedIn() {
        // Wait for the element to be present
        await this.page.waitForSelector('.c-account__col-content', { timeout: 10000 });
    
        // Assert visibility
        await expect(this.accountPanel()).toBeVisible();
    }

}