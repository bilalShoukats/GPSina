/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useEffect, memo, useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortUp, faCog } from '@fortawesome/free-solid-svg-icons';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import { Button, Grid, Input, Paper, Typography } from '@material-ui/core';
import messages from './messages';
import { loadRepos } from '../App/actions';
import { changeUsername } from './actions';
import { makeSelectUsername } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { useStyles } from './styles.js';
import Img from '../../components/Img';
import SCREENS from '../../constants/screen';

import GPSinaLogoGrey from '../../../assets/images/logo/logo-small-gray.png';
import Map from '../../components/Map';
import DeviceList from '../../components/DeviceList';
import CustomModal from '../../components/CustomModal';

const key = 'home';

export function HomePage({ loading, ...props }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [isMarkerShown, setIsMarkerShown] = useState(true);
  const [isModalShown, setIsModalShown] = useState(false);

  const classes = useStyles(props);
  const history = useHistory();

  const goToSettingsScreen = () => {
    history.push(SCREENS.SETTINGS);
  };

  const handleMarkerClick = () => {
    setIsMarkerShown(!isMarkerShown);
    // console.log('isMarkerShown', isMarkerShown);
  };

  const handleOpenModal = () => {
    setIsModalShown(true);
  };

  const handleCloseModal = () => {
    setIsModalShown(false);
  };

  useEffect(() => {
    
  }, []);

  return (
    <div>
      <Helmet className={classes.root}>
        <title>Home</title>
      </Helmet>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        className={classes.topBar}
      >
        <Grid item onClick={goToSettingsScreen} className={classes.settingsBtn}>
          <FontAwesomeIcon icon={faCog} size="2x" />
        </Grid>
        <Img
          src={GPSinaLogoGrey}
          alt="GPSina Grey Logo"
          className={classes.logo}
        />
        <div />
      </Grid>

      <CustomModal
        open={isModalShown}
        handleClose={handleCloseModal}
        title="expired"
        deviceName="3353 - M3"
        type="simple"
      />

      <div className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={4}>
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

            <div className={classes.paginationContainer}>
              <Grid
                container
                spacing={1}
                justify="space-around"
                direction="row"
                alignItems="center"
              >
                <Grid item>
                  <Typography
                    variant="body1"
                    style={{ color: 'grey', fontSize: '14px' }}
                  >
                    <FormattedMessage {...messages.vehicleNo} />
                    <FontAwesomeIcon
                      icon={faSortUp}
                      style={{ marginLeft: '0.25em' }}
                      size="lg"
                    />
                  </Typography>
                </Grid>

                <Typography
                  variant="body1"
                  style={{ color: 'grey', fontSize: '14px' }}
                >
                  <FormattedMessage {...messages.trackerNo} />
                </Typography>

                <Typography
                  variant="body1"
                  style={{ color: 'grey', fontSize: '14px' }}
                >
                  <FormattedMessage {...messages.status} />
                </Typography>
              </Grid>
            </div>

            <DeviceList onOpenModal={handleOpenModal} />
            <DeviceList onOpenModal={handleOpenModal} />
            <DeviceList onOpenModal={handleOpenModal} />
          </Grid>
          <Grid item xs={8}>
            <Map
              isMarkerShown={isMarkerShown}
              onMarkerClick={handleMarkerClick}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

HomePage.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: evt => dispatch(changeUsername(evt.target.value)),
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
