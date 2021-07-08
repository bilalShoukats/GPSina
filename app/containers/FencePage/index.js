/**
 *
 * FencePage
 *
 */

import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Helmet } from 'react-helmet';
import Geocode from "react-geocode";
import { SuperHOC } from '../../HOC';
import Header from '../../components/Header';
import { Button, Divider, Drawer, Grid, Input, Switch, Typography } from '@material-ui/core';
import { useStyles } from './styles.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCircle, faHandPaper, faPencilAlt, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';

import messages from './messages';
import Map from '../../components/Map';

import mapIcon from '../../../assets/images/icons/map.png';
import Img from '../../components/Img';
import { GoogleMapsAPI, height, LATITUDE, LONGITUDE, width } from '../../constants/maps';
import { withStyles } from '@material-ui/styles';
import {
  Marker,
} from 'react-google-maps';

Geocode.setApiKey(GoogleMapsAPI);
Geocode.enableDebug();

class FencePage extends Component{
  constructor(props){
    super(props);
    this.state = {
      coordinate: {
        lat: LATITUDE,
        lng: LONGITUDE
      },
      isMarkerShown: true,
      isOpenDrawer: false,
      mapType: 'roadmap',
      fenceSwitch: false,
      searchPlace: '',
      showSearchPlace: false,
    }
  }

  handleFenceSwitch = (event) => {
    // console.log(event.target.checked);
    this.setState({
      fenceSwitch: event.target.checked
    });
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;

    switch (name) {
      case 'searchPlace':
        this.setState({
          searchPlace: value
        });
        break;
    }

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

  handleMarkerClick = () => {
    this.setState({
      isMarkerShown: !this.state.isMarkerShown
    });
    // console.log('isMarkerShown', isMarkerShown);
  };

  toggleDrawer = () => {
    this.setState({
      isOpenDrawer: !this.state.isOpenDrawer
    });
  };

  handleShowSearchPlace = (newState) => {
    this.setState({
      showSearchPlace: newState
    });
  };

  getPlaceCoordinate = (venue) => {
    // Get latitude & longitude from address.
    Geocode.fromAddress(venue).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log('venue', venue);
        console.log(lat, lng);
        let newCoordinate = this.state.coordinate;
        newCoordinate.lat = lat;
        newCoordinate.lng = lng;
        this.setState({
          coordinate: {
            lat: lat,
            lng: lng
          }
        });
        console.log(this.state.coordinate);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  handleSearchPlace = () => {
    if(this.state.searchPlace.length > 0){
      this.getPlaceCoordinate(this.state.searchPlace);
    }
  }

  render(){
    const {
      coordinate,
      isMarkerShown,
      isOpenDrawer,
      mapType,
      fenceSwitch,
      searchPlace,
      showSearchPlace,
    } = this.state;
    const { classes } = this.props;

    return (
      <div>
        <Helmet>
          <title>{this.props.intl.formatMessage({...messages.fence})}</title>
        </Helmet>
        <Header title={<FormattedMessage {...messages.fence} />} showFenceBtn />

        <div>
          <Grid
            container
            style={{ width: width, height: height }}
          >
            <Drawer
              open={isOpenDrawer}
              onClose={this.toggleDrawer}
              variant="temporary"
              classes={{ paper: classes.paper }}
            >
              <div 
                className={classes.drawer}
                onClick={this.toggleDrawer}
              >
                <Typography variant="body1" className={classes.textTitleStyle} align="center">
                  <FormattedMessage {...messages.fence} />
                </Typography>
                <Divider className={classes.dividerTitle} />
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  align="center"
                  className={classes.drawerItemContainer}
                >
                  <Typography variant="body2" className={classes.textStyle} onClick={() => console.log('show this fence')}>
                    <FormattedMessage {...messages.fenceName} />
                  </Typography>
                  <FontAwesomeIcon
                    icon={faPencilAlt}
                    color="green"
                    size="md"
                    onClick={() => console.log('pencil clicked')}
                  />
                </Grid>
                <Divider className={classes.divider} />
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  align="center"
                  className={classes.drawerItemContainer}
                >
                  <Typography variant="body2" className={classes.textStyle} onClick={() => console.log('see ll fence')}>
                    <FormattedMessage {...messages.seeAllFence} />
                  </Typography>
                  <div />
                </Grid>
                <Divider className={classes.divider} />
              </div>
            </Drawer>
            <Grid item xs>
              <div>
                <Grid
                  container
                  direction="row"
                  className={classes.topHeaderLeft}
                >
                  <Button className={classes.btnMenu} onClick={this.toggleDrawer}>
                    <FontAwesomeIcon
                      icon={faBars}
                      color="#FFFFFF"
                      size="lg"
                    />
                  </Button>
                  <Switch
                    checked={fenceSwitch}
                    onChange={this.handleFenceSwitch}
                    name="fenceSwitch"
                    className={classes.switch}
                  >
                    <Typography variant="body1" className={classes.title}>
                      <FormattedMessage {...messages.fence} />
                    </Typography>
                  </Switch>
                </Grid>
                <Grid
                  container
                  direction="row"
                  className={classes.topHeaderRight}
                >
                  {showSearchPlace ? 
                    <div className={classes.searchInput}>
                      <Input
                        id="searchPlace"
                        type="text"
                        name="searchPlace"
                        className={classes.textfield}
                        value={searchPlace}
                        onChange={this.handleChange}
                        disableUnderline
                      />
                      <FontAwesomeIcon
                        icon={faSearch}
                        color="#FFFFFF"
                        style={{ marginLeft: '5px', cursor: 'pointer' }}
                        onClick={this.handleSearchPlace}
                        size="lg"
                      />
                    </div>
                    : <div />
                  }
                  <Button className={classes.btnGrey} onClick={this.handleMapTypeClick}>
                    {/* <Typography variant="body1" className={classes.title}>
                      <FormattedMessage {...messages.fence} />
                    </Typography> */}
                    <Img
                      src={mapIcon}
                      className={classes.logo}
                      alt="Map icon"
                    />
                  </Button>
                  <Button className={classes.btnGrey} onClick={() => this.handleShowSearchPlace(!showSearchPlace)}>
                    {/* <Typography variant="body1" className={classes.title}>
                      <FormattedMessage {...messages.fence} />
                    </Typography> */}
                    <FontAwesomeIcon
                      icon={!showSearchPlace ? faSearch : faTimes}
                      color="#FFFFFF"
                      size="lg"
                    />
                  </Button>
                  <Button className={classes.btn}>
                    {/* <Typography variant="body1" className={classes.title}>
                      <FormattedMessage {...messages.fence} />
                    </Typography> */}
                    <FontAwesomeIcon
                      icon={faHandPaper}
                      color="lightgrey"
                      size="lg"
                    />
                  </Button>
                  <Button className={classes.btn} size="small">
                    <FontAwesomeIcon
                      icon={faCircle}
                      color="#28ACEA"
                      size="lg"
                    />
                  </Button>
                </Grid>
              </div>
              <Map
                showMapTypeControl={false}
                showFullScreenControl={false}
                showStreetViewControl={false}
                mapTypeId={mapType}
                center={coordinate}
              >
                { isMarkerShown &&
                  <Marker position={coordinate} onClick={this.handleMarkerClick} />
                }
              </Map>
            </Grid>
          </Grid>
        </div>
      </div>
    )
  }
}

FencePage.propTypes = {
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

export default SuperHOC((withConnect)(injectIntl(withStyles(useStyles)(FencePage))));
