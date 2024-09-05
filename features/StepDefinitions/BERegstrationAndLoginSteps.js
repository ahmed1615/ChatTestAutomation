const { Given, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const fetch = require('node-fetch');
const {backUrl, validUserName, validPassword} = require ('../../TestData/data.js')
const {registerPathParameter, loginPathParameter} =require ('../../TestData/data.js')
const {generateRandomString} = require('../../TestData/generator.js')

let response;

Given('I send a POST request to register a new user with random username and password', async function () {
    const randomUsername = generateRandomString(); 
    const randomPassword = generateRandomString();
  
    const data = {
      username: randomUsername,
      password: randomPassword
    };
  
  this.response = await fetch(backUrl + registerPathParameter, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  });

Then('the response status should be {int}', async function (statusCode) {
  const status = this.response.status;
  expect(status).toBe(statusCode);
});

Then('the response should contain {string}', async function (message) {
  const responseData = await this.response.json(); 
  expect(responseData.message).toContain(message);
});

Given('I send a POST request to register a new user with random username and password and login', async function () {
  const randomUsername = generateRandomString();
  const randomPassword = generateRandomString();

  const data = {
    username: randomUsername,
    password: randomPassword
  };

   this.response = await fetch(backUrl + registerPathParameter, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  this.response = await fetch(backUrl + loginPathParameter, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
});

Given('I login with a valid credntial', async function () {
  const data = {
    username: validUserName,
    password: validPassword
  };
   this.response = await fetch(backUrl + registerPathParameter, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  this.response = await fetch(backUrl + loginPathParameter, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
});

Given('I login with invalid credntial', async function () {
  const randomUsername = generateRandomString();
  const randomPassword = generateRandomString();

  const data = {
    username: randomUsername,
    password: randomPassword
  };
   this.response = await fetch(backUrl + loginPathParameter, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  this.response = await fetch(backUrl + loginPathParameter, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
});