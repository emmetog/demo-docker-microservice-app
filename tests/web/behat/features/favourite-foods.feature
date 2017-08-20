Feature: Favourite Foods
  In order to remember everyones favourite foods
  As a forgetful person
  I need to be able to add peoples favourite foods to the system

  @javascript
  Scenario: Adding a new favourite food
    Given I am on "/"
    #Then wait 2 seconds
    When I wait for text "My Favourite Foods" to appear
    When I should see "Paddy"
    When I fill in "Patrick" for "person"
    When I fill in "Hamburgers" for "food"
    When I press "Add"
    Then print last response
    Then I wait for text "Patrick" to appear
