/**
 *
 * LocatePage
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Helmet } from 'react-helmet';
import { withStyles } from '@material-ui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedoAlt, faTrafficLight } from '@fortawesome/free-solid-svg-icons';
import { Button, Grid, Typography } from '@material-ui/core';

import { SuperHOC } from '../../HOC';
import Header from '../../components/Header';
import Img from '../../components/Img';
import { height, LATITUDE, LONGITUDE, width } from '../../constants/maps';
import Map from '../../components/Map';
import { useStyles } from './styles.js';

import gsmEmptyIcon from '../../../assets/images/icons/gsm_0.png';
import gsmOneBarIcon from '../../../assets/images/icons/gsm_1.png';
import gsmTwoBarIcon from '../../../assets/images/icons/gsm_2.png';
import gsmThreeBarIcon from '../../../assets/images/icons/gsm_3.png';
import gsmFullBarIcon from '../../../assets/images/icons/gsm_4.png';
import gpsGreenIcon from '../../../assets/images/icons/gps-green.png';
import gpsRedIcon from '../../../assets/images/icons/gps-red.png';
import mapIcon from '../../../assets/images/icons/map.png';
import speedBgIcon from '../../../assets/images/icons/speedBg.png';

import messages from './messages';

class LocatePage extends Component{
  constructor(props){
    super(props);
    this.state = {
      mapType: 'roadmap',
      gsmStatus: 0,
      gpsStatus: false,
      coordinate: {
        lat: LATITUDE,
        lng: LONGITUDE
      },
      showTrafficLayer: true
    }
    this.mapRef = null;
  }

  // Refer to https://github.com/google-map-react/google-map-react#use-google-maps-api
  handleApiLoaded = (map, google) => {
    console.log('map', map);
    console.log('google', google);

    const trafficLayer = new google.TrafficLayer();
    // trafficLayer.setMap(map);

    google.event.addDomListener(document.getElementById('trafficToggle'), 'click', () => this.toggleTrafficLayer(trafficLayer, map));
  }

  toggleTrafficLayer = (trafficLayer, map) => {
    if(trafficLayer.getMap() == null){
      trafficLayer.setMap(map);
    } else {
      trafficLayer.setMap(null);
    }
  };

  handleMapTypeClick = () => {
    if(this.state.mapType == 'roadmap'){
      this.setState({
        mapType: 'hybrid'
      });
    } else {
      this.setState({
        mapType: 'roadmap'
      });
    }
  }

  render(){
    const {
      coordinate,
      gsmStatus,
      gpsStatus
    } = this.state;
    const { classes } = this.props;
    const mapOptions = {
      panControl: true,
      mapTypeControl: false,
      // fullscreenControl: false,
      streetViewControl: false,
      scrollwheel: true,
      mapTypeId: 'roadmap'
    };

    if(this.state.mapType == 'hybrid'){
      mapOptions.mapTypeId = 'hybrid';
    } else {
      mapOptions.mapTypeId = 'roadmap';
    }

    return (
      <div>
        <Helmet>
          <title>{this.props.intl.formatMessage({...messages.locate})}</title>
        </Helmet>
        <Header title={<FormattedMessage {...messages.locate} />} />

        <div>
          <Grid
            container
            style={{ width: width, height: height }}
          >
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
                      gsmStatus == 0 ? gsmEmptyIcon : 
                      gsmStatus == 1 ? gsmOneBarIcon : 
                      gsmStatus == 2 ? gsmTwoBarIcon : 
                      gsmStatus == 3 ? gsmThreeBarIcon : gsmFullBarIcon
                    }
                    className={classes.icon}
                    alt="Gsm Line Speed"
                  />
                </Button>
                <Button className={classes.btn}>
                  <Img
                    src={
                      gpsStatus ? gpsGreenIcon : gpsRedIcon
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
                <Button className={classes.btn} id="trafficToggle">
                  <FontAwesomeIcon
                    icon={faTrafficLight}
                    color="#FFFFFF"
                    size="lg"
                  />
                </Button>
                <Button className={classes.btn} onClick={this.handleMapTypeClick}>
                  <Img
                    src={mapIcon}
                    className={classes.icon}
                    alt="Map Icon"
                  />
                </Button>
              </div>
            </Grid>
            <Grid
              container
              className={classes.mapContainer}
            >
              <Map
                options={mapOptions}
                center={coordinate}
                ref={(ref) => { this.mapRef.current = ref }}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps)}
              >
              </Map>
              <Img
                src={speedBgIcon}
                className={classes.speedIcon}
                alt="Speed Icon"
              />
              <Typography variant="h4" className={classes.speedText}>
                120
              </Typography>
              <Typography variant="body2" className={classes.speedMeterText}>
                <FormattedMessage {...messages.kmh} />
              </Typography>
            </Grid>
          </Grid>
        </div>
      </div>
    )
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

export default SuperHOC((withConnect)(injectIntl(withStyles(useStyles)(LocatePage))));
