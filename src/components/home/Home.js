import React, { Component } from "react";
import { View, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import MapViewComponent from "../mapview/MapViewComponent";
import LocationsList from "../locations-list/LocationsList";
import { graphql } from "react-apollo";
import query from "../../graphql/queries/locations";
import s from "./Home.styles";

class Home extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Home",
      headerRight: (
        <TouchableOpacity onPress={() => navigation.navigate("AddLocation")}>
          <Text style={s.headerBtnLbl}>Add</Text>
        </TouchableOpacity>
      )
    };
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { locations } = this.props.data;
    return locations ? (
      <View style={s.container}>
        <MapViewComponent style={s.mapView} locations={locations} />
        <LocationsList
          style={s.locationsList}
          locations={locations}
          navigation={this.props.navigation}
        />
      </View>
    ) : (
      <View style={s.spinnerContainer}>
        <ActivityIndicator />
      </View>
    );
  }
}

export default graphql(query)(Home);
