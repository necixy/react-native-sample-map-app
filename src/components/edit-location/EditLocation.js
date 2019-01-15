import React, { Component } from "react";
import { View, Text, TextInput, Button } from "react-native";
import s from "./EditLocationStyles";

export default class EditLocation extends Component {
  static navigationOptions = {
    title: "Edit Location"
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  focusInput(ref) {
    this.refs[ref].focus();
  }

  updateLocation() {
    this.props.navigation.pop();
  }

  render() {
    return (
      <View style={s.container}>
        <View style={s.inputContainer}>
          <TextInput
            placeholder="Input 1"
            returnKeyType="next"
            onSubmitEditing={this.focusInput.bind(this, "input2")}
            style={s.textInput}
          />
          <TextInput
            ref="input2"
            placeholder="Input 2"
            style={s.textInput}
            returnKeyType="done"
          />
        </View>
        <Button title="Update" onPress={this.updateLocation.bind(this)} />
      </View>
    );
  }
}
