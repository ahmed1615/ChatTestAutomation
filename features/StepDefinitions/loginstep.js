const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const {frontUrl} = require ('../../TestData/data.js')

Given('I am on the login page', async function() {
  await this.openBrowser(); 
  await this.page.goto(frontUrl);
});

When('I login with username {string} and password {string}', async function(username, password) {
  await this.page.fill('input[placeholder="Username"]', username);
  await this.page.fill('input[placeholder="Password"]', password);
});

When('I click on the login button', async function() {
  await this.page.click('button:has-text("Login")');
});

Then('I should see the Chat heading', async function() {
  const chatHeading = await this.page.locator('h2:has-text("Chat")');
  await expect(chatHeading).toBeVisible();
});

Then('the error message should appear', async function() {
  const errorMsgLocator = this.page.locator('p:has-text("Please use correct username or password")');
  await expect(errorMsgLocator).toBeVisible();
});

When('close the browser', async function() {
  await this.closeBrowser(); 
});
