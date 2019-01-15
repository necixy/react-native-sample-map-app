/** @format */

import { AppRegistry } from "react-native";
import { name as appName } from "./app.json";

import routes from "./src/config/routes";
import Home from "./src/components/home/Home";

AppRegistry.registerComponent(appName, () => routes);
