const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

When('I enter the text {string}', async function(message) {
    await this.page.waitForSelector('//*[@id="root"]/div/div/div[1]/input'); 
    const inputField = this.page.locator('//*[@id="root"]/div/div/div[1]/input');
    await inputField.click();
    await inputField.fill(message);
  });
  
  When('I click on the send button', async function() {
    await this.page.waitForSelector('button:has-text("Send")'); 
    const sendButton = this.page.locator('button:has-text("Send")');
    await sendButton.click();
  });
  

Then('I should see the first message with text {string}', async function(message) {
  const firstMessage = await this.page.locator('//*[@id="root"]/div/div/div[2]/div[1]');
  await expect(firstMessage).toContainText(message);
});
