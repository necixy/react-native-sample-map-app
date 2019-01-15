import React, { Component } from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { PropTypes } from "prop-types";
import s from "./LocationsList.styles";

class LocationsList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  editLocation(location) {
    this.props.navigation.navigate("EditLocation", { location });
  }

  deleteLocation(location) {}

  renderErrorMsg(error) {
    return <Text style={s.errorMsg}>{error}</Text>;
  }

  renderListItem({ item, index }) {
    return (
      <View key={index} style={s.listItem}>
        <View style={s.itemDetails}>
          <Text>{item.name}</Text>
        </View>
        <View style={s.itemBtnContainer}>
          <TouchableOpacity
            style={s.itemBtn}
            onPress={this.editLocation.bind(this, item)}
          >
            <Image style={s.itemBtnIcon} source={require("./img/edit.png")} />
          </TouchableOpacity>
          <TouchableOpacity
            style={s.itemBtn}
            onPress={this.deleteLocation.bind(this, item)}
          >
            <Image style={s.itemBtnIcon} source={require("./img/trash.png")} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderList(locations) {
    const _keyExtractor = (item, index) => `location-${index}`;
    return (
      <FlatList
        {...this.props}
        style={this.props.style}
        data={locations}
        keyExtractor={_keyExtractor}
        renderItem={this.renderListItem.bind(this)}
      />
    );
  }

  render() {
    const { locations } = this.props;
    if (!locations || locations.length == 0) {
      return this.renderErrorMsg("No data available.");
    } else {
      return this.renderList(locations);
    }
  }
}

LocationsList.propTypes = {
  locations: PropTypes.array.isRequired,
  navigation: PropTypes.object.isRequired
};

export default LocationsList;
