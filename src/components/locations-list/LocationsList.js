import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Alert
} from "react-native";
import { PropTypes } from "prop-types";
import { graphql } from "react-apollo";
import locationsQuery from "../../graphql/queries/locations";
import deleteLocation from "../../graphql/mutations/deleteLocation";
import s from "./LocationsList.styles";

class LocationsList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  editLocation(location) {
    this.props.navigation.navigate("EditLocation", { location });
  }

  promptDelete(location) {
    Alert.alert(
      "Confirm Delete",
      `Are you sure you would like to delete location: ${location.name}`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: () => this.deleteLocation(location),
          style: "destructive"
        }
      ],
      { cancelable: false }
    );
  }

  async deleteLocation(location) {
    await this.props.mutate({
      variables: { id: location.id },
      refetchQueries: [{ query: locationsQuery }]
    });
  }

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
            onPress={this.promptDelete.bind(this, item)}
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
        style={[this.props.style, s.list]}
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

export default graphql(deleteLocation)(LocationsList);
