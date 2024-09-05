Feature: User Registration

  Scenario: Register a new user
    Given I send a POST request to register a new user with random username and password
    Then the response status should be 201
    And the response should contain "User registered successfully"

 Scenario: Register and login with a new user
    Given I send a POST request to register a new user with random username and password and login
    Then the response status should be 200
    And the response should contain "Login successful"

    
    
   


