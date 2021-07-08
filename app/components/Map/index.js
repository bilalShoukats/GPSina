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
import { LATITUDE, LONGITUDE } from '../../constants/maps';

const propTypes = {
  children: PropTypes.node,
  defaultZoom: PropTypes.number,
  zoom: PropTypes.number,
  defaultCenter: PropTypes.object,
  center: PropTypes.object,
  isMarkerShown: PropTypes.bool,
  markerPosition: PropTypes.object,
  onMarkerClick: PropTypes.func,
  showMapTypeControl: PropTypes.bool,
  showFullScreenControl: PropTypes.bool,
  showStreetViewControl: PropTypes.bool,
  mapTypeId: PropTypes.string,
};

const defaultProps = {
  defaultZoom: 16,
  zoom: 16,
  defaultCenter: { lat: LATITUDE, lng: LONGITUDE },
  center: { lat: LATITUDE, lng: LONGITUDE },
  isMarkerShown: false,
  markerPosition: { lat: LATITUDE, lng: LONGITUDE },
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
      // defaultZoom={props.defaultZoom}
      // defaultCenter={props.defaultCenter}
      options={{ 
        mapTypeControl: props.showMapTypeControl,
        fullscreenControl: props.showFullScreenControl,
        streetViewControl: props.showStreetViewControl,
        mapTypeId: props.mapTypeId,
        gestureHandling: 'greedy',
      }}
      center={props.center}
      zoom={props.zoom}
    >
      {props.children}
    </GoogleMap>
));

Map.propTypes = propTypes;
Map.defaultProps = defaultProps;

export default Map;