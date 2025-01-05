import { expect, Locator, Page } from "@playwright/test";
import { AbstractPage } from "./AbstractPage";

export class WishlistPage extends AbstractPage {
  // Locators
  productTitle = () => this.page.locator('.c-wishlist__shop-td--product-name')

  // Actions
  async goto() {
    await this.page.goto('https://pandicapet.shop/lista-zelja'); 
  }

  // Assertions

  async assertProductTitleContainsWords(search: string) {
    const titleElements = this.productTitle();
    await titleElements.first().waitFor({ state: 'visible' }); // Ensure elements are visible

    const searchWords = search.split(' ');
    let containsWord = false;

    // Get texts from all title elements
    const titlesText = await titleElements.allTextContents();

    // Check each title for any of the search words
    for (const titleText of titlesText) {
        for (const word of searchWords) {
            if (titleText.toLowerCase().includes(word.toLowerCase())) {
                containsWord = true;
                break;
            }
        }
        if (containsWord) {
            break; // Stop checking if we found a match
        }
    }

    if (!containsWord) {
        throw new Error(`None of the search words found in any product title. Titles checked were: ${titlesText.join(', ')}`);
    }
    }   

}