 Feature: Message  functionality

 Background: 
  Given I am on the login page

 Scenario Outline: Send a message
  When I login with username "<user>" and password "<password>"
  And I click on the login button
  When I enter the text "<message>"
  And I click on the send button
  Then I should see the first message with text "<message>"

  Examples:
    | user    | password | | message          |
    | hitest  | hitest   | | testing message  |
    | hiworld | hiworld  | | testing message again |
    