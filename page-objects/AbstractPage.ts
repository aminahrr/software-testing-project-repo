import { Page } from "@playwright/test"

// We use AbstractPage.js to save time and code space so we don't need
// to repeat the same construction all the time rather just extend the class

export class AbstractPage{
    readonly page: Page

    constructor(page: Page){
        this.page = page
    }

    async wait(time){
        await this.page.waitForTimeout(time)
    }
}