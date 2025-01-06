import { expect, Locator, Page } from "@playwright/test";
import { AbstractPage } from "./AbstractPage";

export class HomePage extends AbstractPage{
    

    // Instruction to which hyperlink we are pointing

    public async goto(){
        await this.page.goto('https://pandicapet.shop/')
    }

    // Locators

    signInLink = () => this.page.getByRole('link', { name: 'My Account' }) // Sign in button locator
    searchButton = () => this.page.getByRole('button', { name: 'Search' }) // Search button locator
    searchTextInput = () => this.page.getByPlaceholder('Start typing...') // Search input box locator
    searchResultButton = () => this.page.getByRole('button', { name: 'View all results' }) // Search result button locator
    searchNoResult = () => this.page.getByText('No results found') // Locator which indicates we entered an invalid search prompt
    header = () => this.page.locator("#main-header") // Header locator duh
    navBar = () => this.page.locator('#top-bar-menu') // NavBar locator duh2
    seccondNavBar = () => this.page.locator('#js-header-desktop div') // 2nd NavBar locator (why do they have 2 nav bars!?!?!?!?!?!?!?!?!?!!????)
    heroSection = () => this.page.locator('.l-inner > .elementor > section > div').first() // Hero section locator
    footer = () => this.page.locator('.l-section.c-footer.c-footer--mobile-buttons-menu') // Footer locator
    productListing = () => this.page.locator('.c-product-grid__item') // Universal locator for a product I guess
    categoryLink = (categoryName: string) => this.page.locator(`.category-link:has-text("${categoryName}")`); // Universal Category link locator
    
    categoryButton = (itemName: string) => this.page.locator(`li.c-top-menu__item span:has-text("${itemName}")`); // Universal Nav Category Locator
    subCategoryButton = (itemName: string) => this.page.locator(`//li[contains(@class, 'c-top-menu__item--has-children')]/a[contains(text(), '${itemName}')]`); // Universal Nav SubCategory Locator
    categoryCard = () => this.page.locator('#top-menu-desktop').getByRole('list') // Category Card Locator
    subCategoryItem = (categoryName, subCategoryName) => this.page.locator(`//li[contains(@class, 'c-top-menu__item--has-children') and .//span[contains(text(), '${categoryName}')]]//li[contains(@class, 'c-top-menu__subitem')]//a[contains(text(), '${subCategoryName}')]`);

    footerBlog = () => this.page.getByRole('contentinfo').getByRole('link', { name: 'Blog' })// Button locator which navigates us to the blog page from the footer
    footerAboutUs = () => this.page.getByRole('contentinfo').getByRole('link', { name: 'O nama' })// Button locator which navigates us to the about us page from the footer
    footerContact = () => this.page.getByRole('contentinfo').getByRole('link', { name: 'Kontakt' })// Button locator which navigates us to the contact page from the footer
    footerShop = () => this.page.getByRole('contentinfo').getByRole('link', { name: 'Shop' })// Button locator which navigates us to the shop page from the footer
    navWishlistButton = () => this.page.getByRole('link', { name: 'Wishlist' }) // NavBar Wishlist button locator
    navCartButton = () => this.page.getByRole('link', { name: 'Cart', exact: true }) // NavBar Cart button locator
    
    // Nav Bar button locators
    navHomepageButton = () => this.page.locator('#menu-item-4532').getByRole('link', { name: 'Početna' }) // NavBar Homepage button locator
    navShopButton = () => this.page.locator('#menu-item-4533').getByRole('link', { name: 'Shop' }) // NavBar Shop button locator
    navContactButton = () => this.page.locator('#menu-item-4645').getByRole('link', { name: 'Kontakt' }) // NavBar Contact button locator
    navAboutUsButton = () => this.page.locator('#menu-item-4646').getByRole('link', { name: 'O nama' })// NavBar About us button locator
    navBlogButton = () => this.page.locator('#menu-item-4778').getByRole('link', { name: 'Blog' })// NavBar Blog button locator
    navDogsButton = () => this.page.locator('#top-menu-desktop span').filter({ hasText: 'Psi' }) // NavBar Dogs button locator
    navCatsButton = () => this.page.locator('#top-menu-desktop').getByText('Mačke', { exact: true }) // NavBar Cats button locator
    navBirdsButton = () => this.page.locator('#top-menu-desktop span').filter({ hasText: 'Ptice' }) // NavBar Birds button locator
    navSmallAnimalsButton = () => this.page.locator('#top-menu-desktop').getByText('Male životinje', { exact: true }) // NavBar Small Animals button locator
    navAquaristicsButton = () => this.page.locator('#top-menu-desktop span').filter({ hasText: 'Akvaristika' }) // NavBar Aquaristics button locator
    navTerrariumButton = () => this.page.locator('#top-menu-desktop').getByText('Teraristika') // NavBar Terrarium button locator
    navPharmacyButton = () => this.page.locator('#top-menu-desktop').getByText('Apoteka') // NavBar Pharmacy button locator
    navMyPetButton = () => this.page.getByRole('link', { name: 'Moj ljubimac' }) // NavBar MyPet button locator
    
    // Nav Bar Subcategory specific locators
    navDogsSubButton = () => this.page.getByRole('link', { name: 'Hrana za pse ' }) // NavBar Dogs Subcateogry button locator
    navCatsSubButton = () => this.page.getByRole('link', { name: 'Hrana za mačke ' }) // NavBar Cats Subcategory button locator
    navBirdsSubButton = () => this.page.getByRole('link', { name: 'Hrana za ptice ' }) // NavBar Birds Subcategory button locator
    navSmallAnimalsSubButton = () => this.page.getByRole('link', { name: 'Hrana za male životinje ' }) // NavBar Small Animals Subcategory button locator
    navAquaristicsSubButton = () => this.page.getByRole('link', { name: 'Hrana i lijekovi za ribe ' }) // NavBar Aqua Subcategory button locator
    navTerrariumSubButton = () => this.page.getByRole('link', { name: 'Hrana za reptile ' }) // NavBar Terrarium Subcategory button locator
    navPharmacySubButton = () => this.page.getByRole('link', { name: 'Zaštita od nametnika ' }) // NavBar Pharmacy Subcategory button locator



    // Actions

    // This action clicks on the category in the nav menu provided with the string argument
    public async clickMenuItem(itemName: string) {
        try {
            const menuItem = this.categoryButton(itemName);
            await menuItem.click();
            await menuItem.hover();
        } catch (error) {
            console.error(`Error clicking on menu item '${itemName}':`, error);
        }
    }

    // This action clicks on the subcategory in the nav menu provided with the string argument
   // Click on the sub-category item
   async clickSubCategoryItem(categoryName, subCategoryName) {
    try {
        await this.clickMenuItem(categoryName);
        console.log(`Hovered on category: ${categoryName}`);

        const subCategoryItem = this.subCategoryItem(categoryName, subCategoryName);
        await subCategoryItem.waitFor({ state: 'visible' });

        await subCategoryItem.click();
        console.log(`Clicked on sub-category item: ${subCategoryName}`);
    } catch (error) {
        console.error(`Error clicking on sub-category item '${subCategoryName}':`, error);
    }
   }

    // This action click on the search button
    public async clickSearchResultButton(){
        if (await this.searchResultButton().isVisible()){
            await this.searchResultButton().click()
            }
        }

    // This action searches for any item provided with the search parameter
    public async searchItem(search: string){
        await this.searchButton().click()
        await this.searchTextInput().fill(search)
        await this.page.waitForTimeout(3000); // Waits for 3000 milliseconds (GitHub test fix)
        await this.clickSearchResultButton()
        } 
        
    


    
    

    // Assertions

    // This assertion checks if search prompt has no results
    public async assertNoSearchResults(){
        await expect(this.searchNoResult()).toBeVisible()
    }

    // This assertion checks if the elements needed on homepage
    // are visible/present
    public async assertCheckHomePageElements(){
        await expect(this.header()).toBeVisible()
        await expect(this.navBar()).toBeVisible()
        await expect(this.heroSection()).toBeVisible()
        await expect(this.footer()).toBeVisible()
        await expect(this.productListing().first()).toBeVisible() // Now just checks for at least one product
    }

    // This assertion checks if the footer is visible
    public async assertCheckFooter(){
        await expect(this.footer()).toBeVisible()
    }

    // This assertion navigates us to the about us page and checks if the about us page opens
    public async assertFooterAboutUs(){
        await this.footerAboutUs().click()
        const currentUrl = this.page.url()
        await expect(currentUrl).toBe('https://pandicapet.shop/o-nama/')
    }

    // This assertion navigates us to the contact page and checks if the contact page opens
    public async assertFooterContact(){
        await this.footerContact().click()
        const currentUrl = this.page.url()
        await expect(currentUrl).toBe('https://pandicapet.shop/kontakt/')
    }

    // This assertion navigates us to the shop page and checks if the shop page opens
    public async assertFooterShop(){
        await this.footerShop().click()
        const currentUrl = this.page.url()
        await expect(currentUrl).toBe('https://pandicapet.shop/shop/')
    }

    // This assertion navigates us to the blog page and checks if the blog page opens
    public async assertFooterBlog(){
        await this.footerBlog().click()
        const currentUrl = this.page.url()
        await expect(currentUrl).toBe('https://pandicapet.shop/blog/')
    }

    // This assertion checks if the home button in the nav bar works
    public async assertCheckNavHomepage(){
        await this.navHomepageButton().click()
        const currentUrl = this.page.url()
        await expect(currentUrl).toBe('https://pandicapet.shop/')
    }

    // This assertion checks if the shop button in the nav bar works
    public async assertCheckNavShop(){
        await this.navShopButton().click()
        const currentUrl = this.page.url()
        await expect(currentUrl).toBe('https://pandicapet.shop/shop/')
    }

    // This assertion checks if the contact button in the nav bar works
    public async assertCheckNavContact(){
        await this.navContactButton().click()
        const currentUrl = this.page.url()
        await expect(currentUrl).toBe('https://pandicapet.shop/kontakt/')
    }

    // This assertion checks if the about us button in the nav bar works
    public async assertCheckNavAboutUs(){
        await this.navAboutUsButton().click()
        const currentUrl = this.page.url()
        await expect(currentUrl).toBe('https://pandicapet.shop/o-nama/')
    }

    // This assertion checks if the blog button in the nav bar works
    public async assertCheckNavBlog(){
        await this.navBlogButton().click()
        const currentUrl = this.page.url()
        await expect(currentUrl).toBe('https://pandicapet.shop/blog/')
    }

    // This assertion checks if the dogs button in the nav bar works
    public async assertCheckNavDogs(){
        await this.navDogsButton().click()
        await this.navDogsSubButton().click()
        const currentUrl = this.page.url()
        await expect(currentUrl).toBe('https://pandicapet.shop/kategorija/hrana-za-pse/')
    }

    // This assertion checks if the cats button in the nav bar works
    public async assertCheckNavCats(){
        await this.navCatsButton().click()
        await this.navCatsSubButton().click()
        const currentUrl = this.page.url()
        await expect(currentUrl).toBe('https://pandicapet.shop/kategorija/hrana-za-macke/')
    }

    // This assertion checks if the birds button in the nav bar works
    public async assertCheckNavBirds(){
        await this.navBirdsButton().click()
        await this.navBirdsSubButton().click()
        const currentUrl = this.page.url()
        await expect(currentUrl).toBe('https://pandicapet.shop/kategorija/hrana-za-ptice/')
    }

    // This assertion checks if the small animals button in the nav bar works
    public async assertCheckNavSmallAnimals(){
        await this.navSmallAnimalsButton().click()
        await this.navSmallAnimalsSubButton().click()
        const currentUrl = this.page.url()
        await expect(currentUrl).toBe('https://pandicapet.shop/kategorija/hrana-za-male-zivotinje/')
    }

    // This assertion checks if the aquaristics button in the nav bar works
    public async assertCheckNavAquaristics(){
        await this.navAquaristicsButton().click()
        await this.navAquaristicsSubButton().click()
        const currentUrl = this.page.url()
        await expect(currentUrl).toBe('https://pandicapet.shop/kategorija/hrana-i-lijekovi-za-ribe/')
    }

    // This assertion checks if the terrarium button in the nav bar works
    public async assertCheckNavTerrarium(){
        await this.navTerrariumButton().click()
        await this.navTerrariumSubButton().click()
        const currentUrl = this.page.url()
        await expect(currentUrl).toBe('https://pandicapet.shop/kategorija/hrana-za-reptile/')
    }

    // This assertion checks if the pharmacy button in the nav bar works
    public async assertCheckNavPharmacy(){
        await this.navPharmacyButton().click()
        await this.navPharmacySubButton().click()
        const currentUrl = this.page.url()
        await expect(currentUrl).toBe('https://pandicapet.shop/kategorija/zastita-od-nametnika/')
    }

    // This assertion checks if the my pet button in the nav bar works
    public async assertCheckNavMyPet(){
        await this.navMyPetButton().click()
        const currentUrl = this.page.url()
        await expect(currentUrl).toBe('https://pandicapet.shop/kategorija/moj-ljubimac/')
    }

    // This assertion checks if the search button in the nav bar works
    public async assertCheckNavSearch(){
        await this.searchButton().click()
        await this.searchTextInput().isVisible()
    }

    // This assertion checks if the dogs button in the nav bar works
    public async assertCheckNavAccount(){
        await this.signInLink().click()
        const currentUrl = this.page.url()
        await expect(currentUrl).toBe('https://pandicapet.shop/racun/')
    }

    // This assertion checks if the wishlist button in the nav bar works
    public async assertCheckNavWishlist(){
        await this.navWishlistButton().click()
        const currentUrl = this.page.url()
        await expect(currentUrl).toBe('https://pandicapet.shop/lista-zelja/')
    }

    // This assertion checks if the cart button in the nav bar works
    public async assertCheckNavCart(){
        await this.navCartButton().click()
        const currentUrl = this.page.url()
        await expect(currentUrl).toBe('https://pandicapet.shop/korpa/')
    }
    }