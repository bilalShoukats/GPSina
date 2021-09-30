/**
 *
 * Map AIzaSyCvlR6R50PN-7o-7UABXDTrdjIAMudbRfM
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import GoogleMapReact from 'google-map-react';
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
    options: PropTypes.object,
    draggable: PropTypes.bool,
};

const defaultProps = {
    children: null,
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

const Map = ({ children, ...props }) => (
    <Wrapper>
        <GoogleMapReact
            bootstrapURLKeys={{
                key: GoogleMapsAPI,
                libraries: ['drawing', 'places'].join(','),
            }}
            center={props.center}
            zoom={props.zoom}
            draggable={props.draggable}
            options={props.options}
            {...props}
            yesIWantToUseGoogleMapApiInternals
        >
            {children}
        </GoogleMapReact>
    </Wrapper>
);

Map.propTypes = propTypes;
Map.defaultProps = defaultProps;

export default Map;
