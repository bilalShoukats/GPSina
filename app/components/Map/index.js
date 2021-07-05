/**
 *
 * Map
 *
 */

import React from 'react';
import { compose, withProps } from 'recompose';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';

const propTypes = {
  defaultZoom: PropTypes.number,
  defaultCenter: PropTypes.object,
  isMarkerShown: PropTypes.bool,
  markerPosition: PropTypes.object,
  onMarkerClick: PropTypes.func,
  showMapTypeControl: PropTypes.bool,
  showFullScreenControl: PropTypes.bool,
  showStreetViewControl: PropTypes.bool,
  mapTypeId: PropTypes.string,
};

const defaultProps = {
  defaultZoom: 8,
  defaultCenter: { lat: -34.397, lng: 150.644 },
  isMarkerShown: false,
  markerPosition: { lat: -34.397, lng: 150.644 },
  onMarkerClick: () => {
    console.log('onMarkerClick');
  },
  showMapTypeControl: true,
  showFullScreenControl: true,
  showStreetViewControl: true,
  mapTypeId: 'roadmap',  // roadmap, hybrid, default to roadmap
};

const Map = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyAywCpAjtueU2fVwjArfZMm_4RAf7BqZBI',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
)(props => (
  <GoogleMap
    defaultZoom={props.defaultZoom}
    defaultCenter={props.defaultCenter}
    options={{ 
      mapTypeControl: props.showMapTypeControl,
      fullscreenControl: props.showFullScreenControl, 
      streetViewControl: props.showStreetViewControl,
      mapTypeId: props.mapTypeId,
      gestureHandling: 'greedy',
    }}
  >
    {props.isMarkerShown && (
      <Marker position={props.markerPosition} onClick={props.onMarkerClick} />
    )}
  </GoogleMap>
));

Map.propTypes = propTypes;
Map.defaultProps = defaultProps;

export default Map;
