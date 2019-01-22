# react-native-sample-map-app

A sample react native app integrating google map and showing sample CRUD operations.

To run this app, first clone the repo and run the following command:

> npm install

Once node_module folder is created and all npm packages are installed, use following commands to run the app.

# For iOS:

> react-native run-ios

# For Android:

> react-native run-android

Some decisions taken in application designs are as follow with their reasons:

- Divided the app into several components for easy code maintenance and re-usability.

- Inside `src/config` folder the keys, routes and theme is defined so they can be changed & reused (for theme) easily.

- Google Geocoding API key is kept open on keys.js file, so when testing the app, you don't need to setup the key and billing on google dev console. In production app, keys should not be committed to git.

- Wrapped the MapView inside the MapViewComponent and managing the map related sub components and functions through wrapper component so in future if we need to replace the 3rd party library, we can easily do so only in the MapViewComponent without altering the other components.

- For fetching the geocoding results from google api, used fetch instead of axios since it's built right into react native and we don't need any customisation that fetch api doesn't offer for our current scenario. For more REST intense app, I usually prefer axios.

- For making the backend and frontend connection, instead of REST APIs, I chose the GraphQL due to various advantages. I have also worked on REST in many projects and if used REST APIs, I usually use axios for rest api calling and Redux for state management.

- For testing JEST is used. In test cases, components are tested with their render logic and snapshot. In addition the graphql queries and mutations are also snapshot tested to make sure they are no longer changed in future test. To run test, run the command `npm test`.

# Guideline Questions & their Answers:

- How do you handle configuration values? What if those values change?
  Ans. All the configuration values are defined in config/keys.js for react native app and in .env(for localhost) and in config_vars(in heroku/production). Changing them is easy and app/backend adapts to them.

- What happens if we encounter an error with the third-party API integration?
  Ans. The only third party API is Google GeoCoding API which is only used in the AddLocation component of ReactNative app. In case of error the error message is displayed.

- Will it also break our application, or are they handled accordingly?
  Ans. They don't break our application. In case of geocoding api failure, the error message is displayed on app's page without breaking the app.

- Now we will need to change the third-party geocoder API to another one. How can we change our current solution so that we can make this change as seamless as possible? Or how will we change (or refactor) our solution so that any future changes with the third-party integration is only done in isolation?
  Ans. At present only the 3rd party google geocoding api is used in AddLocation component of ReactNative app. So changing it is easy as it requires only one comopnent to be updated. Since this was test app, the api is integrated right into react-native app but we could also wrap the 3rd party api inside the backend so that app talks to our backend and backend talks to 3rd party api, this approach is allow us to change the 3rd party api to be changed easily from backend only but making 2 calls would also make the api little slower. I chose the current approach so that api calls can be faster and can be changed easily in the app.
