Feature: Login functionality

Background: 
  Given I am on the login page

 Scenario Outline: Successful login with valid credentials
  When I login with username "<user>" and password "<password>"
  And I click on the login button
  Then I should see the Chat heading
  Examples:
    | user    | password |
    | hitest  | hitest   |
    | hiworld | hiworld  |

 Scenario Outline: Fail login with invalid credentials
  When I login with username "<user>" and password "<password>"
  And I click on the login button
  Then the error message should appear

  Examples:
    | user     | password |
    | baduser  | baduser  |
    | hola     | hola     |


