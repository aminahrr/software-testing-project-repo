import { expect, Locator, Page, BrowserContext } from "@playwright/test";
import { AbstractPage } from "./AbstractPage";


export class ProductPage extends AbstractPage{
    
    // We aren't pointing to any specific hyperlink since the hyperlink is dynamic in this case

    // Locators

    productListing = () => this.page.locator('.c-product-grid__thumb').first() // This locator points on the first listing
    addToCartButton = () => this.page.locator('.ajax_add_to_cart') // Universal add to cart button locator
    addToWishlistButton = () => this.page.locator('.c-wishlist__btn-icon ')   //('.ajax_add_to_cart') 
    productTitle = () => this.page.locator('.c-product-grid__title-inner') // Universal product title locator
    productCard = (productName: string) => this.page.locator(`.product-title:has-text("${productName}")`); // Specific product card locator
    productCard2 = () => this.page.locator('.c-product-grid__item') // Universal product card locator
    cartButton = () => this.page.getByRole('link', { name: 'Cart', exact: true }) // Cart button locator
    wishlistButton = () => this.page.getByRole('link', { name: 'Wishlist' }) // Wishlist button locator
    addedToCartAlert = () => this.page.getByRole('alert') // Added to cart alert locator
    categoryTitle = () => this.page.locator('c-page-header__title') // Category title locator
    numberOfItems = () => this.page.locator('.woocommerce-result-count') // Number of items locator
    productOrdering = () => this.page.locator('.c-catalog-ordering') // Product ordering filters locator
    productFilterSidebar = () => this.page.locator('#js-shop-sidebar') // Product filter sidebar locator
    productPhoto = () => this.page.locator('.c-product-grid__thumb--cover') // Product photo locator
    productPagination = () => this.page.getByLabel('Product Pagination') // Product Pagination locator
    productName = (productName: string) => this.page.locator(`.c-product-title:has-text("${productName}")`); // Specific product name locator
    productName2 = () => this.page.locator('.c-product__title'); // Universal product name locator
    productPrice = () => this.page.locator('.woocommerce-Price-amount.amount'); // Universal product price locator
    singleProductPageStock = () => this.page.locator('.stock.in-stock'); // Product stock locator
    increaseStock = () => this.page.locator('.ip-plus'); // Add more items locator
    currentStockAdded = () => this.page.locator('.input-text.qty.text.c-product__quantity-value') // Current added stock locator

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

    // Adds a product to cart
    public async addToCartFirst() {
      await this.addToCartButton().first().click()
      await this.addedToCartAlert().waitFor({ state: 'visible' })
      await this.page.goto('https://pandicapet.shop/')
      }

    // Opens the cart page  
    public async openCart(){
      await this.cartButton().click();
    }

    // Get stock number from single product page
    async getStockNumber(): Promise<number> {
      const stockText = await this.singleProductPageStock().textContent();
     // Use the match method on the string to find digits
      const matches = stockText?.match(/\d+/); // Regular expression to find digits
      if (matches) {
          return parseInt(matches[0], 10); // Convert the first match to an integer
      } else {
          throw new Error('No stock number found.');
      }
    }

    /**
     * Increases the stock quantity by clicking the increase button based on the current stock number plus one.
     */
    async increaseStockByCurrentPlusOne(): Promise<void> {
      const currentStock = await this.getStockNumber();
      const totalClicks = currentStock + 1;

      // Retrieve the locator for the increase stock button
      const increaseButton = this.increaseStock();

      // Click the increase button the required number of times
      for (let i = 0; i < totalClicks; i++) {
          await increaseButton.click();
      }
    }


    // Adds the first product to the wishlist   
    public async addToWishlistFirst() {  

      await this.productCard2().first().hover();
      await this.page.waitForTimeout(300); 
      await this.addToWishlistButton().first().click();
      
    }

    // Opens the wishlist page
    async openWishlist() {
        await this.wishlistButton().first().click();
    }

    // This action gets the title of the category
    async getPageTitle(): Promise<string> {
      const titleLocator = this.page.locator('.c-page-header__title');
      if (await titleLocator.isVisible()) {
          const titleText = await titleLocator.textContent();
          return titleText ?? "";  // Using nullish coalescing to handle null
      }
      return "";  // Return an empty string if the title element is not visible
    }
    
    /**
     * Checks the number in the 'Showing all X results' text against an expected number.
     * @param expectedNumber The number of expected results to compare against the one in the text.
     */
    async checkResultsCount(expectedNumber: number): Promise<void> {
      const resultsText = await this.numberOfItems().textContent();

      // Check if resultsText is not null, then extract numbers
      const numberMatch = resultsText ? resultsText.match(/\d+/) : null;
      const actualNumber = numberMatch ? parseInt(numberMatch[0], 10) : 0
      expect(actualNumber).toBe(expectedNumber);
    }
    
    // Assertions

    // This assertion checks if the category we entered is correct
    public async assertCheckSubCategory(title){
      const Categorytitle = await this.getPageTitle();
      expect(Categorytitle).toContain(title);
    }

    // checks details of product
    async assertCheckProductDetails(expectedTitle: string, expectedPrice: number,expectedDescription: string): Promise<void> {
      // Get the product title text and ensure it's not null before comparing
      const actualTitleText = await this.page.locator('.c-product__title').first().textContent();
      const actualTitle = actualTitleText?.trim() ?? "";
      expect(actualTitle).toBe(expectedTitle);
  
      // Get the product price text, ensure it's not null, and extract numbers to convert to a number
      const priceTextContent = await this.page.locator('.woocommerce-Price-amount.amount').first().textContent();
      // Adjust for different locales: replace commas with periods if they are used as decimal separators
      const normalizedPriceText = priceTextContent?.replace(/[^\d,]/g, '').replace(',', '.');
      const actualPrice = parseFloat(normalizedPriceText ?? "0");
      expect(actualPrice).toBe(expectedPrice);
      //description
      await expect(this.page.locator('.entry-content')).toBeVisible();
  }

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

    // Assertion checks if the pagination is visible
    public async assertPagination(){
      await this.productPagination().isVisible();
    }

    // Assertion checks if the pagination is visible
    public async assert(){
      await this.productPagination().isVisible();
    }

    /**
     * Asserts that the displayed stock number matches the expected stock number.
     */
    async assertStockNumberMatches(): Promise<void> {
      const expectedStockNumber = await this.getStockNumber();
      const currentStockLocator = this.page.locator('.currentStockAdded'); // Adjust the locator to your actual element
      const currentStockText = await currentStockLocator.textContent();
      
    // Handle potential null value for currentStockText
    if (currentStockText === null) {
      console.error("Failed to retrieve current stock text.");
      throw new Error('Current stock text is null.');
  }

  const currentStockNumber = parseInt(currentStockText, 10);

      if (currentStockNumber !== expectedStockNumber) {
          console.error(`Stock numbers do not match: Expected ${expectedStockNumber}, but got ${currentStockNumber}`);
          throw new Error('Stock numbers do not match.');
      }
  }

}