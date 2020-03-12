import React from 'react';
import { withGoogleMap, withScriptjs} from 'react-google-maps';
import DashboardMap from './basic';

const MapComponent = withScriptjs(withGoogleMap(DashboardMap))

export default (props) => (
    <MapComponent
        show={props.show}
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAywCpAjtueU2fVwjArfZMm_4RAf7BqZBI&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `600px`, width: '100%' }} />}
        mapElement={<div style={{ height: `100%` }} />}
    />
)