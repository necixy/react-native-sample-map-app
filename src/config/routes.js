import { createStackNavigator, createAppContainer } from "react-navigation";
import Home from "../components/home/Home";
import AddLocation from "../components/add-location/AddLocation";
import EditLocation from "../components/edit-location/EditLocation";
import theme from "./theme";
const MainStack = createStackNavigator(
  {
    Home: {
      screen: Home
    },
    AddLocation: {
      screen: AddLocation
    },
    EditLocation: {
      screen: EditLocation
    }
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: theme.primary
      },
      headerTintColor: theme.light,
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }
  }
);

export default createAppContainer(MainStack);
