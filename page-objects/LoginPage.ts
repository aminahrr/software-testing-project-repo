import { expect, Locator, Page } from "@playwright/test";
import { AbstractPage } from "./AbstractPage";

export class LoginPage extends AbstractPage{
    
    

    // Locators

    signInLink = () => this.page.getByRole('link', { name: 'My Account' })
    loginPanel = () => this.page.locator('#customer_login')
    emailInputBox = () => this.page.getByLabel('Korisničko ime ili email')
    passwordInputBox = () => this.page.getByLabel('Šifra')
    loginButton = () => this.page.getByRole('button', { name: 'Prijava'})
  
    // Actions

    // This action will allow us to call it withing the test and provide any
    // necessary parameters for the test i.e. email & password
    public async signIn(email: string, password: string){
        await this.signInLink().click()
        await this.emailInputBox().fill(email)
        await this.passwordInputBox().fill(password)
        await this.loginButton().click()
    }

    // Assertions

    // This assertion is checking if we are logged in by checking if the
    // WordPress login pannel is visible
    public async assertLoggedOut(){
        await expect(this.loginPanel()).toBeVisible()
    }

}