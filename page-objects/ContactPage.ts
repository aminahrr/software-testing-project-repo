import { expect, Locator, Page } from "@playwright/test";
import { AbstractPage } from "./AbstractPage";

export class ContactPage extends AbstractPage {
  // Locators
  //productTitle = () => this.page.locator('.c-wishlist__shop-td--product-name')
  contactLink = () => this.page.locator('#menu-item-4645').getByRole('link', { name: 'Kontakt' })
  //loginPanel = () => this.page.locator('#customer_login')
  nameInputBox = () => this.page.getByLabel('Ime i prezime')//getByLabel('Šifra')
  emailInputBox = () => this.page.getByLabel('Email adresa')    //getByLabel('Korisničko ime ili email')
  messageInputBox = () => this.page.getByLabel('Poruka')
  sendButton = () => this.page.getByRole('button', { name: 'Pošaljite' })//getByRole('button', { name: 'Prijava'})
  missingField = () => this.page.getByLabel('Kontakt obrazac').getByText('One or more fields have an')// Missing Field locator
  validCredentialsMessage = () => this.page.getByLabel('Kontakt obrazac').getByText('Thank you for your message.')// Missing Field locator
  //invalidCredentialsMessage = () => this.page.getByText('Greška: Šifra koju ste') // Missing Field locator
  // Actions
  async goto() {
    await this.page.goto('https://pandicapet.shop/kontakt');
  }

  // This action will allow us to call it withing the test and provide any
  // necessary parameters for the test i.e. email & password
  public async sendMessage(name: string, email: string, message: string){
      await this.contactLink().click()
      await this.nameInputBox().fill(name)
      await this.emailInputBox().fill(email)
      await this.messageInputBox().fill(message)
      await this.sendButton().click()
  }

  // Assertions

  // This assertion is checking if we are logged in by checking if the
  // WordPress login pannel is visible
  /*public async assertMessageSent(){
      await expect(this.nestStoSePojaviKadMessageSent).toBeVisible()
  }*/

  public async assertMissingField(){
      await expect(this.missingField()).toBeVisible()
    }
  

  public async assertErrorMessage(){
      //await expect(this.invalidCredentialsMessage()).toBeVisible()
  }
  public async assertValidationMessage(){
    await expect(this.validCredentialsMessage()).toBeVisible()
}

}