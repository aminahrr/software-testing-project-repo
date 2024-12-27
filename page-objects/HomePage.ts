import { expect, Locator, Page } from "@playwright/test";
import { AbstractPage } from "./AbstractPage";

export class HomePage extends AbstractPage{


    readonly menu: Locator
    readonly url: string


    constructor(page: Page) {
        super(page)
        this.menu = page.locator('div[id="store.menu"]')
        this.url = 'https://pandicapet.shop/'
    }


    public async navigateToHomePage() {
        await this.page.goto(this.url)
    }
}