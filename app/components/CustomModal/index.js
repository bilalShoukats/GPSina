/**
 *
 * CustomModal
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import {
  Button,
  Grid,
  Input,
  Modal,
  Switch,
  Typography,
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faTimes } from '@fortawesome/free-solid-svg-icons';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import { useStyles } from './styles.js';

const propTypes = {
  open: PropTypes.bool,
  type: PropTypes.string, // 'simple|more'
  children: PropTypes.element,
  allowCloseOnPressBackdrop: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  handleRegNo: PropTypes.func,
  handleVibrate: PropTypes.func,
  vibrateChecked: PropTypes.bool,
  title: PropTypes.string,
  deviceName: PropTypes.string,
};

const defaultProps = {
  type: 'simple',
  allowCloseOnPressBackdrop: false,
};

const CustomModal = ({ ...props }) => {
  const classes = useStyles(props);

  return (
    <Modal
      className={classes.modal}
      open={props.open}
      onClose={props.allowCloseOnPressBackdrop && props.handleClose}
      aria-labelledby={props.title}
    >
      {props.type === 'simple' ? (
        <div className={classes.simpleModal}>
          <Grid
            container
            spacing={1}
            justifyContent="center"
            direction="column"
            alignItems="center"
          >
            <div className={classes.textContainer}>
              <Typography
                variant="body1"
                align="center"
              >
                {props.title}
              </Typography>
              {props.description &&
                <Typography
                  variant="body2"
                  align="center"
                >
                  {props.description}
                </Typography>
              }
            </div>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Button
                onClick={props.handleClose}
                className={classes.btnContainer}
              >
                <Typography variant="body1" align="center">
                  <FormattedMessage {...messages.ok} />
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </div>
      ) : (
        <div className={classes.moreModal}>
          <Grid container>
            <Grid
              container
              justify="space-between"
              alignItems="center"
              className={classes.moreModalTitle}
            >
              <Typography
                variant="body1"
                display="inline"
                className={classes.textStyles}
              >
                <FormattedMessage {...messages.moreSettings} />
                {props.deviceName}
              </Typography>
              <Button onClick={props.handleClose}>
                <FontAwesomeIcon icon={faTimes} color="#FFFFFF" size="lg" />
              </Button>
            </Grid>

            <Grid
              container
              direction="column"
              classContainer={classes.moreModalContent}
            >
              <Grid
                container
                justify="space-between"
                alignItems="center"
                className={classes.moreModalIndividualContent}
              >
                <Typography
                  variant="body1"
                  display="inline"
                  className={classes.textStyles}
                >
                  <FormattedMessage {...messages.vibrate} />
                </Typography>
                <Switch
                  checked={props.vibrateChecked}
                  onChange={props.handleVibrate}
                  name="vibrate"
                  className={classes.switch}
                />
              </Grid>
              <Grid
                container
                justify="space-between"
                alignItems="center"
                className={classes.moreModalIndividualContentWithBtn}
              >
                <div>
                  <Typography
                    variant="body1"
                    display="inline"
                    className={classes.textStyles}
                  >
                    <FormattedMessage {...messages.regNo} />
                  </Typography>
                  <Input className={classes.textInput} />
                </div>
                <Button
                  onClick={props.handleRegNo}
                  className={classes.greenBtn}
                  disableElevation
                  disableRipple
                  variant="contained"
                >
                  <Typography
                    variant="body2"
                    display="inline"
                    className={classes.textStyles}
                  >
                    <FormattedMessage {...messages.save} />
                  </Typography>
                </Button>
              </Grid>
              <Grid
                container
                justify="space-between"
                alignItems="center"
                className={classes.moreModalIndividualContentWithBtn}
              >
                <div>
                  <Typography
                    variant="body1"
                    display="inline"
                    className={classes.textStyles}
                  >
                    <FormattedMessage {...messages.speed} />
                  </Typography>
                  <Input className={classes.textInput} />
                </div>
                <Button
                  onClick={props.handleRegNo}
                  className={classes.greenBtn}
                  disableElevation
                  disableRipple
                  variant="contained"
                >
                  <Typography
                    variant="body2"
                    display="inline"
                    className={classes.textStyles}
                  >
                    <FormattedMessage {...messages.save} />
                  </Typography>
                </Button>
              </Grid>
              <Grid
                container
                justify="space-between"
                alignItems="center"
                className={classes.moreModalIndividualContentWithBtn}
              >
                <Typography
                  variant="body1"
                  display="inline"
                  className={classes.textStyles}
                >
                  <FormattedMessage {...messages.sharedDevices} />
                </Typography>
                <Button
                  onClick={props.handleRegNo}
                  className={classes.greenBtn}
                  disableElevation
                  disableRipple
                  variant="contained"
                >
                  <Typography
                    variant="body2"
                    display="inline"
                    className={classes.textStyles}
                  >
                    <FormattedMessage {...messages.save} />
                  </Typography>
                </Button>
              </Grid>
              <Grid
                container
                justify="center"
                alignItems="center"
                className={classes.moreModalIndividualContentPushNoti}
              >
                <Typography
                  variant="body1"
                  display="inline"
                  className={classes.textStyles}
                >
                  <FormattedMessage {...messages.pushNotificationSettings} />
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </div>
      )}
    </Modal>
  );
};

CustomModal.propTypes = propTypes;
CustomModal.defaultProps = defaultProps;

export default CustomModal;
