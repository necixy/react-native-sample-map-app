import React, { Component } from "react";
import { View, Button } from "react-native";
import MapViewComponent from "../mapview/MapViewComponent";
import LocationsList from "../locations-list/LocationsList";
import s from "./Home.styles";

const LOCATIONS = [
  { name: "Brandenburg Gate", lat: 52.5163, long: 13.3777 },
  { name: "Mall of Berlin", lat: 52.5105, long: 13.381 }
];

class Home extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Home",
      headerRight: (
        <Button
          onPress={() => navigation.navigate("AddLocation")}
          title="Add"
          color="#fff"
        />
      )
    };
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={s.container}>
        <MapViewComponent style={s.mapView} locations={LOCATIONS} />
        <LocationsList
          style={s.locationsList}
          locations={LOCATIONS}
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}

export default Home;
