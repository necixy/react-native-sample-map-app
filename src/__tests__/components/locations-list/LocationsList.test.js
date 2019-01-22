import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import { MockedProvider } from "react-apollo/test-utils";
import LocationsList from "../../../components/locations-list/LocationsList";

const locationsMocks = [
  {
    id: "5c40317ac907b9d99467ba08",
    name: "Brandenburg Tor",
    address: "Pariser Platz, 10117 Berlin, Germany",
    lat: 52.5162746,
    lng: 13.3777041
  },
  {
    id: "5c404e92c907b9d99467ba0b",
    name: "Mall of Berlin",
    address: "Leipziger Pl. 12, 10117 Berlin, Germany",
    lat: 52.51050919999999,
    lng: 13.3810452
  },
  {
    id: "5c404fd3c907b9d99467ba0c",
    name: "TV Tower",
    address: "Panoramastraße 1A, 10178 Berlin, Germany",
    lat: 52.520815,
    lng: 13.4094191
  },
  {
    id: "5c405010c907b9d99467ba0e",
    name: "Night club Tressor",
    address: "Köpenicker Str. 70, 10179 Berlin, Germany",
    lat: 52.5106031,
    lng: 13.4197619
  },
  {
    id: "5c405030c907b9d99467ba0f",
    name: "Technology museum Berlin",
    address: "Trebbiner Str. 9, 10963 Berlin, Germany",
    lat: 52.4986982,
    lng: 13.3778846
  },
  {
    id: "5c4054c4c907b9d99467ba11",
    name: "Alexanderplatz",
    address: "10178 Berlin, Germany",
    lat: 52.5219184,
    lng: 13.4132147
  }
];

describe("LocationsList Component Testing", () => {
  it("LocationsList Renders correctly", () => {
    const locationsList = renderer.create(
      <MockedProvider addTypename={false}>
        <LocationsList locations={locationsMocks} />
      </MockedProvider>
    );

    let listJSON = locationsList.toJSON();
    let root = locationsList.root;
    expect(listJSON).toMatchSnapshot();

    const list = root.find(
      el => el.props && el.props.testId == "list" && el.type == "RCTScrollView"
    );

    const itemNames = list.findAll(el => {
      return el.props && el.props.testId == "itemName" && el.type == "Text";
    });

    const itemEditBtns = list.findAll(el => {
      return el.props && el.props.testId == "itemEditBtn";
    });

    const itemDeleteBtns = list.findAll(el => {
      return el.props && el.props.testId == "itemDeleteBtn";
    });

    // Length of itemNames,itemEditBtns and itemDeleteBtns should be equal to length of locations.
    expect(itemNames.length == locationsMocks.length);
    expect(itemEditBtns.length == locationsMocks.length);
    expect(itemDeleteBtns.length == locationsMocks.length);

    // Each itemNames should show the location name.
    itemNames.forEach((el, i) => {
      el.children[0] == locationsMocks[i].name;
    });
  });
});
