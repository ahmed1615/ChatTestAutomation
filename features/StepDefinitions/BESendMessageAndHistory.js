const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const fetch = require('node-fetch');
const { backUrl, validUserName } = require('../../TestData/data.js');
const { sendMessagePathParameter, messageHistoryPathParameter } = require('../../TestData/data.js');
const { connectToMongoDB } = require('../../utiles/MongoDBConnection.js');
const {generateRandomString} = require('../../TestData/generator.js')
const Message = require('../../utiles/messageSchema.js'); 



When('I send a POST request to send a message', async function () {
  const username = validUserName;
  const textMessage = generateRandomString();
 
  const data = {
    sender: username,
    text: textMessage
  };
    this.response = await fetch(backUrl + sendMessagePathParameter, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
});

When('I send post request for sending message {string} and verify the history', async function (message) {
  const username = validUserName;
  const textMessage = message;
  const data = {
    sender: username,
    text: textMessage
  };

  await connectToMongoDB();

  try {
    this.response = await fetch(backUrl + sendMessagePathParameter, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const messages = await Message.find({ sender: username }).sort({ timestamp: -1 });
    console.log("Messages retrieved:", messages);
    this.lastMessage = messages[0].text;
    console.log("The last message is", this.lastMessage);
  } catch (error) {
    console.error('Error in sending message or querying MongoDB:', error);
  } 
});

Then('the last message should be {string}', function (expectedLastMessage) {
  expect(this.lastMessage).toBe(expectedLastMessage);
});
