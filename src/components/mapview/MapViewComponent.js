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

  componentDidMount() {
    // setTimeout(() => {
    //   this.refs.map.fitToElements(true);
    // }, 1000);
  }

  componentDidUpdate() {
    this.fitMapElements();
  }

  fitMapElements() {
    this.refs.map.fitToElements(true);
  }

  render() {
    return (
      <View {...this.props} style={[s.container, this.props.style]}>
        <MapView
          ref="map"
          style={s.map}
          onMapReady={this.fitMapElements.bind(this)}
        >
          {this.props.locations.map((location, index) => (
            <Marker
              key={`marker-${index}`}
              coordinate={{
                latitude: location.lat,
                longitude: location.lng
              }}
              title={location.name}
              description={location.address}
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
