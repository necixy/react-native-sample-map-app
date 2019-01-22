import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import { MockedProvider } from "react-apollo/test-utils";
import EditLocation from "../../../components/edit-location/EditLocation";

const location = {
  name: "Berlin",
  address: "Berlin, Germany"
};
const mockedNavigation = {
  getParam: paramName => {
    switch (paramName) {
      case "location":
        return location;

      default:
        break;
    }
  }
};

describe("EditLocation Component Testing", () => {
  it("EditLocation Renders correctly", async () => {
    const component = renderer.create(
      <MockedProvider addTypename={false}>
        <EditLocation navigation={mockedNavigation} />
      </MockedProvider>
    );

    let root = component.root;
    let editLocationInstance =
      root.children[0].children[0].children[0].children[0].instance;
    const { locationName, locationAddress } = editLocationInstance.state;

    const inputName = root.find(
      el => el.props && el.props.testId == "inputName" && el.type == "TextInput"
    );

    const inputAddress = root.find(
      el =>
        el.props && el.props.testId == "inputAddress" && el.type == "TextInput"
    );

    expect(inputName.props.value).toBe(locationName);
    expect(inputAddress.props.value).toBe(locationAddress);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
