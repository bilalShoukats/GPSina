/**
 *
 * DeviceList
 *
 */

import { Button, Grid, Typography } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapMarkerAlt,
  faExclamationTriangle,
  faHistory,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { useStyles } from './styles.js';
import Img from '../Img';

import fenceIcon from '../../../assets/images/icons/fence.png';
import alertIcon from '../../../assets/images/icons/alert.png';
import locateIcon from '../../../assets/images/icons/locate.png';
import historyIcon from '../../../assets/images/icons/history.png';
import plusIcon from '../../../assets/images/icons/plus.png';

const propTypes = {
  accOn: PropTypes.bool,
  deviceName: PropTypes.string,
  modelNumber: PropTypes.string,
  date: PropTypes.string,
};

const defaultProps = {
  accOn: false,
  deviceName: 'Sample Device',
  modelNumber: '456123789',
  date: '27 May 2021',
};

const DeviceList = ({ ...props }) => {
  const classes = useStyles(props);

  return (
    <div className={classes.container}>
      <Grid container direction="column">
        <Grid
          container
          spacing={2}
          justify="space-between"
          direction="row"
          alignItems="center"
        >
          <Grid item>
            <Typography variant="body1" color="initial" display="inline">
              {props.deviceName}
            </Typography>
            <Typography
              variant="body2"
              className={classes.mutedText}
              display="inline"
            >
              {props.modelNumber}
            </Typography>
            <Typography variant="body2" className={classes.mutedText}>
              27 May 2021
            </Typography>
          </Grid>
          <Grid item>
            <Button color="default" className={classes.btn} variant="outlined">
              {props.accOn ? (
                <FormattedMessage {...messages.accOn} />
              ) : (
                <FormattedMessage {...messages.accOff} />
              )}
            </Button>
          </Grid>
        </Grid>

        <div className={classes.btnContainer}>
          <Grid
            container
            spacing={1}
            justify="space-between"
            direction="row"
            alignItems="center"
          >
            <Grid item direction="column" className={classes.btnOutline}>
              <Img
                src={locateIcon}
                alt="Locate Icon"
                className={classes.logoStyle}
              />
              <FormattedMessage {...messages.locate} />
            </Grid>
            <Grid item direction="column" className={classes.btnOutline}>
              {/* <FontAwesomeIcon icon={faMapMarkerAlt} size="lg" color="#28ACEA" /> */}
              <Img
                src={fenceIcon}
                alt="Fence Icon"
                className={classes.logoStyle}
              />
              <FormattedMessage {...messages.fence} />
            </Grid>
            <Grid item direction="column" className={classes.btnOutline}>
              <Img
                src={historyIcon}
                alt="History Icon"
                className={classes.logoStyle}
              />
              <FormattedMessage {...messages.history} />
            </Grid>
            <Grid item direction="column" className={classes.btnOutline}>
              <Img
                src={plusIcon}
                alt="More Icon"
                className={classes.logoStyle}
              />
              <FormattedMessage {...messages.more} />
            </Grid>
            <Grid item direction="column" className={classes.btnOutline}>
              <Img
                src={alertIcon}
                alt="Alert Icon"
                className={classes.logoStyle}
              />
              <FormattedMessage {...messages.alert} />
            </Grid>
          </Grid>
        </div>
      </Grid>
    </div>
  );
};

DeviceList.propTypes = propTypes;
DeviceList.defaultProps = defaultProps;

export default DeviceList;
