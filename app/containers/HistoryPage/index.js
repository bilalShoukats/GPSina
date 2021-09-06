/**
 *
 * HistoryPage
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Helmet } from 'react-helmet';
import { withStyles } from '@material-ui/styles';
import { Button, Grid, Typography } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedoAlt, faTrafficLight } from '@fortawesome/free-solid-svg-icons';


import Header from '../../components/Header';
import Img from '../../components/Img';
import { height, LATITUDE, LONGITUDE, width } from '../../constants/maps';
import Map from '../../components/Map';
import { useStyles } from './styles.js';
import messages from './messages';

import mapIcon from '../../../assets/images/icons/map.png';
import speedBgIcon from '../../../assets/images/icons/speedBg.png';
import SCREENS from '../../constants/screen';

class HistoryPage extends Component{
  constructor(props){
    super(props);
    this.state = {
      mapType: 'roadmap',
      coordinate: {
        lat: LATITUDE,
        lng: LONGITUDE
      },
      startTime: '9.30 AM',
      endTime: '11.00 AM',
    }
    this.mapRef = null;
  }

  componentDidMount = () => {
    console.log(this.props.location.state);
  }

  // Refer to https://github.com/google-map-react/google-map-react#use-google-maps-api
  handleApiLoaded = (map, google) => {
    console.log('map', map);
    console.log('google', google);

  }

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
      startTime,
      endTime
    } = this.state;
    const { classes } = this.props;
    const mapOptions = {
      panControl: true,
      mapTypeControl: false,
      fullscreenControl: true,
      streetViewControl: true,
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
          <title>{this.props.intl.formatMessage({...messages.history})}</title>
        </Helmet>
        <Header title={<FormattedMessage {...messages.history} />} showHistoryBtn/>

        <div>
          <Grid
            container
            style={{ width: width, height: height }}
          >
            <Grid item xs>
              <div>
                <Grid
                  container
                  direction="row"
                  className={classes.topHeaderLeft}
                  alignItems="center"
                >
                  <Button className={classes.btn} onClick={this.handleMapTypeClick}>
                    <Img
                      src={mapIcon}
                      className={classes.icon}
                      alt="Map Icon"
                    />
                  </Button>
                </Grid>
                <Grid
                container
                direction="row"
                className={classes.topHeaderRight}
                alignItems="center"
                >
                  <Typography variant="body1" className={classes.textStyle}>
                    <FormattedMessage {...messages.from} />
                  </Typography>
                  <Button className={classes.rightHeaderBtn}>
                    <Typography variant="body2">
                      {startTime}
                    </Typography>
                  </Button>
                  <Typography variant="body1" className={classes.textStyle}>
                    <FormattedMessage {...messages.to} />
                  </Typography>
                  <Button className={classes.rightHeaderBtn}>
                    <Typography variant="body2">
                      {endTime}
                    </Typography>
                  </Button>
                </Grid>
              </div>
              <Map
                options={mapOptions}
                center={coordinate}
                ref={(ref) => { this.mapRef.current = ref }}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps)}
              ></Map>
            </Grid>
          </Grid>
        </div>
      </div>
    )
  }
}

HistoryPage.propTypes = {
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

export default (withConnect)(injectIntl(withStyles(useStyles)(HistoryPage)));
