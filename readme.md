# Magneto Lumea E-Commerce Platform Testing Project

## Overview
This repository contains automated tests for the Magneto Lumea e-commerce platform implemented as part of the SE302 Software Testing and Maintenance course. The tests are written in TypeScript using Playwright.

## Prerequisites
- Node.js installed on your machine
- npm (Node Package Manager)

## Setup
1. Clone the repository to your local machine.
   ```bash
   git clone https://github.com/your-username/QA-Project.git
   cd QA-Project

2. Initialize the project with npm.
    ```bash
    npm init

3. Install Playwright.
     ```bash
     npm install @playwright/test
     npx playwright install

## Running Tests

### Run All Tests 
    
    
    npx playwright test 

### Run All Tests (Headed Mode)
    
    
    npx playwright test --headed
    
### Run All Tests (Headed Mode)
   
    
    npx playwright test --browser=YourBrowserOfChoice
    
### Run Smoke Tests Only
   
    
    npm run tests:smoke
    
    
### Run Regression Tests Only
    
    
    npm run tests:regression
    

## Test Scenarios

### Smoke Tests
    Checkout
    Registration
    Home Page
    Log in/Log out
    Search

### Regression Tests
    Advanced Search
    Category
    Invalid Checkout
    Invalid Create Account
    Invalid Login
    Footer
    NavBar
    Orders and Returns
    Promo Banners
    Search Items

## Thank you

A heartfelt thank you to the teaching assistants who will be dedicating their time and expertise to evaluate this project. Your guidance and feedback are invaluable, and we appreciate the effort you put into helping us grow as students. 🙌

Thank you for your commitment to our learning journey!