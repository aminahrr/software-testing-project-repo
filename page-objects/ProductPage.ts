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
    productName = (productName: string) => this.page.locator(`.c-product-title:has-text("${productName}")`); 
    productPrice = (productPrice: string) => this.page.locator();
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

    // checks details of produc
    public async assertCheckProductDetails(title){
      //title check
      const ProductTitle = await this.productName(title);
      expect(ProductTitle).toContainText(title);
      //price check
      const ProductPrice = await this.productPrice(price);
      expect(ProductTitle).toContainText(title);
      //

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

}