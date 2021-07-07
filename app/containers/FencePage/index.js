/**
 *
 * FencePage
 *
 */

import React, { useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { compose } from 'redux';
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
import { height, LATITUDE, LONGITUDE, width } from '../../constants/maps';

Geocode.setApiKey("AIzaSyAbq8yVUGOp7j7rCp2YJfRhYv5326OJZYg");
Geocode.enableDebug();

export function FencePage(props) {
  const classes = useStyles(props);
  const [coordinate, setCoordinate] = useState({ lat: LATITUDE, lng: LONGITUDE });
  const [isMarkerShown, setIsMarkerShown] = useState(true);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [mapType, setMapType] = useState('roadmap');
  const [fenceSwitch, setFenceSwitch] = useState(false);
  const [searchPlace, setSearchPlace] = useState('');
  const [showSearchPlace, setShowSearchPlace] = useState(false);

  const handlefenceSwitch = (event) => {
    // console.log(event.target.checked);
    setFenceSwitch(event.target.checked);
  }

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;

    switch (name) {
      case 'searchPlace':
        setSearchPlace(value);
        break;
    }

  }

  const handleMapTypeClick = () => {
    if(mapType == 'roadmap'){
      setMapType('hybrid');
    } else {
      setMapType('roadmap');
    }
  }

  const handleMarkerClick = () => {
    setIsMarkerShown(!isMarkerShown);
    // console.log('isMarkerShown', isMarkerShown);
  };

  const toggleDrawer = () => {
    setIsOpenDrawer(!isOpenDrawer);
  };

  const handleShowSearchPlace = (newState) => {
    setShowSearchPlace(newState);
  };

  const getPlaceCoordinate = (venue) => {
    // Get latitude & longitude from address.
    Geocode.fromAddress(venue).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log('venue', venue);
        console.log(lat, lng);
        let newCoordinate = coordinate;
        newCoordinate.lat = lat;
        newCoordinate.lng = lng;
        setCoordinate(newCoordinate);
        console.log(coordinate);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  const handleSearchPlace = (event) => {
    if(searchPlace.length > 0){
      console.log(searchPlace);
      getPlaceCoordinate(searchPlace);
    }
  }

  useEffect(() => {
    
  }, []);

  return (
    <div>
      <Helmet>
        <title>{props.intl.formatMessage({...messages.fence})}</title>
      </Helmet>
      <Header title={<FormattedMessage {...messages.fence} />} showFenceBtn />

      <div>
        <Grid
          container
          style={{ width: width, height: height }}
        >
          <Drawer
            open={isOpenDrawer}
            onClose={toggleDrawer}
            variant="temporary"
            classes={{ paper: classes.paper }}
          >
            <div 
              className={classes.drawer}
              onClick={toggleDrawer}
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
                <Button className={classes.btnMenu} onClick={toggleDrawer}>
                  <FontAwesomeIcon
                    icon={faBars}
                    color="#FFFFFF"
                    size="lg"
                  />
                </Button>
                <Switch
                  checked={fenceSwitch}
                  onChange={handlefenceSwitch}
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
                      onChange={handleChange}
                      disableUnderline
                    />
                    <FontAwesomeIcon
                      icon={faSearch}
                      color="#FFFFFF"
                      style={{ marginLeft: '5px', cursor: 'pointer' }}
                      onClick={handleSearchPlace}
                      size="lg"
                    />
                  </div>
                  : <div />
                }
                <Button className={classes.btnGrey} onClick={handleMapTypeClick}>
                  {/* <Typography variant="body1" className={classes.title}>
                    <FormattedMessage {...messages.fence} />
                  </Typography> */}
                  <Img
                    src={mapIcon}
                    className={classes.logo}
                    alt="Map icon"
                  />
                </Button>
                <Button className={classes.btnGrey} onClick={() => handleShowSearchPlace(!showSearchPlace)}>
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
              isMarkerShown={isMarkerShown}
              onMarkerClick={handleMarkerClick}
              showMapTypeControl={false}
              showFullScreenControl={false}
              showStreetViewControl={false}
              mapTypeId={mapType}
              defaultCenter={coordinate}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
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

export default SuperHOC(compose(withConnect)(injectIntl(FencePage)));
