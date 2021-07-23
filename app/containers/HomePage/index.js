/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Helmet } from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortUp, faCog, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Button, Grid, Input, List, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

import messages from './messages';
import { useStyles } from './styles.js';
import Img from '../../components/Img';
import SCREENS from '../../constants/screen';
import Map from '../../components/Map';
import DeviceList from '../../components/DeviceList';
import CustomModal from '../../components/CustomModal';
import { deviceList } from '../../constants/dummy';
import { height, LATITUDE, LONGITUDE, width } from '../../constants/maps';
import { SuperHOC } from '../../HOC';
import GPSinaLogoGrey from '../../../assets/images/logo/logo-small-gray.png';
import SortUpIcon from '../../../assets/images/icons/sortUp.png';
import SortDownIcon from '../../../assets/images/icons/sortDown.png';

class HomePage extends Component {
  constructor(props){
    super(props);
    this.state = {
      isModalShown: false,
      coordinate: {
        lat: LATITUDE,
        lng: LONGITUDE,
      },
      sortBy: 'vehicleNo', // vehicleNo, trackerNo, status
      sortAsc: false, // true: ascending/ON, false: descending/OFF
    }
  }

  // Refer to https://github.com/google-map-react/google-map-react#use-google-maps-api
  handleApiLoaded = (map, google) => {
    console.log('map', map);
    console.log('google', google);

  }

  handleOpenModal = () => {
    this.setState({
      isModalShown: true,
    })
  }

  handleCloseModal = () => {
    this.setState({
      isModalShown: false,
    })
  }

  goToSettingScreen = () => {
    this.props.history.push(SCREENS.SETTINGS)
  }

  handleVehicleNoSorting = () => {
    this.setState({
      sortBy: 'vehicleNo',
      sortAsc: !this.state.sortAsc
    });
  }

  handleTrackerNoSorting = () => {
    this.setState({
      sortBy: 'trackerNo',
      sortAsc: !this.state.sortAsc
    });
  }

  handleStatusSorting = () => {
    this.setState({
      sortBy: 'status',
      sortAsc: !this.state.sortAsc
    });
  }

  render() {
    const { isModalShown, coordinate, sortBy, sortAsc } = this.state;
    const { classes } = this.props;
    const mapOptions = {
      panControl: true,
      // mapTypeControl: false,
      // fullscreenControl: false,
      // streetViewControl: false,
      scrollwheel: true,
      mapTypeId: 'roadmap'
    };

    const sortUp= (
      <Img
        src={SortUpIcon}
        alt="sort up icon"
        className={classes.icon}
      />
    );

    const sortDown = (
      <Img
        src={SortDownIcon}
        alt="sort down icon"
        className={classes.icon}
      />
    );

    return (
      <div>
        <Helmet>
          <title>{this.props.intl.formatMessage({...messages.home})}</title>
        </Helmet>

        <div>
          <Grid
            container
            style={{ width: width, height: height }}
          >
            <CustomModal
              open={isModalShown}
              handleClose={this.handleCloseModal}
              title="expired"
              deviceName="3353 - M3"
              type="simple"
            />

            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
              className={classes.topBar}
            >
              <Grid item onClick={this.goToSettingScreen} className={classes.settingsBtn}>
                <FontAwesomeIcon icon={faCog} size="2x" />
              </Grid>
              <Img
                src={GPSinaLogoGrey}
                alt="GPSina Grey Logo"
                className={classes.logo}
              />
              <div />
            </Grid>

            <Grid container className={classes.container}>
              <Grid item xs={4} className={classes.leftContainer}>
                <Grid container spacing={2} justify="space-between" direction="row">
                  <Grid item xs={9}>
                    <Grid container spacing={2}>
                      <Grid item xs={3}>
                        <Typography variant="body1" color="initial">
                          <FormattedMessage {...messages.vehicleNo} />
                        </Typography>
                      </Grid>
                      <Grid item xs={9}>
                        <Input
                          className={classes.textfield}
                          // defaultValue={"email"}
                          // placeholder="Enter Vehicle No"
                          disableUnderline
                        />
                      </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                      <Grid item xs={3}>
                        <Typography variant="body1" color="initial">
                          <FormattedMessage {...messages.trackerNo} />
                        </Typography>
                      </Grid>
                      <Grid item xs={9}>
                        <Input
                          className={classes.textfield}
                          // defaultValue={"email"}
                          // placeholder="Enter Tracker No"
                          disableUnderline
                        />
                      </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                      <Grid item xs={3}>
                        <Typography variant="body1" color="initial">
                          <FormattedMessage {...messages.search} />
                        </Typography>
                      </Grid>
                      <Grid item xs={9}>
                        <Input
                          className={classes.textfield}
                          // defaultValue={"email"}
                          // placeholder="Enter Search Key"
                          disableUnderline
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={3}>
                    <Button className={classes.btn} variant="contained">
                      <FormattedMessage {...messages.addDevice} />
                    </Button>
                  </Grid>
                </Grid>

                <Grid container direction="column">
                  <Grid
                    item
                    className={classes.paginationContainer}
                  >
                    <Grid container direction="row" justify="center" alignItems="center">
                      <Grid item xs className={classes.paginationBtn} onClick={this.handleVehicleNoSorting}>
                        <Typography
                          variant="body1"
                          style={{ color: 'grey', fontSize: '14px' }}
                        >
                          <FormattedMessage {...messages.vehicleNo} />
                        </Typography>
                        { sortBy === 'vehicleNo' ?
                          sortAsc ? sortUp : sortDown
                          : <div />
                        }
                      </Grid>

                      <Grid item xs className={classes.paginationBtn} onClick={this.handleTrackerNoSorting}>
                        <Typography
                          variant="body1"
                          style={{ color: 'grey', fontSize: '14px' }}
                        >
                          <FormattedMessage {...messages.trackerNo} />
                        </Typography>
                        { sortBy === 'trackerNo' ?
                          sortAsc ? sortUp : sortDown
                          : <div />
                        }
                        </Grid>

                      <Grid item xs className={classes.paginationBtn} onClick={this.handleStatusSorting}>
                        <Typography
                          variant="body1"
                          style={{ color: 'grey', fontSize: '14px' }}
                        >
                          <FormattedMessage {...messages.status} />
                        </Typography>
                        { sortBy === 'status' ?
                          sortAsc ? sortUp : sortDown
                          : <div />
                        }
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid
                    item
                    className={classes.list}
                  >
                    { deviceList.map((device) => (
                          <DeviceList onOpenModal={this.handleOpenModal} />
                      ))
                    }
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={8} className={classes.mapContainer}>
                <Map
                  center={coordinate}
                />
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    )
  }
}

HomePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default SuperHOC((withConnect)(injectIntl(withStyles(useStyles)(HomePage))));
