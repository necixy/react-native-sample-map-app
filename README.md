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
- Wrapped the MapView inside the MapViewComponent and managing the map related sub components and functions through wrapper component so in future if we need to replace the 3rd party library, we can easily do so only in the MapViewComponent without altering the other components.
- For fetching the geocoding results from google api, used fetch instead of axios since it's built right into react native and we don't need any customisation that fetch api doesn't offer for our current scenario. For more REST intense app, I usually prefer axios.
