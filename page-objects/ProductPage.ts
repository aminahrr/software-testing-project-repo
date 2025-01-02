import { expect, Locator, Page } from "@playwright/test";
import { AbstractPage } from "./AbstractPage";

export class ProductPage extends AbstractPage{
    
    // We aren't pointing to any specific hyperlink since the hyperlink is dynamic in this case

    // Locators

    productListing = () => this.page.locator('.c-product-grid__thumb').first() // This locator points on the first listing
    addToCartButton = () => this.page.locator('.ajax_add_to_cart') // Universal add to cart button locator
    productTitle = () => this.page.locator('.c-product-grid__title-inner') // Universal product title locator
    productCard = (productName: string) => this.page.locator(`.product-title:has-text("${productName}")`);
    cartButton = () => this.page.getByRole('link', { name: 'Cart', exact: true })

    //addToCartButton = () => this.page.getByRole('button', { name: 'Add to cart' });
    // Actions 

      // Selects a product by name
  async selectProduct(productName: string) {
    const product = this.productCard(productName);

    if (await product.isVisible()) {
      await product.click();
    } else {
      throw new Error(`Product "${productName}" not found.`);
    }
  }

    // Adds the product to the cart
    async addToCart() {
        const addToCartButton = this.addToCartButton();
    
        if (await addToCartButton.isVisible()) {
          await addToCartButton.click();
        } else {
          throw new Error("Add to cart button is not visible.");
        }
      }

      async addToCartFirst() {
        const addToCartButton = this.addToCartButton().first();
    
        if (await addToCartButton.isVisible()) {
          await addToCartButton.click();
        } else {
          throw new Error("Add to cart button is not visible.");
        }
      }

      async openCart() {
        const cartButton = this.cartButton().first();
          await cartButton.click();
      }
      
    



    // Assertions

    // This assertion check for the search parameter from HomePage.ts inside of the product title 
    async assertProductTitleContainsWords(search: string) {
        const titleElements = this.productTitle();
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