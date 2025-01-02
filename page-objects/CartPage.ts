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
    await this.page.goto('https://pandicapet.shop/korpa'); // Update with the actual cart URL
  }

  // Assertions
  async assertProductInCart(productName: string) {
    const product = this.cartItem(productName);

    if (await product.isVisible()) {
      await expect(product).toBeVisible(); // Ensures the product is present in the cart
    } else {
      throw new Error(`Product "${productName}" not found in the cart.`);
    }
  }

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

  /*async assertCartTotalCorrect() {
    const total = await this.cartTotal().textContent();

    // Check if the total is not null or undefined
    if (total) {
      // Convert the total to a number and validate it's greater than 0
      const numericTotal = Number(total.replace(/[^\d.]/g, ''));
      expect(numericTotal).toBeGreaterThan(0);
    } else {
      throw new Error('Cart total is missing or invalid.');
    }
  }*/

    async assertCartTotalCorrect(): Promise<void> {
        const total = await this.cartTotal().textContent();
      
        // Locators for product prices in the cart
        const productPricesLocators = this.page.locator('.woocommerce-cart-form .cart_item .woocommerce-Price-amount.amount');
      
        // Extract the prices of the products in the cart
        const productPricesText = await productPricesLocators.allTextContents();
      
        if (productPricesText && total) {
          // Convert product prices and total to numeric values
          const productPrices = productPricesText.map(priceText => {
            // Remove non-numeric characters, including currency symbols, and parse to number
            const cleanedPrice = priceText.replace(/[^\d.]/g, ''); // Keep only digits and the decimal point
            return parseFloat(cleanedPrice);
          });
      
          // If product prices are not correctly parsed, throw an error
          if (productPrices.includes(NaN)) {
            throw new Error('One or more product prices are invalid or cannot be parsed.');
          }
      
          const numericTotal = parseFloat(total.replace(/[^\d.]/g, ''));
      
          // Calculate the expected total (sum of all product prices + 10)
          const expectedTotal = productPrices.reduce((sum, price) => sum + price, 0)/2 + 10;
      
          // Assert that the displayed total matches the expected total
          expect(numericTotal).toBeCloseTo(expectedTotal, 2); // Allow minor rounding differences
        } else {
          throw new Error('One or more price elements or the total element is missing or invalid.');
        }
      }
      
      
      
}
