# Feature: GitHub Dashboard Settings

## Background
Given the user has started the GitHub Dashboard application

## Scenario: User opens the settings page
When the user navigates to the settings page  
Then the user lands on AccessToken page
And there are tabs to navigate to Repo and Schedule
And the page displays GitHub personal access token saved in the DB with an edit icon

## Scenario: User edits access token
When the user navigates to the AccessToken page
And Clicks on edit icon
Then page displays the token in a text box which is editable
And the edit icon is hidden and replaced with save and cancel icon

## Scenario: User saves access token
When the user is editing AccessToken
And Clicks on save icon
Then page displays the new token and updates the DB
And edit button reappears and save and cancel button no longer are visible

## Scenario: User cancels edit access token
When the user is editing AccessToken
And Clicks on cancel icon
Then page displays the existing token saved in the DB
And edit button reappears and save and cancel button no longer are visible

## Scenario: User navigates to the Repo tab
When the user navigates to the settings page and clicks on Repo tab 
Then the settings page should display a repo grid with Add new repo icon on the top right
And the repo grid displays list of all repos in the DB
And each row in the gris displays owner, repoName and 2 icons to edit and delete

## Scenario: User adds a new repository
Given the user is on the Repo tab  
When the user clicks on button to adds a new repository
Then a modal window appears to add an Owner and repo name to the list  
And the user clicks on the "Save" button  
Then the repository list should be updated with the new repository and should be saved to the database.

## Scenario: User edits a repository
Given the user is on the repo page  
When the user clicks on the "Edit" icon next to the repository "owner/repo" 
Then a new modal window appears with editable Owner and repo name
And user can either save or cancel the change
When the user clicks on Save on the modal window 
Then the repository "owner/repo" should be updated in the database and the list is updated provided there is no existing owner/repo in the DB with the same name

## Scenario: User adds a new schedule
Given the user is on the settings page  
When the user clicks on button to adds a new schedule
Then a modal window appears to add Hour of the day and the minute of the day to the list  
And the user clicks on the "Save" button  
Then the schedule list should be updated with the new repository and should be saved to the database.

## Scenario: User loads settings from local file storage
Given the user has previously saved a GitHub personal access token and a list of repositories  
When the user navigates to the settings page  
Then the GitHub personal access token should be loaded and displayed in the input field  
And the list of repositories should be loaded and displayed

## Scenario: User views cached GitHub repository data on the dashboard
Given the user has navigated to the dashboard page  
When the user requests repository data for "owner/repo"  
Then the dashboard should display cached repository data if available  
And if no cached data is available, the application should fetch the data from GitHub API  
And the fetched data should be saved to local file storage for future use

## Scenario: User views cached pull requests on the dashboard
Given the user has navigated to the dashboard page  
And the user has selected a repository and pull request state  
When the user requests pull requests for the selected repository and state  
Then the dashboard should display cached pull requests data if available  
And if no cached data is available, the application should fetch the data from GitHub API  
And the fetched data should be saved to local file storage for future use

## Scenario: User views cached commits on the dashboard
Given the user has navigated to the dashboard page  
And the user has selected a repository and date range  
When the user requests commits for the selected repository and date range  
Then the dashboard should display cached commits data if available  
And if no cached data is available, the application should fetch the data from GitHub API  
And the fetched data should be saved to local file storage for future use

## Scenario: User views cached reviews on the dashboard
Given the user has navigated to the dashboard page  
And the user has selected a repository and pull request number  
When the user requests reviews for the selected pull request  
Then the dashboard should display cached reviews data if available  
And if no cached data is available, the application should fetch the data from GitHub API  
And the fetched data should be saved to local file storage for future use
