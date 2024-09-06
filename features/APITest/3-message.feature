Feature: send message and check the history scenarios

  Scenario: send a message 
   Given I send a POST request to send a message
   Then the response status should be 201
   And the response should contain "Message sent successfully"

 Scenario Outline: send a message and check the history
  When I send post request for sending message "<Message>" and verify the history
  Then the last message should be "<Message>"
  Examples:
  | Message   |
  | hi  |
  | hi wo|
 

