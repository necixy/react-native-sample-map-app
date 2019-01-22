import "react-native";
import React from "react";
import wait from "waait";
import { MockedProvider } from "react-apollo/test-utils";
import locations from "../../../graphql/queries/locations";
import renderer from "react-test-renderer";
import MapViewComponent from "../../../components/mapview/MapViewComponent";
const Home = require("../../../components/home/Home").default;

const apolloMocks = [
  {
    request: {
      query: locations,
      variables: {}
    },
    result: {
      data: {
        locations: [
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
        ]
      }
    }
  }
];

describe("Home Component Testing", () => {
  jest.mock("../../../components/mapview/MapViewComponent", () => () =>
    "MapView"
  );
  it("Home Renders correctly", async () => {
    const home = renderer.create(
      <MockedProvider mocks={apolloMocks} addTypename={false}>
        <Home />
      </MockedProvider>
    );

    let homeJSON = home.toJSON();
    let homeInstance = home.root;
    expect(homeJSON).toMatchSnapshot();

    // Before loading only loading view should be the children.
    expect(homeJSON.children.length).toBe(1);

    await wait(0); // To load the graphql query data.
    homeJSON = home.toJSON();
    homeInstance = home.root;
    expect(homeJSON).toMatchSnapshot();

    // After loading query there should be 2 children (MapViewComponent & LocationsList) and both should be defined.
    expect(homeJSON.children.length).toBe(2);
    const mapView = homeInstance.findByProps({ testId: "mapView" });
    expect(mapView).toBeDefined();
    const locationsList = homeInstance.findByProps({ testId: "locationsList" });
    expect(locationsList).toBeDefined();
  });
});
