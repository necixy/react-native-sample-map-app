import React, { Component } from "react";
import { View } from "react-native";
import { PropTypes } from "prop-types";
import MapView, { Marker } from "react-native-maps";
import s from "./MapViewComponent.styles";

class MapViewComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View {...this.props} style={[s.container, this.props.style]}>
        <MapView
          style={s.map}
          region={{
            latitude: 52.5163,
            longitude: 13.3777,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
          }}
        >
          {this.props.locations.map((location, index) => (
            <Marker
              key={`marker-${index}`}
              coordinate={{
                latitude: location.lat,
                longitude: location.long
              }}
              title={location.name}
            />
          ))}
        </MapView>
      </View>
    );
  }
}

MapViewComponent.propTypes = {
  locations: PropTypes.array.isRequired
};

export default MapViewComponent;
