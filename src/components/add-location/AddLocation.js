import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity
} from "react-native";
import KEYS from "../../config/keys";
import s from "./AddLocationStyles";

class AddLocation extends Component {
  static navigationOptions = {
    title: "Add Location"
  };

  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      locations: null,
      error_message: null
    };
  }

  async geocodeAddress() {
    const { searchText } = this.state;
    if (!searchText) {
      this.setState({
        locations: null,
        error_message: "Please type in the address in order to search."
      });
      return;
    }
    const { GOOGLE_GEOCODING_KEY } = KEYS;
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?&address=${searchText}&key=${GOOGLE_GEOCODING_KEY}`
    );
    const data = await response.json();
    if (data.status == "OK") {
      this.setState({ locations: data.results, error_message: null });
    } else if (data.status == "ZERO_RESULTS") {
      this.setState({ locations: null, error_message: "No results found" });
    } else {
      this.setState({ locations: null, error_message: data.error_message });
    }
  }

  async addLocation(location) {
    alert(location.formatted_address);
  }

  renderErrorMsg() {
    const { error_message } = this.state;
    return error_message ? (
      <Text style={s.errorMsg}>{error_message}</Text>
    ) : null;
  }

  renderListItem({ item, index }) {
    return (
      <TouchableOpacity
        key={index}
        style={s.listItem}
        onPress={this.addLocation.bind(this, item)}
      >
        <Text>Address: {item.formatted_address}</Text>
        <Text>Latitude: {item.geometry.location.lat}</Text>
        <Text>Longitude: {item.geometry.location.lng}</Text>
      </TouchableOpacity>
    );
  }

  renderList() {
    const _keyExtractor = (item, index) => `location-${index}`;
    const { locations } = this.state;
    return locations == null ? null : (
      <View style={s.listContainer}>
        <View style={s.listHeader}>
          <Text style={s.listHeaderLbl}>
            Please tap on the desired address below to add to the map.
          </Text>
        </View>
        <FlatList
          style={s.list}
          data={locations}
          keyExtractor={_keyExtractor}
          renderItem={this.renderListItem.bind(this)}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={s.container}>
        <TextInput
          placeholder="Type in the address"
          onChangeText={text => this.setState({ searchText: text })}
          value={this.state.searchText}
          returnKeyType="search"
          autoFocus={true}
          style={s.addressInput}
          onSubmitEditing={this.geocodeAddress.bind(this)}
        />
        {this.renderErrorMsg()}
        {this.renderList()}
      </View>
    );
  }
}

export default AddLocation;