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
import { fenceList } from '../../constants/dummy';
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
      fences: fenceList, // list of all available fences

      showAddFenceModal: false,
      showDeleteFenceModal: false,
      modalTitle: '',
      modalDesc: '',
      editing: null,
    };

    this.mapRef = null;
    this.circleRef = [];
    this.markerRef = [];
    this.handleSearchPlace = this.handleSearchPlace.bind(this);
  }

  // Refer to https://github.com/google-map-react/google-map-react#use-google-maps-api
  handleApiLoaded = (map, google, places) => {
    console.log('map', map);
    console.log('google', google);
    console.log('places', places);
    var radius = 0;
    var circle;
    var newFence = { lat: 0, lng: 0 };
    const circleFence = [];
    const markers = [];

    places.forEach((place) => {
      circleFence.push(new google.Circle({
        strokeColor: '#28ACEA',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#545B62',
        fillOpacity: 0.8,
        map: map,
        center: new google.LatLng(place.coordinates[0].lat, place.coordinates[0].lng),
        radius: place.radius,
        title: place.name,
      }));

      markers.push(new google.Marker({
        position: new google.LatLng(place.coordinates[0].lat, place.coordinates[0].lng),
        map,
        title: place.name,
        label: {
          text: place.name,
          color: '#FF6700',
          fontWeight: 'bold'
        },
        icon: 'none',
        labelOrigin: new google.Point(0,0),
      }));
    });

    circleFence.forEach((fence, i) => {
      google.event.addListener(fence, 'click', function() {
        // console.log(fence, i);
        map.setZoom(12);
        map.panTo(fence.getCenter());
      });
    });

    markers.forEach((marker, i) => {
      google.event.addListener(marker, 'click', function() {
        // console.log(marker, i);
        // infoWindow.close();
        // infoWindow.setContent(marker.getTitle());
        // infoWindow.open(map, marker)
        // map.panTo(marker.getPosition());
      });
    });

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

    drawingManager.setMap(map);

    this.setState({
      radius: radius,
      newFence: newFence
    });
    console.log(radius, newFence);
  };

  finish = async () => {
    const { fences, editing } = this.state;
    editing.radius = this.state.radius;
    editing.name = this.state.fenceName;
    this.setState({
      fences: [...fences, editing],
    }, console.log('fences', this.state.fences));
    this.clear();
  }

  getRadius = (startingPoint, endPoint) => {
    if (startingPoint === undefined || endPoint === undefined) return 0;
    let radius = Math.abs(endPoint.x - startingPoint.x);
    return radius;
  }

  // Reset editing state
  clear = () => {
    this.setState({
      editing: null,
      createFence: false,
      radius: 0
    })
  }

  onPan = (e) => {
    if(this.state.isFenceMode){
      let { lat, lng, x, y } = e;
      const { editing, createFence } = this.state;
      const postion = { x: x, y: y };
      const coordinates = { lat: lat, lng: lng };
      console.log(e);
      
      if (!editing) {
        // console.log('!editing', this.state.editing)
        this.setState({
          editing: {
            coordinates: coordinates,
            startPos: position
          },
          createFence: true,
          startPos: position
        })
      } else {
        if(createFence){
          const radiusFromCurrentPoint = this.getRadius(this.state.startPos, position);
          const radiusCircle = this.state.radius / this.state.dragMultiplier;

          // Check if the radius different is less than 100, assume the existing circle to be resize, else will be reset and form new circle
        if((Math.abs(radiusFromCurrentPoint - radiusCircle) < 100)){
          this.setState({
            editing: {
              ...editing,
              coordinates: [...editing.coordinates, coordinates]
            },
            radius: this.getRadius(this.state.startPos, position) * this.state.dragMultiplier
          })
        } else {
          this.clear();
        }
        }
      }
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

  handleIsFenceMode = (state) => {
    this.setState({
      isFenceMode: state
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
        console.log(this.state.coordinate);
        let newCoordinate = this.state.coordinate;
        newCoordinate.lat = lat;
        newCoordinate.lng = lng;
        this.setState({
          coordinate: newCoordinate
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
      fences,
      coordinate,
      isOpenDrawer,
      fenceSwitch,
      searchPlace,
      showSearchPlace,
      isFenceMode,
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
                </Grid>
              </div>
              <Map
                draggable={!isFenceMode}
                options={mapOptions}
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

export default SuperHOC((withConnect)(injectIntl(withStyles(useStyles)(FencePage))));
