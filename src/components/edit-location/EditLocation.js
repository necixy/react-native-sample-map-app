import React, { Component } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { graphql } from "react-apollo";
import locationsQuery from "../../graphql/queries/locations";
import updateLocation from "../../graphql/mutations/updateLocation";
import s from "./EditLocationStyles";

class EditLocation extends Component {
  location;
  static navigationOptions = {
    title: "Edit Location"
  };

  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.location = navigation.getParam("location");
    this.state = {
      locationName: this.location.name,
      locationAddress: this.location.address
    };
  }

  focusInput(ref) {
    this.refs[ref].focus();
  }

  async updateLocation() {
    const { location } = this;
    await this.props.mutate({
      variables: {
        id: location.id,
        name: this.state.locationName,
        address: this.state.locationAddress,
        lat: location.lat,
        lng: location.lng
      },
      refetchQueries: [{ query: locationsQuery }]
    });
    this.props.navigation.pop();
  }

  render() {
    return (
      <View style={s.container}>
        <View style={s.inputContainer}>
          <TextInput
            testId="inputName"
            placeholder="Name"
            onChangeText={text => this.setState({ locationName: text })}
            value={this.state.locationName}
            returnKeyType="next"
            onSubmitEditing={this.focusInput.bind(this, "inputAddress")}
            style={s.textInput}
          />
          <TextInput
            testId="inputAddress"
            ref="inputAddress"
            placeholder="Address"
            onChangeText={text => this.setState({ locationAddress: text })}
            value={this.state.locationAddress}
            style={s.textInput}
            returnKeyType="done"
          />
        </View>
        <Button title="Update" onPress={this.updateLocation.bind(this)} />
      </View>
    );
  }
}

export default graphql(updateLocation)(EditLocation);
