const { When, Before, After } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const {generateRandomString} = require('../../TestData/generator.js')


Before({ timeout: 60000 }, async function() {

  this.browser = null;
 
  try {
    this.browser = await chromium.connectOverCDP('http://localhost:9222');
    
  } catch (error) {
    throw new Error('Chrome with remote debugging not available');
  }
});

async function handlePageTransition(context, currentPage, triggerAction, timeout = 10000) {
  const [newPage] = await Promise.all([
    context.waitForEvent('page', { timeout }).catch(() => null),
    triggerAction()
  ]);
  return newPage || currentPage;
}
When('I open Xverse extension and navigate to Ducat Protocol app', async function() {
    try {
      console.log('Opening Xverse extension and creating wallet...');
      
      const context = this.browser.contexts()[0];
      
     
      const extensionUrl = 'chrome-extension://idnnbdplmphpflfnlkomgpfbpcgelopg/popup.html';
      
     
      const extensionPage = await context.newPage();
      await extensionPage.goto(extensionUrl);
      
    
      await extensionPage.waitForLoadState('networkidle');
      
    
     
      try {
        const forgetButtonVisible = await extensionPage.waitForSelector('xpath=//*[contains(text(), "Forgot your password?")]', {
            state: 'visible',
            timeout: 5000
          }).then(() => true).catch(() => false);
          
          if (forgetButtonVisible) {
            console.log("Forgot password link found, clicking it");
            await extensionPage.click('xpath=//*[contains(text(), "Forgot your password?")]');
            await extensionPage.click('#backed-up-seedphrase-checkbox');
            await extensionPage.click('xpath=//*[contains(text(), "Reset")]');
            await extensionPage.click('text="Create a new wallet"');
            const firstAcceptButtonVisible = await extensionPage.waitForSelector('xpath=//*[contains(text(), "Accept")]', { 
                state: 'visible', 
                timeout: 5000  
              }).then(() => true).catch(() => false);
              
              if (firstAcceptButtonVisible) {
                await extensionPage.click('xpath=//*[contains(text(), "Accept")]');
               }
            await extensionPage.click('xpath=//*[contains(text(), "Backup later")]'); 
            await extensionPage.fill('input[type="password"]', 'C4mb14m3$_C');
            await extensionPage.fill('#confirm-password-input', 'C4mb14m3$_C');
            await extensionPage.click('text="Continue"');
          }
          else{
            await extensionPage.click('text="Create a new wallet"');
            await extensionPage.click('xpath=//*[contains(text(), "Accept")]');
            await extensionPage.click('xpath=//*[contains(text(), "Backup later")]'); 
            await extensionPage.fill('input[type="password"]', 'C4mb14m3$_C');
            await extensionPage.fill('#confirm-password-input', 'C4mb14m3$_C');
            await extensionPage.click('text="Continue"');
          }        
          const acceptButtonVisible = await extensionPage.waitForSelector('xpath=//*[contains(text(), "Accept")]', { 
          state: 'visible', 
          timeout: 5000  
        }).then(() => true).catch(() => false);
        
        if (acceptButtonVisible) {
          console.log("Accept button found, clicking it");
          await extensionPage.click('xpath=//*[contains(text(), "Accept")]');
          await extensionPage.fill('input[type="password"]', 'C4mb14m3$_C');
          await extensionPage.fill('#confirm-password-input', 'C4mb14m3$_C');
          await extensionPage.click('text="Continue"');
        } else {
          console.log("Accept button not found, continuing to next step");
          await extensionPage.click('xpath=//*[contains(text(), "Accept")]');
     await extensionPage.click('xpath=//*[contains(text(), "Backup later")]'); 
      await extensionPage.fill('input[type="password"]', 'C4mb14m3$_C');
      await extensionPage.fill('#confirm-password-input', 'C4mb14m3$_C');
      await extensionPage.click('text="Continue"');
        }
      } catch (error) {
        console.log("Error checking for Accept button, continuing anyway:", error.message);
      }
     
      
   
      console.log('Starting test with existing Chrome and Xverse...');
      
 
      let pages = context.pages();
      this.page = pages[0];
      
      if (!this.page || this.page === extensionPage) {
        console.log('Creating new page in existing context');
        this.page = await context.newPage();
      }
      
      await this.page.goto('https://ducatprotocol.com');
      await this.page.waitForTimeout(5000);
  
   
      try {
        await this.page.waitForSelector('input#__framer-cookie-component-button-accept', {
          state: 'visible',
          timeout: 1000
        });
        await this.page.click('input#__framer-cookie-component-button-accept');
      } catch {
        console.log('No cookie banner found or already accepted');
      }
  
   
      const originalPage = this.page;
      await this.page.waitForSelector('xpath=(//*[contains(text(), "Launch App")])[1]', { 
        state: 'visible', 
        timeout: 1000 
      });
      
      const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        this.page.click('xpath=(//*[contains(text(), "Launch App")])[1]')
      ]);
      this.page = newPage;
      await originalPage.close();
  
      await this.page.waitForLoadState('domcontentloaded');
      await this.page.waitForLoadState('networkidle');
      
      await this.page.waitForSelector('span:has-text("Connect Wallet")', {
        state: 'visible',
        timeout: 30000
      });
      await this.page.click('span:has-text("Connect Wallet")');
      
      await this.page.waitForSelector('div.flex.flex-col.gap-4.lg\\:gap-8.text-white', {
        state: 'visible',
        timeout: 10000
      });
      
   
      const walletPage = await handlePageTransition(
        context, 
        this.page, 
        async () => await this.page.click('xpath=//div[@class="flex flex-col gap-4 lg:gap-8 text-white"]/div[1]'),
        30000
      );
      
      if (walletPage) {
        await walletPage.screenshot({ path: `wallet-page-${Date.now()}.png` });
        await walletPage.click('xpath=//*[contains(text(), "Accept")]');
      } else {
        console.error('Failed to capture the wallet page');
      }
      const extensionUrl2 = 'chrome-extension://idnnbdplmphpflfnlkomgpfbpcgelopg/popup.html';
      
      try {
        
        const extensionPage = await context.newPage();
        await extensionPage.goto(extensionUrl2);
       
        await extensionPage.waitForLoadState('networkidle');
        console.log('Xverse extension reopened successfully');
        await extensionPage.click('button[data-testid="nav-settings"]');
        await extensionPage.click('xpath=//*[contains(text(), "Network")]');
        await extensionPage.click('xpath=//*[contains(text(), "Signet")]');
        await extensionPage.fill('input[data-testid="BTC URL"]', 'https://mutinynet.com/api');

        await extensionPage.click('xpath=//*[contains(text(), "Save")]');
        await this.page.goto('https://ducatprotocol.com');
        await this.page.waitForTimeout(5000);
    
       
        try {
          await this.page.waitForSelector('input#__framer-cookie-component-button-accept', {
            state: 'visible',
            timeout: 1000
          });
          await this.page.click('input#__framer-cookie-component-button-accept');
        } catch {
          console.log('No cookie banner found or already accepted');
        }
    
     
        const originalPage = this.page;
        await this.page.waitForSelector('xpath=(//*[contains(text(), "Launch App")])[1]', { 
          state: 'visible', 
          timeout: 1000 
        });
        
        const [newPage] = await Promise.all([
          context.waitForEvent('page'),
          this.page.click('xpath=(//*[contains(text(), "Launch App")])[1]')
        ]);
        this.page = newPage;
        await originalPage.close();
    
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForLoadState('networkidle');
        
  
        await this.page.waitForSelector('span:has-text("Connect Wallet")', {
          state: 'visible',
          timeout: 30000
        });
        await this.page.click('span:has-text("Connect Wallet")');
        
        await this.page.waitForSelector('div.flex.flex-col.gap-4.lg\\:gap-8.text-white', {
          state: 'visible',
          timeout: 10000
        });
        
    
        const walletPage = await handlePageTransition(
          context, 
          this.page, 
          async () => await this.page.click('xpath=//div[@class="flex flex-col gap-4 lg:gap-8 text-white"]/div[1]'),
          30000
        );
        if (walletPage) {
            await walletPage.screenshot({ path: `wallet-page-${Date.now()}.png` });
            await walletPage.click('xpath=//*[contains(text(), "Accept")]');
          } else {
            console.error('Failed to capture the wallet page');
          }
          await this.page.click('xpath=//*[contains(text(), "Receive ")]');
         await this.page.waitForTimeout(8000);
          await this.page.click('xpath=//*[contains(text(), "Create Vault")]');
          await this.page.fill('xpath=//input[@name="name"]', generateRandomString());
          await this.page.click('xpath=//*[contains(text(), "Continue")]');
          // Check if error message exists and wait for it to disappear
          let errorElement = await this.page.locator('//div[@class="flex flex-col gap-2 w-full"]/div/span');
          let errorText = await errorElement.textContent();
          console.log("bt el 3ars is "+ errorText);
        let errorExists = await this.page.locator('//div[@class="flex flex-col gap-2 w-full"]/div/span')
.filter({ hasText: "The fees to open a vault are higher than your balance" })
.isVisible()
.catch(() => false);

if (errorExists) {
console.log("Fee error message detected. Waiting for it to disappear...");


const maxWaitTime = 30000; 
const checkInterval = 1000; 
const startTime = Date.now();


while (Date.now() - startTime < maxWaitTime) {

  errorExists = await this.page.locator('//div[@class="flex flex-col gap-2 w-full"]/div/span')
    .filter({ hasText: "The fees to open a vault are higher than your balance" })
    .isVisible()
    .catch(() => false);
  
  if (!errorExists) {
    console.log("Error message is no longer visible, continuing with workflow");
    break; 
  }
  
  
  await this.page.waitForTimeout(checkInterval);
}


if (errorExists) {
  console.log("Error message remained visible after timeout. Will attempt to continue anyway.");
}
}

console.log("Proceeding with button clicks...");
await this.page.click('xpath=(//button[@type="button"])[5]');
await this.page.click('xpath=(//button[@type="button"])[10]');
await this.page.click('xpath=//*[contains(text(), "Preview")]');
await this.page.click('xpath=(//*[contains(text(), "Confirm")])[2]');
          
const confirmationPage = await handlePageTransition(
            context,
            this.page,
            async () => {
             
              await this.page.waitForTimeout(1000);
            },
            30000 
          );
          
         if (confirmationPage) {
            console.log('Confirmation window detected, waiting for Confirm All button');
            await confirmationPage.screenshot({ path: `confirmation-page-${Date.now()}.png` });
           
            try {
              await confirmationPage.waitForSelector('xpath=//*[contains(text(), "Confirm all")]', {
                state: 'visible',
                timeout: 15000
              });
              await confirmationPage.click('xpath=//*[contains(text(), "Confirm all")]');
              await confirmationPage.click('xpath=//*[contains(text(), "Close")]');
              console.log('Successfully clicked Confirm all button');
            } catch (confirmError) {
              console.error('Error finding or clicking Confirm all button:', confirmError);
              await confirmationPage.screenshot({ path: `confirm-all-error-${Date.now()}.png` });
            }
          } else {
            console.error('Failed to capture the confirmation window');
          }
          try {
            await this.page.waitForSelector('//h2[contains(text(), "Vault Successfully Created!")]', {
              state: 'visible',
              timeout: 60000  
            });
            
            console.log('Vault creation success message appeared');
            
            await this.page.screenshot({ path: `vault-created-success-${Date.now()}.png` });

            await this.page.click('//button[contains(text(), "Go to Vault")]');
            console.log('Clicked "Go to Vault" button');
          

            await this.page.waitForLoadState('networkidle');
          } catch (error) {
            console.error('Error waiting for success message or clicking Go to Vault button:', error);
            await this.page.screenshot({ path: `vault-creation-error-${Date.now()}.png` });
          }

      } catch (extensionError) {
        console.error('Error reopening Xverse extension:', extensionError);
        const screenshotPath = `extension-error-${Date.now()}.png`;
        await this.page.screenshot({ path: screenshotPath });
      }
     
    } catch (error) {
      console.error('Error:', error);
  
      if (this.page) {
        const screenshotPath = `error-screenshot-${Date.now()}.png`;
        await this.page.screenshot({ path: screenshotPath });
        console.log('Screenshot saved to', screenshotPath);
      }
      
      throw error;
    }
  });