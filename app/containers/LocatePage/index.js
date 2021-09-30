/**
 *
 * LocatePage
 *
 */
import messages from './messages';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import Img from '../../components/Img';
import Map from '../../components/Map';
import { useStyles } from './styles.js';
import React, { Component } from 'react';
import Header from '../../components/Header';
import Car from '../../components/Marker/car';
import { withStyles } from '@material-ui/styles';
import { FormattedMessage, injectIntl } from 'react-intl';
import mapIcon from '../../../assets/images/icons/map.png';
import { Button, Grid, Typography } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gpsRedIcon from '../../../assets/images/icons/gps-red.png';
import gsmEmptyIcon from '../../../assets/images/icons/gsm_0.png';
import gsmOneBarIcon from '../../../assets/images/icons/gsm_1.png';
import speedBgIcon from '../../../assets/images/icons/speedBg.png';
import gsmTwoBarIcon from '../../../assets/images/icons/gsm_2.png';
import gsmFullBarIcon from '../../../assets/images/icons/gsm_4.png';
import gsmThreeBarIcon from '../../../assets/images/icons/gsm_3.png';
import gpsGreenIcon from '../../../assets/images/icons/gps-green.png';
import { height, LATITUDE, LONGITUDE, width } from '../../constants/maps';
import { faRedoAlt, faTrafficLight } from '@fortawesome/free-solid-svg-icons';

import SampleGPSData from '../../components/Marker/points';
const gps = new SampleGPSData();

class LocatePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gsmStatus: 0,
            marker: true,
            carWidth: 30,
            carHeight: 16,
            mapType: 'roadmap',
            gpsStatus: false,
            coordinate: {
                lat: LATITUDE,
                lng: LONGITUDE,
            },
        };
        this.mapRef = null;
        this.velocity = 100;
        this.initialDate = new Date();
    }

    // Refer to https://github.com/google-map-react/google-map-react#use-google-maps-api
    handleApiLoaded = async (map, google) => {
        const trafficLayer = new google.TrafficLayer();
        google.event.addDomListener(
            document.getElementById('trafficToggle'),
            'click',
            () => this.toggleTrafficLayer(trafficLayer, map),
        );
        setTimeout(() => this.socketInit(), 2000);
        setTimeout(() => this.socketInit(), 3000);
        setTimeout(() => this.socketInit(), 4000);
        setTimeout(() => this.socketInit(), 5000);
        setTimeout(() => this.socketInit(), 6000);
        setTimeout(() => this.socketInit(), 7000);
        setTimeout(() => this.socketInit(), 8000);
        setTimeout(() => this.socketInit(), 9000);
        setTimeout(() => this.socketInit(), 10000);
        setTimeout(() => this.socketInit(), 11000);
        setTimeout(() => this.socketInit(), 12000);
        setTimeout(() => this.socketInit(), 13000);
        setTimeout(() => this.socketInit(), 14000);
        setTimeout(() => this.socketInit(), 15000);
        setTimeout(() => this.socketInit(), 16000);
        setTimeout(() => this.socketInit(), 17000);
        setTimeout(() => this.socketInit(), 18000);
        setTimeout(() => this.socketInit(), 19000);
    };

    socketInit = () => {
        let point = gps.getNextLatLong();
        this.calculateHeading(point, false);
    };

    renderMarker = (map, maps) => {
        return new maps.Marker({
            icon: {
                path:
                    'M29.395,0H17.636c-3.117,0-5.643,3.467-5.643,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759   c3.116,0,5.644-2.527,5.644-5.644V6.584C35.037,3.467,32.511,0,29.395,0z M34.05,14.188v11.665l-2.729,0.351v-4.806L34.05,14.188z    M32.618,10.773c-1.016,3.9-2.219,8.51-2.219,8.51H16.631l-2.222-8.51C14.41,10.773,23.293,7.755,32.618,10.773z M15.741,21.713   v4.492l-2.73-0.349V14.502L15.741,21.713z M13.011,37.938V27.579l2.73,0.343v8.196L13.011,37.938z M14.568,40.882l2.218-3.336   h13.771l2.219,3.336H14.568z M31.321,35.805v-7.872l2.729-0.355v10.048L31.321,35.805z',
                fillColor: 'green',
                fillOpacity: 1,
                strokeWeight: 0,
                scale: 0.5,
                anchor: new google.maps.Point(15, 30),
            },
            map,
            title: 'Car',
            optimized: true,
            position: this.state.coordinate,
            animation: google.maps.Animation.DROP,
        });
    };

    calculateHeading = (point, marker) => {
        let point1 = this.state.coordinate;
        let point2 = point;
        const point1LatLng = new window.google.maps.LatLng(
            point1.lat,
            point1.lng,
        );
        const point2LatLng = new window.google.maps.LatLng(
            point2.lat,
            point2.lng,
        );

        const angle = window.google.maps.geometry.spherical.computeHeading(
            point1LatLng,
            point2LatLng,
        );
        const actualAngle = angle - 90;
        if (marker) {
            this.marker.setIcon({
                path:
                    'M29.395,0H17.636c-3.117,0-5.643,3.467-5.643,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759   c3.116,0,5.644-2.527,5.644-5.644V6.584C35.037,3.467,32.511,0,29.395,0z M34.05,14.188v11.665l-2.729,0.351v-4.806L34.05,14.188z    M32.618,10.773c-1.016,3.9-2.219,8.51-2.219,8.51H16.631l-2.222-8.51C14.41,10.773,23.293,7.755,32.618,10.773z M15.741,21.713   v4.492l-2.73-0.349V14.502L15.741,21.713z M13.011,37.938V27.579l2.73,0.343v8.196L13.011,37.938z M14.568,40.882l2.218-3.336   h13.771l2.219,3.336H14.568z M31.321,35.805v-7.872l2.729-0.355v10.048L31.321,35.805z',
                fillColor: 'green',
                fillOpacity: 1,
                strokeWeight: 0,
                transform:
                    'matrix(6.123233995736766e-17,1,-1,6.123233995736766e-17,47.03200149536133,0)',
                rotation: actualAngle,
                scale: 0.5,
                anchor: new google.maps.Point(8, 15),
            });
            this.marker.setPosition(point2LatLng);
        } else {
            const marker = document
                .querySelector(
                    `[src="${require('../../../assets/images/icons/car_green.png')}"]`,
                )
                .closest('div');

            if (marker) {
                marker.style.transform = `rotate(${actualAngle}deg)`;
            }
            this.setState({
                coordinate: {
                    lat: point2LatLng.lat(),
                    lng: point2LatLng.lng(),
                },
            });
        }
    };

    onMapChange = (center, zoom, bounds, marginBounds) => {
        // const marker = document.querySelector(
        //     `[src="${require('../../../assets/images/icons/car_green.png')}"]`,
        // );
        // if (marker) {
        //     marker.style.width = `${Math.round((219 * zoom) / 100)}`;
        //     marker.style.width = `${Math.round((100 * zoom) / 100)}`;
        // }
    };

    toggleTrafficLayer = (trafficLayer, map) => {
        if (trafficLayer.getMap() == null) {
            trafficLayer.setMap(map);
        } else {
            trafficLayer.setMap(null);
        }
    };

    handleMapTypeClick = () => {
        if (this.state.mapType == 'roadmap') {
            this.setState({
                mapType: 'hybrid',
            });
        } else {
            this.setState({
                mapType: 'roadmap',
            });
        }
    };

    render() {
        const { coordinate, gsmStatus, gpsStatus } = this.state;
        const { classes } = this.props;
        const mapOptions = {
            panControl: true,
            mapTypeControl: false,
            // fullscreenControl: false,
            streetViewControl: false,
            scrollwheel: true,
            mapTypeId: 'roadmap',
        };

        if (this.state.mapType == 'hybrid') {
            mapOptions.mapTypeId = 'hybrid';
        } else {
            mapOptions.mapTypeId = 'roadmap';
        }

        return (
            <div>
                <Helmet>
                    <title>
                        {this.props.intl.formatMessage({ ...messages.locate })}
                    </title>
                </Helmet>
                <Header title={<FormattedMessage {...messages.locate} />} />

                <div>
                    <Grid container style={{ width: width, height: height }}>
                        <Grid
                            container
                            direction="row"
                            className={classes.header}
                            justify="space-between"
                            alignItems="center"
                        >
                            <div>
                                <Button className={classes.btn}>
                                    <Img
                                        src={
                                            gsmStatus == 0
                                                ? gsmEmptyIcon
                                                : gsmStatus == 1
                                                ? gsmOneBarIcon
                                                : gsmStatus == 2
                                                ? gsmTwoBarIcon
                                                : gsmStatus == 3
                                                ? gsmThreeBarIcon
                                                : gsmFullBarIcon
                                        }
                                        className={classes.icon}
                                        alt="Gsm Line Speed"
                                    />
                                </Button>
                                <Button className={classes.btn}>
                                    <Img
                                        src={
                                            gpsStatus
                                                ? gpsGreenIcon
                                                : gpsRedIcon
                                        }
                                        className={classes.icon}
                                        alt="Gsm Line Speed"
                                    />
                                </Button>
                            </div>
                            <div>
                                <Button className={classes.btn}>
                                    <FontAwesomeIcon
                                        icon={faRedoAlt}
                                        color="#FFFFFF"
                                        size="lg"
                                    />
                                </Button>
                                <Button
                                    className={classes.btn}
                                    id="trafficToggle"
                                >
                                    <FontAwesomeIcon
                                        icon={faTrafficLight}
                                        color="#FFFFFF"
                                        size="lg"
                                    />
                                </Button>
                                <Button
                                    className={classes.btn}
                                    onClick={this.handleMapTypeClick}
                                >
                                    <Img
                                        src={mapIcon}
                                        className={classes.icon}
                                        alt="Map Icon"
                                    />
                                </Button>
                            </div>
                        </Grid>
                        <Grid container className={classes.mapContainer}>
                            <Map
                                zoom={15}
                                options={mapOptions}
                                center={coordinate}
                                ref={ref => {
                                    this.mapRef.current = ref;
                                }}
                                onChange={({
                                    center,
                                    zoom,
                                    bounds,
                                    marginBounds,
                                }) =>
                                    this.onMapChange(
                                        center,
                                        zoom,
                                        bounds,
                                        marginBounds,
                                    )
                                }
                                onGoogleApiLoaded={({ map, maps }) =>
                                    this.handleApiLoaded(map, maps)
                                }
                            >
                                {this.state.marker && (
                                    <Car
                                        key={0}
                                        width={this.state.carWidth}
                                        height={this.state.carHeight}
                                        lat={this.state.coordinate.lat}
                                        lng={this.state.coordinate.lng}
                                    />
                                )}
                            </Map>
                            <Img
                                src={speedBgIcon}
                                className={classes.speedIcon}
                                alt="Speed Icon"
                            />
                            <Typography
                                variant="h4"
                                className={classes.speedText}
                            >
                                120
                            </Typography>
                            <Typography
                                variant="body2"
                                className={classes.speedMeterText}
                            >
                                <FormattedMessage {...messages.kmh} />
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}

LocatePage.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(
    null,
    mapDispatchToProps,
);

export default withConnect(injectIntl(withStyles(useStyles)(LocatePage)));
