Feature: Login Scenarios

  Scenario: login with valid user 
    Given I login with a valid credntial
    Then the response status should be 200
    And the response should contain "Login successful"

 Scenario: login with invalid credntial
  Given I login with invalid credntial
    Then the response status should be 400
    And the response should contain "Invalid credentials"
