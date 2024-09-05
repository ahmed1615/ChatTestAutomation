const { setDefaultTimeout } = require('@cucumber/cucumber');

setDefaultTimeout(150000); 


const { setWorldConstructor } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

class CustomWorld {
  async openBrowser() {
    this.browser = await chromium.launch({ headless: false });
    this.page = await this.browser.newPage();
  }

  async closeBrowser() {
    await this.browser.close();
  }
}

setWorldConstructor(CustomWorld);

module.exports = {
  default: {
    require: [
      'features/StepDefinitions/**/*.js',
      'features/hooks.js'
    ],
    format: [
      '@cucumber/pretty-formatter', 
      'json:./reports/cucumber_report.json'

    ],
    paths: [
      'features/**/*.feature'
    ],
    publishQuiet: true
  }
};