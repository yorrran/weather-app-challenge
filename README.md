# Weather App Challenge

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to run
You can use Node version 18.15.0 to run the project

In the project directory, you can run:
### `npm install`
Install all the dependencies

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Assumptions
Since UX is not specified, there are some assumptions made with user interaction:

<ol>
  <li>User can not input location on the Home page search bar but can do repeat search for updating weather data</li>
  <li>User can use location icon on the search bar to navigate to /search-history page to select new location to search</li>
  <li>When user press search on the /search-history, it routes back to Home page and display the weather information of the search location if the search location is valid</li>
  <li>User can not route back to Home page until a valid search location is selected, but user can choose to change url to go back to home page</li>
</ol>

Also, the key is currently stored in frontend and exposed to user which may have potential security issue. The proper way is to keep the keys in backend to avoid exposing to users.
