const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { frontUrl } = require('../../TestData/data.js');
const LoginElements = require('../../getElements/LoginElements.js');

Given('I am on the login page', async function() {
  await this.openBrowser(); 
  await this.page.goto(frontUrl);
});

When('I login with username {string} and password {string}', async function(username, password) {
  await this.page.fill(LoginElements.usernameField, username);
  await this.page.fill(LoginElements.passwordField, password);
});

When('I click on the login button', async function() {
  await this.page.click(LoginElements.loginButton);
});

Then('I should see the Chat heading', async function() {
  const chatHeading = await this.page.locator(LoginElements.chatHeading);
  await expect(chatHeading).toBeVisible();
});

Then('the error message should appear', async function() {
  const errorMsgLocator = await this.page.locator(LoginElements.errorMessage);
  await expect(errorMsgLocator).toBeVisible();
});
