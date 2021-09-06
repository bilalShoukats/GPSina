/**
 *
 * FencePage
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Helmet } from 'react-helmet';
import Geocode from "react-geocode";
import Header from '../../components/Header';
import { Button, CircularProgress, Divider, Drawer, Grid, Input, Switch, Typography } from '@material-ui/core';
import { useStyles } from './styles.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCircle, faHandPaper, faPencilAlt, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';

import messages from './messages';
import Map from '../../components/Map';

import mapIcon from '../../../assets/images/icons/map.png';
import Img from '../../components/Img';
import { GoogleMapsAPI, height, LATITUDE, LONGITUDE, PADDING, width } from '../../constants/maps';
import { withStyles } from '@material-ui/styles';
import { fenceList } from '../../constants/dummy';
import APIURLS from '../../ApiManager/apiUrl';
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

      createFence: false, // Indicate user is now creating the fence
      isFenceMode: false,
      radius: 0,
      fenceName: '',
      newFence: null,
      startPos: { x: 0, y: 0 },
      fences: [], // list of all available fences

      showAddFenceModal: false,
      showDeleteFenceModal: false,
      modalTitle: '',
      modalDesc: '',
      editing: null,
      loading: true,
    };

    this.mapRef = null;
    this.circleRef = [];
    this.markerRef = [];
  }

  componentDidMount = () => {
    console.log('ComponentDidMount - Fence');
    this.getAllFence();
  }

  // Refer to https://github.com/google-map-react/google-map-react#use-google-maps-api
  handleApiLoaded = (map, google, places) => {
    // console.log('map', map);
    console.log('google', google);
    // console.log('places', places);
    var radius = 0;
    var circle;
    var newFence = { lat: 0, lng: 0 };
    const circleFence = [];
    const markers = [];
    var bounds = new google.LatLngBounds();

    places.forEach((place) => {
      circleFence.push(new google.Circle({
        strokeColor: '#28ACEA',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#545B62',
        fillOpacity: 0.8,
        map: map,
        center: new google.LatLng(place.location.coordinates[0], place.location.coordinates[1]),
        radius: place.fenceRadius,
        title: place.fenceName,
      }));

      markers.push(new google.Marker({
        position: new google.LatLng(place.location.coordinates[0], place.location.coordinates[1]),
        map,
        title: place.fenceName,
        label: {
          text: place.fenceName,
          color: '#FF6700',
          fontWeight: 'bold'
        },
        icon: 'none',
        labelOrigin: new google.Point(0,0),
      }));
    });

    circleFence.forEach((fence, i) => {
      bounds.union(fence.getBounds());
      google.event.addListener(fence, 'click', function() {
        // console.log(fence, i);
        map.setZoom(12);
        map.panTo(fence.getCenter());
      });
    });

    markers.forEach((marker, i) => {
      google.event.addListener(marker, 'click', function() {
        console.log(marker, i);
        // infoWindow.close();
        // infoWindow.setContent(marker.getTitle());
        // infoWindow.open(map, marker)
        // map.panTo(marker.getPosition());
      });
    });

    const geocoder = new google.Geocoder();

    const drawingManager =  new google.drawing.DrawingManager({
      drawingControl: true,
      drawingControlOptions: {
        position: google.ControlPosition.TOP_RIGHT,
        drawingModes: [
          google.drawing.OverlayType.CIRCLE,
        ],
      },
      circleOptions: {
        fillColor: "#28ACEA",
        fillOpacity: 0.2,
        strokeColor: '#28ACEA',
        strokeWeight: 2,
        clickable: true,
        zIndex: 1,
      },
    });

    google.event.addListener(drawingManager, 'circlecomplete', function(event) {
      radius = event.getRadius().toFixed(0),
      newFence.lat = event.getCenter().lat().toFixed(3);
      newFence.lng = event.getCenter().lng().toFixed(3);
      console.log(newFence, radius);
      console.log('circle', circle);
      if(circle != null){
        circle.setMap(null);
      }

      circle = event;
    });
    
    // console.log(document.getElementById('seeAllFence'));

    // google.event.addDomListener(document.getElementById('seeAllFence'), 'click', () => this.seeAllFence(map, bounds, google));
    google.event.addDomListener(document.getElementById('searchPlace'), 'click', () => this.getPlaceCoordinate(geocoder, map, google))

    drawingManager.setMap(map);
    map.fitBounds(bounds, PADDING);

    this.setState({
      radius: radius,
      newFence: newFence
    });
    console.log(radius, newFence);
  };

  seeAllFence = (map, bounds, google) => {
    console.log('see All fence')
    // map.fitBounds(bounds, PADDING);
    google.event.trigger(map, 'resize');
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

  getPlaceCoordinate = (geoCoder, map, google) => {
    console.log('searchPlace', this.state.searchPlace)
    geoCoder
      .geocode({ address: this.state.searchPlace })
      .then(({ results }) => {
        console.log('results', results);
        map.setCenter(results[0].geometry.location);
        new google.Marker({
          map: map,
          position: results[0].geometry.location,
        });
        this.setState({
          showSearchPlace: false
        })
      })
      .catch((e) => {
        alert("Geocode was not successful for the following reason: " + e);
        this.setState({
          showSearchPlace: false
        })
      });
  }

  getAllFence = async () => {
    this.props.apiManager.callApi(APIURLS.getAllGeoFence, 'GET', null, res => {
      console.log(res);
      if(res.code == '1019'){
        this.setState({
          fences: res.response,
          coordinate: {
            lat: res.response[0].location.coordinates[0],
            lng: res.response[0].location.coordinates[1]
          },
          loading: false
        })
      }
    })
  }

  render(){
    const {
      fences,
      coordinate,
      isOpenDrawer,
      fenceSwitch,
      searchPlace,
      showSearchPlace,
      isFenceMode,
      loading
    } = this.state;
    const { classes } = this.props;
    const mapOptions = {
      panControl: true,
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false,
      scrollwheel: true,
      mapTypeId: 'roadmap'
    };

    if(this.state.isFenceMode) {
      mapOptions.panControl = false,
      mapOptions.zoomControl = false
    };

    if(this.state.mapType == 'hybrid'){
      mapOptions.mapTypeId = 'hybrid';
    } else {
      mapOptions.mapTypeId = 'roadmap';
    }

    return (
      loading ?
        <Grid
          style={{ width: width, height: height }}
          container
          justify="center"
          alignItems="center"
        >
          <CircularProgress
            className={classes.loadingSpinner}
            size="4rem"
            thickness={5}
          />
        </Grid>
      :
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
            <div id="seeAllFence" style={{ visibility: 'hidden'}} />
            <Drawer
              open={isOpenDrawer}
              onClose={this.toggleDrawer}
              variant="temporary"
              classes={{ paper: classes.paper }}
              style={isOpenDrawer ? {visibility: 'visible'} : {visibility: 'none'}}
            >
              <div 
                className={classes.drawer}
                onClick={this.toggleDrawer}
              >
                <Typography variant="body1" className={classes.textTitleStyle} align="center">
                  <FormattedMessage {...messages.fence} />
                </Typography>
                <Divider className={classes.dividerTitle} />
                  {fences.map((fence) => (
                    <>
                      <Grid
                        container
                        direction="row"
                        justify="space-between"
                        align="center"
                        className={classes.drawerItemContainer}
                      >
                        <Typography 
                          variant="body2" 
                          className={classes.textStyle} 
                          onClick={() => this.setState({ 
                            coordinate: { 
                              lat: fence.location.coordinates[0], 
                              lng: fence.location.coordinates[1] 
                            }
                          })}
                        >
                          {fence.fenceName}
                        </Typography>
                        <FontAwesomeIcon
                          icon={faPencilAlt}
                          color="green"
                          size="md"
                          onClick={() => console.log('pencil clicked')}
                        />
                      </Grid>
                      <Divider className={classes.divider} />
                    </>
                  ))}
                <Grid
                  container
                  direction="row"
                  align="center"
                  className={classes.drawerItemContainer}
                >
                  <Button id="seeAllFence" className={classes.btnDrawer}>
                    <Typography variant="body2" className={classes.textStyle}>
                      <FormattedMessage {...messages.seeAllFence} />
                    </Typography>
                  </Button>
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
                  <div className={classes.searchInput} style={ showSearchPlace ? { visibility: 'visible' } : { visibility: 'hidden'}}>
                    <Input
                      type="text"
                      name="searchPlace"
                      className={classes.textfield}
                      value={searchPlace}
                      onChange={this.handleChange}
                      disableUnderline
                    />
                    <Button className={classes.searchBtn} id="searchPlace">
                      <FontAwesomeIcon
                        icon={faSearch}
                        color="#FFFFFF"
                        style={{ marginLeft: '5px', cursor: 'pointer' }}
                        size="lg"
                      />
                    </Button>
                  </div>
                  <Button className={classes.btnGrey} onClick={this.handleMapTypeClick}>
                    <Img
                      src={mapIcon}
                      className={classes.logo}
                      alt="Map icon"
                    />
                  </Button>
                  <Button className={classes.btnGrey} onClick={() => this.handleShowSearchPlace(!showSearchPlace)}>
                    <FontAwesomeIcon
                      icon={!showSearchPlace ? faSearch : faTimes}
                      color="#FFFFFF"
                      size="lg"
                    />
                  </Button>
                </Grid>
              </div>
              <Map
                draggable={!isFenceMode}
                options={mapOptions}
                resetBoundsOnResize
                center={coordinate}
                ref={(ref) => { this.mapRef.current = ref }}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps, fences)}
              >
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

export default (withConnect)(injectIntl(withStyles(useStyles)(FencePage)));
