import { expect, Locator, Page } from "@playwright/test";
import { AbstractPage } from "./AbstractPage";

export class CartPage extends AbstractPage {
  // Locators
  cartItems = () => this.page.locator('.cart-item'); // General locator for all cart items
  cartItem = (productName: string) =>
    this.page.locator(`.cart-item:has-text("${productName}")`); // Locator for specific product in the cart
  cartTotal = () => this.page.locator('.woocommerce-Price-amount.amount').last()// Locator for the total price
  productTitle = () => this.page.locator('.c-cart__shop-td--product-name')

  // Actions
  async goto() {
    await this.page.goto('https://pandicapet.shop/korpa');
  }

  // Assertions
  async assertProductInCart(productName: string) {
    const product = this.cartItem(productName);

    if (await product.isVisible()) {
      await expect(product).toBeVisible(); // product is present in the cart
    } else {
      throw new Error(`Product "${productName}" not found in the cart.`);
    }
  }

  async assertCartTotal(): Promise<void> {
    // Locators for item prices and total price
    const priceLocator: string = '.c-cart__shop-td--product-subtotal';
    const totalLocator: string = '.c-cart__totals-price--total';
  
    // Shipping cost
    const shippingCost: number = 10.00;
  
    // Extract prices from the cart
    const prices: number[] = await this.page.$$eval(priceLocator, (elements: HTMLElement[]) =>
      elements.map(el => parseFloat(el.textContent!.replace('KM', '').replace(',', '.').trim()))
    );
  
    // Calculate the expected total (subtotal + shipping)
    const expectedTotal: number = prices.reduce((sum, price) => sum + price, 0) + shippingCost;
  
    // Extract the displayed total price
    await this.page.locator(totalLocator).waitFor({ state: 'visible' });
    const displayedTotalText = await this.page.textContent(totalLocator);
    if (!displayedTotalText) {
      throw new Error('Total price element has no text content.');
    }
    const displayedTotal: number = parseFloat(displayedTotalText.replace('KM', '').replace(',', '.').trim());
  
    // Assert that the displayed total matches the expected total
    if (Math.abs(displayedTotal - expectedTotal) > 0.01) {
      throw new Error(`Total mismatch: Expected ${expectedTotal.toFixed(2)} KM, but got ${displayedTotal.toFixed(2)} KM`);
    }
  }
//NOTE : Sometimes it doesnt work, usually does
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