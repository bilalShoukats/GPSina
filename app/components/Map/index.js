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
};

const defaultProps = {
  defaultZoom: 8,
  defaultCenter: { lat: -34.397, lng: 150.644 },
  isMarkerShown: false,
  markerPosition: { lat: -34.397, lng: 150.644 },
  onMarkerClick: () => {
    console.log('onMarkerClick');
  },
};

const Map = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyAywCpAjtueU2fVwjArfZMm_4RAf7BqZBI',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `800px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
)(props => (
  <GoogleMap
    defaultZoom={props.defaultZoom}
    defaultCenter={props.defaultCenter}
  >
    {props.isMarkerShown && (
      <Marker position={props.markerPosition} onClick={props.onMarkerClick} />
    )}
  </GoogleMap>
));

Map.propTypes = propTypes;
Map.defaultProps = defaultProps;

export default Map;
