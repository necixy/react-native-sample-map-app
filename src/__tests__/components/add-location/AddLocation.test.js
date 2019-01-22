import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import { MockedProvider } from "react-apollo/test-utils";
import AddLocation from "../../../components/add-location/AddLocation";

const mockedGeocodingResult = {
  results: [
    {
      address_components: [
        {
          long_name: "Berlin",
          short_name: "Berlin",
          types: ["locality", "political"]
        },
        {
          long_name: "Berlin",
          short_name: "Berlin",
          types: ["administrative_area_level_1", "political"]
        },
        {
          long_name: "Germany",
          short_name: "DE",
          types: ["country", "political"]
        }
      ],
      formatted_address: "Berlin, Germany",
      geometry: {
        bounds: {
          northeast: {
            lat: 52.6754542,
            lng: 13.7611175
          },
          southwest: {
            lat: 52.338234,
            lng: 13.088346
          }
        },
        location: {
          lat: 52.52000659999999,
          lng: 13.404954
        },
        location_type: "APPROXIMATE",
        viewport: {
          northeast: {
            lat: 52.6754542,
            lng: 13.7611175
          },
          southwest: {
            lat: 52.338234,
            lng: 13.088346
          }
        }
      },
      place_id: "ChIJAVkDPzdOqEcRcDteW0YgIQQ",
      types: ["locality", "political"]
    }
  ],
  status: "OK"
};

describe("AddLocation Component Testing", () => {
  it("AddLocation Renders correctly", async () => {
    const component = renderer.create(
      <MockedProvider addTypename={false}>
        <AddLocation />
      </MockedProvider>
    );

    let root = component.root;
    let addLocationInstance =
      root.children[0].children[0].children[0].children[0].instance;

    expect(component.toJSON()).toMatchSnapshot();

    addLocationInstance.geocodeAddress = jest.fn(() => {
      addLocationInstance.setGeoCodingResults(mockedGeocodingResult);
    });

    let searchInput = root.find(
      el =>
        el.props && el.props.testId == "searchInput" && el.type == "TextInput"
    );
    expect(searchInput).toBeDefined();

    const searchString = "Berlin";
    await searchInput.props.onChangeText(searchString);
    await searchInput.props.onSubmitEditing();

    expect(component.toJSON()).toMatchSnapshot();

    const { searchText, locations, error_message } = addLocationInstance.state;
    expect(searchInput.props.value).toBe(searchString);
    expect(searchText).toBe(searchString);
    expect(locations).toBeDefined();
    expect(error_message).toBeNull();

    const textAddress = root.find(
      el => el.props && el.props.testId == "textAddress" && el.type == "Text"
    );
    const textLat = root.find(
      el => el.props && el.props.testId == "textLat" && el.type == "Text"
    );
    const textLng = root.find(
      el => el.props && el.props.testId == "textLng" && el.type == "Text"
    );
    const location = mockedGeocodingResult.results[0];
    expect(textAddress.children[1]).toBe(location.formatted_address);
    expect(textLat.children[1]).toBe(location.geometry.location.lat.toString());
    expect(textLng.children[1]).toBe(location.geometry.location.lng.toString());
  });
});
