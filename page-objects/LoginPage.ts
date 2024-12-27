import { expect, Locator, Page } from "@playwright/test";
import { AbstractPage } from "./AbstractPage";

export class LoginPage extends AbstractPage{
    readonly page: Page
    readonly signInLink: Locator
    readonly emailInput: Locator
    readonly passwordInput: Locator
    readonly signInButton: Locator
    readonly errorMessage: Locator
    readonly succesMessage: Locator
    readonly dropDownMenu: Locator
    readonly logOutDrop: Locator
    readonly missingPass: Locator
    readonly invalidData: Locator


    constructor(page: Page){
        super(page)
        this.signInLink = page.locator('[href*="https://pandicapet.shop/racun/"]').first()
        this.emailInput = page.locator('#email')
        this.passwordInput = page.locator('input[id="pass"]').first()
        this.signInButton = page.locator('#send2').first()
        this.errorMessage = page.locator('.message-error')
        this.succesMessage = page.locator('.greet.welcome .logged-in').first()
        this.dropDownMenu = page.locator('.action.switch').first()
        this.logOutDrop = page.locator('.authorization-link').first()
        this.missingPass = page.locator('#pass-error').first()
        this.invalidData = page.locator('mage-error')

        
    }

}
