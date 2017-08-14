Feature: Favourite Foods
  In order to remember everyones favourite foods
  As a forgetful person
  I need to be able to add peoples favourite foods to the system

  Scenario: Adding a new favourite food
    Given I am on "/"
    Given I debug
    Then print last response
    When I wait for text "My Favourite Foods" to appear
    When I fill in "Patrick" for "person"
    When I fill in "Hamburgers" for "food"
    When I press "add"
    Then print last response
    Then wait 60 seconds
    Then I wait for text "Patrick loves Hamburgers" to appear
