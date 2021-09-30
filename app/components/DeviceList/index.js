/**
 *
 * DeviceList
 *
 */

import { Button, Grid, Typography, Avatar } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { useStyles } from './styles.js';
import Img from '../Img';
import {
    SwipeableList,
    SwipeableListItem,
} from '@sandstreamdev/react-swipeable-list';
import Delete from '@material-ui/icons/Delete';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';
import fenceIcon from '../../../assets/images/icons/fence.png';
import alertIcon from '../../../assets/images/icons/alert.png';
import locateIcon from '../../../assets/images/icons/locate.png';
import historyIcon from '../../../assets/images/icons/history.png';
import plusIcon from '../../../assets/images/icons/plus.png';
import SCREENS from '../../constants/screen';
import moment from 'moment';

const propTypes = {
    accOn: PropTypes.bool,
    deviceName: PropTypes.string,
    modelNumber: PropTypes.string,
    date: PropTypes.string,
    onOpenModal: PropTypes.func.isRequired,
};

const defaultProps = {
    accOn: false,
    deviceName: 'Sample Device',
    modelNumber: '456123789',
    date: '27 May 2021',
};

const DeviceList = ({ ...props }) => {
    const classes = useStyles(props);
    const history = useHistory();

    const goToLocateScreen = () => {
        history.push(SCREENS.LOCATE);
    };

    const goToHistoryScreen = () => {
        history.push(SCREENS.HISTORY);
    };

    const goToFenceScreen = () => {
        history.push(SCREENS.FENCE);
    };

    const showMoreModal = () => {
        props.onOpenModal();
    };

    const goToAlertScreen = () => {
        history.push(SCREENS.ALERT);
    };

    const changeAccStatus = () => {
        //
    };

    return (
        <SwipeableList threshold={0.25}>
            <SwipeableListItem
                swipeLeft={{
                    content: (
                        <div
                            style={{
                                bottom: -12,
                                height: '43%',
                                width: '100%',
                                color: 'white',
                                display: 'flex',
                                padding: '0px 18px',
                                alignItems: 'center',
                                position: 'relative',
                                backgroundColor: 'red',
                                justifyContent: 'flex-end',
                            }}
                        >
                            Delete Vehicle
                            <Delete />
                        </div>
                    ),
                    action: () => props.swipeAction(),
                }}
                onSwipeProgress={progress =>
                    console.info(`Swipe progress: ${progress}%`)
                }
            >
                <Grid
                    container
                    direction="column"
                    style={{
                        backgroundColor: '#000',
                        //borderBottom: '1px solid #5f5a5a',
                        padding: 1,
                    }}
                >
                    <Grid
                        container
                        spacing={2}
                        justify="space-between"
                        direction="row"
                        alignItems="center"
                    >
                        <Grid item>
                            <Typography
                                variant="body1"
                                className={classes.textWhite}
                                display="inline"
                            >
                                {props.deviceName}
                            </Typography>
                            <Typography
                                variant="body2"
                                className={classes.mutedText}
                                display="inline"
                            >
                                {props.modelNumber}
                            </Typography>
                            <Typography
                                variant="body2"
                                className={classes.mutedText}
                            >
                                {moment
                                    .unix(props.date)
                                    .add(1, 'y')
                                    .format('D MMM YYYY')}
                            </Typography>
                        </Grid>
                        <Grid item>
                            {props.lastVehicleInformation.Battery < 50 ? (
                                <Img
                                    width={'20%'}
                                    alt="low battery"
                                    style={{
                                        transform: 'rotate(180deg)',
                                        marginRight: '5px',
                                    }}
                                    src={require('../../../assets/images/icons/low_battery.png')}
                                />
                            ) : null}
                            <Button
                                color="default"
                                className={classes.btn}
                                variant="outlined"
                                onClick={changeAccStatus}
                            >
                                {props.lastVehicleInformation.EngineStatus ? (
                                    <Typography variant="body2">
                                        <FormattedMessage {...messages.accOn} />
                                    </Typography>
                                ) : (
                                    <Typography variant="body2">
                                        <FormattedMessage
                                            {...messages.accOff}
                                        />
                                    </Typography>
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
                            <Grid
                                onClick={goToLocateScreen}
                                className={classes.btnOutline}
                            >
                                <Img
                                    src={locateIcon}
                                    alt="Locate Icon"
                                    className={classes.logoStyle}
                                />
                                <Typography
                                    variant="body2"
                                    className={classes.textWhite}
                                >
                                    <FormattedMessage {...messages.locate} />
                                </Typography>
                            </Grid>
                            <Grid
                                onClick={goToFenceScreen}
                                className={classes.btnOutline}
                            >
                                {/* <FontAwesomeIcon icon={faMapMarkerAlt} size="lg" color="#28ACEA" /> */}
                                <Img
                                    src={fenceIcon}
                                    alt="Fence Icon"
                                    className={classes.logoStyle}
                                />
                                <Typography
                                    variant="body2"
                                    className={classes.textWhite}
                                >
                                    <FormattedMessage {...messages.fence} />
                                </Typography>
                            </Grid>
                            <Grid
                                onClick={goToHistoryScreen}
                                className={classes.btnOutline}
                            >
                                <Img
                                    src={historyIcon}
                                    alt="History Icon"
                                    className={classes.logoStyle}
                                />
                                <Typography
                                    variant="body2"
                                    className={classes.textWhite}
                                >
                                    <FormattedMessage {...messages.history} />
                                </Typography>
                            </Grid>
                            <Grid
                                onClick={showMoreModal}
                                className={classes.btnOutline}
                            >
                                <Img
                                    src={plusIcon}
                                    alt="More Icon"
                                    className={classes.logoStyle}
                                />
                                <Typography
                                    variant="body2"
                                    className={classes.textWhite}
                                >
                                    <FormattedMessage {...messages.more} />
                                </Typography>
                            </Grid>
                            <Grid
                                onClick={goToAlertScreen}
                                className={classes.btnOutline}
                            >
                                <Img
                                    src={alertIcon}
                                    alt="Alert Icon"
                                    className={classes.logoStyle}
                                />
                                <Typography
                                    variant="body2"
                                    className={classes.textWhite}
                                >
                                    <FormattedMessage {...messages.alert} />
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
            </SwipeableListItem>
        </SwipeableList>
    );
};

DeviceList.propTypes = propTypes;
DeviceList.defaultProps = defaultProps;

export default DeviceList;
