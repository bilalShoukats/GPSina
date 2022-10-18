/**
 *
 * DeviceList
 *
 */

import { Button, Grid, Typography, Avatar } from '@material-ui/core';
import React, { useState } from 'react';
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

import Geocode from 'react-geocode';
import { useEffect } from 'react';
const propTypes = {
    accOn: PropTypes.number,
    gps: PropTypes.number,
    currentState: PropTypes.number,
    deviceName: PropTypes.string,
    modelNumber: PropTypes.string,
    date: PropTypes.string,
    onOpenModal: PropTypes.func.isRequired,
    latitude: PropTypes.number,
    longitude: PropTypes.number,
};

const defaultProps = {
    accOn: -1,
    gps: -1,
    currentState: 0,
    deviceName: 'Sample Device',
    modelNumber: '456123789',
    date: '27 May 2021',
};

const DeviceList = ({ ...props }) => {
    const [updatedData, setUpdatedData] = useState([]);
    // console.log(' props changed:', props);
    const [address, setAddress] = useState('');
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);

    // console.log('props of devicelist DATA', props.device.currentState);
    useEffect(() => {
        setUpdatedData(props.device);
        setLat(props.device.lastLatitude);
        setLng(props.device.lastLongitude);
        //console.log(setUpdatedData);
        // console.log('...props', props);
        renderSatatus(props.device);
        // console.log('renderSatatus.props.device',props.device);
    },[props]);

    const classes = useStyles(props);
    console.log('device list Data : ', props.device);
    const history = useHistory();
   

    if (props.device.lastEngineOnOff != -1){
        // console.log("setting acconoff");
        propTypes.accOn = props.device.lastEngineOnOff;
        //  console.log("accOn",propTypes.accOn);
    } 
    if (props.device.currentState != -1) {
        propTypes.currentState = props.device.currentState;
    }
    if(props.device.lastLatitude != -1){
        // console.log("lastLatitude>>>>>>");
        propTypes.gps = props.device.lastLatitude;
        // console.log("gps",propTypes)
    }
     const goToLocateScreen =()=>{
        console.log("hello,1")
        history.push(SCREENS.LOCATE);
     }

    // const goToLocateScreen = vehicle => {
    //     console.log("hello,1")

    //     history.push(SCREENS.LOCATE,{ vehicle: vehicle });
    //     console.log('SCREENS.LOCATE',push(SCREENS.LOCATE))
    // };

    const goToHistoryScreen = () => {
        history.push(SCREENS.HISTORY);
    };

    const goToFenceScreen = () => {
        history.push(SCREENS.FENCE);
    };

    const showMoreModal = () => {
        props.onOpenModal();
        console.log('onOpenModal>>>',props.onOpenModal())

    };

    const goToAlertScreen = () => {
        history.push(SCREENS.ALERT);
    };

    const changeAccStatus =()=>{

    }

    const renderSatatus = type => {
        // console.log('status received', type);
        let handleState = {
            1: 'idling',
            2: 'Parked',
            3: 'Moving',
            4: 'Offline',
            5: 'Offline',
        };
        return handleState[type];
    };
  
    const renderSatatusColor = type => {
        // console.log(type);
        let handleState = {
            1: '#e5a744',
            2: '#4da8ee',
            3: '#55b44f',
            4: '#cd3020',
            5: '#a9a9a9',
        };
        return handleState[type];
    };

    const accSatatus = type => {
        // console.log("i receive acc",type);
        let accState = {
            0: 'ACC OFF',
            1: 'ACC ON',
        };
        return accState[type];
    
    }
    const getLocationAddress = (lat, lng, event, index) => {
        // setSelectedIndexx(index);
        // console.log('clicke!', lat, lng);
        Geocode.setApiKey('AIzaSyCvlR6R50PN-7o-7UABXDTrdjIAMudbRfM');
        Geocode.enableDebug();
        Geocode.fromLatLng(lat, lng).then(
            response => {
                // let newList = [...vehicleInfo];
                // const prevIndex=vehicleInfo.filter(item=>)
                const address = response.results[0].formatted_address;
                // console.log('address', address);
                setAddress(address);
                return address;
            },
            error => {
                console.error(error);
            },
        );
        }

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
                                    .unix(props.device.activatedTime_)
                                    .add(1, 'y')
                                    .format('D MMM YYYY')}
                                to{' '}
                                {moment
                                    .unix(props.device.expiredTime_)
                                    .add(1, 'y')
                                    .format('D MMM YYYY')}
                            </Typography>
                        </Grid>
                        {/*<Grid item>
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
                        </Grid>*/}
                    </Grid>

                    <Typography
                        variant="body1"
                        className={classes.textLastEngineOnOff}
                        display="inline"
                    >
                        {accSatatus(propTypes.accOn)}
                    </Typography>
                    <div className={classes.btnContainer}>
                        <Grid
                            container
                            spacing={1}
                            justify="space-between"
                            direction="row"
                            alignItems="center"
                        >
                            <Grid
                                onClick={ goToLocateScreen}
                                className={classes.btnOutline}
                                >
                                {console.log('goToLocateScreen',goToLocateScreen)}
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
                                { console.log('showMoreModal',showMoreModal)}
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
                        <Typography
                            variant="body1"
                            className={classes.textdevice}
                            display="inline"
                          style={{color:renderSatatusColor(props.device.currentState)}}
                        >
                    
                        
                            {renderSatatus(props.device.currentState)}
                            {/*{carSatatus(props.device.currentState)}*/}
                        </Typography>

                        <Typography
                            className={classes.description}
                            style={{
                                color: '#08c3eb',
                                textDecoration: 'underline',
                                cursor: 'pointer',
                            }}
                            onClick={(event, index) => {
                                getLocationAddress(
                                    props.device.lastLatitude,
                                    props.device.lastLongitude,
                                    event,
                                    index,
                                    
                                );
                            }}
                        >
                            {props.device.lastLatitude.toFixed(2)}
                            {','}
                            {props.device.lastLongitude.toFixed(2)}
                        </Typography>
                        <Typography
                            variant="body1"
                            className={classes.textaddress}
                            display="block"
                        >
                            <span
                                style={{
                                    fontSize: 12,
                                    color: 'white',
                                }}
                            >
                                <span>{address}</span>
                            </span>
                        </Typography>

                        <Typography
                            className={classes.description}
                            style={{
                                color: '#08c3eb',
                            }}
                        >
                           speed {props.device.lastSpeed}
                        </Typography>
                    </div>
                </Grid>
            </SwipeableListItem>
        </SwipeableList>
    );
};

DeviceList.propTypes = propTypes;
DeviceList.defaultProps = defaultProps;

export default DeviceList;
