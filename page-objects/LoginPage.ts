import { expect, Locator, Page } from "@playwright/test";
import { AbstractPage } from "./AbstractPage";

export class LoginPage extends AbstractPage{
    
    // Instruction to which hyperlink we are pointing

    public async goto(){
        await this.page.goto('https://pandicapet.shop/racun/')
    }

    // Locators

    loginPanel = () => this.page.locator('#customer_login')
    emailInputBox = () => this.page.getByLabel('Korisničko ime ili email')
    passwordInputBox = () => this.page.getByLabel('Šifra')
    loginButton = () => this.page.getByRole('button', { name: 'Prijava'})
  
    // Actions

    public async clickEmailInputBox(){
        await this.emailInputBox().click()
    }
    public async clickPasswordInputBox(){
        await this.passwordInputBox().click()
    }
    public async clickLoginButton(){
        await this.loginButton().click()
    }

}