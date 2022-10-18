/**
 *
 * Map AIzaSyCvlR6R50PN-7o-7UABXDTrdjIAMudbRfM
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import GoogleMapReact from 'google-map-react';
import Car from '../../components/Marker/car';
import { GoogleMapsAPI, LATITUDE, LONGITUDE } from '../../constants/maps';

const Wrapper = styled.main`
    width: 100%;
    height: 100%;
`;

const propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]),
    zoom: PropTypes.number,
    center: PropTypes.object,
    coordinate: PropTypes.object,
    center: PropTypes.object,
    options: PropTypes.object,
    draggable: PropTypes.bool,
    carWidth:PropTypes.number, 
    carHeight:PropTypes.number,

};

const defaultProps = {
    children: null,
    carWidth:30, 
    carHeight:16,
    coordinate:{ lat: LATITUDE, lng: LONGITUDE },
    zoom: 12,
    center: { lat: LATITUDE, lng: LONGITUDE },
    draggable: true,
    options: {
        panControl: true,
        scrollwheel: true,
        mapTypeControl: true,
        fullscreenControl: true,
        streetViewControl: true,
        mapTypeId: 'roadmap',
    },
};
// console.log(defaultProps.coordinate,"defaultProps.coordinate");

const Map = ({ children, ...props }) => (
    <Wrapper>
    <GoogleMapReact
    bootstrapURLKeys={{
        key: GoogleMapsAPI,
        libraries: ['drawing', 'places', 'geometry'].join(','),
    }}
    center={props.center}
    zoom={props.zoom}
    draggable={props.draggable}
    options={props.options}
    {...props}
    yesIWantToUseGoogleMapApiInternals
    >
    <Car
    key={0}
    width={props.carWidth}
    height={props.carHeight}
    lat={props.coordinate.lat}
    lng={props.coordinate.lng}
    />
    

            {children}
        </GoogleMapReact>
    </Wrapper>
);

Map.propTypes = propTypes;
Map.defaultProps = defaultProps;

export default Map;
