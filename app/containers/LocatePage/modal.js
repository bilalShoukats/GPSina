import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import './style.css';
import moment from 'moment';
import SCREENS from '../../constants/screen';
import { styles } from './styles.js';
import UserAvatar from '../../components/UserAvatar';
import { Grid, Typography, Link } from '@material-ui/core';
import vehicleIcon from '../../../assets/images/icons/vehicle.svg';
import { faAd, faCar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router-dom';
import Geocode from 'react-geocode';

import { setDevices,setGPSData ,setEngineStatus} from '../../redux/socket/actions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import { FormattedMessage, injectIntl } from 'react-intl';

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide,
} from '@material-ui/core';
import TouchRipple from '@material-ui/core/ButtonBase/TouchRipple';

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        width: 500,
        backgroundColor: '#000',
        border: '2px solid #08c3eb',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(1, 0, 0),
        marginBottom: 20,
        borderRadius: 10,
    },
    main: {
        padding: '1.0em 4em',
        backgroundColor: 'transparent',
    },
    container: {
        backgroundColor: 'transparent',
        marginBottom: '10px',
    },
    content: {
        // padding: '0 1.5em',
    },
    avatar: {
        padding: '0.5em 1.5em',
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        cursor: 'pointer',
        '&:hover': {
            opacity: 5.0,
        },
    },
    title: {
        textTransform: 'capitalize',
        fontWeight: 'bold',
        color: 'green',
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    description: {
        textTransform: 'capitalize',
        display: 'inline',
        // justifyContent: 'center',
        // alignItems: 'center',
        padding: '0.5em 6.5em',
        margin: '0.5em 0',
        color: 'white',
    },
}));

export  function SimpleModal(props) {
    const classes = useStyles();
    const history = useHistory();
    const [selectedIndexx, setSelectedIndexx] = React.useState('');

    const [address, setAddress] = React.useState('');
    const { vehicle } = props;
    const [vehicleInfo, setVehicleInfo] = React.useState('');
    const goToHistoryScreen = () => {
        history.push(SCREENS.Reports);
    };
    const goToTripScreen = () => {
        history.push(SCREENS.FENCE);
    };
    console.log(props,'SimpleModalprops');
    const getLocationAddress = (lat, lng, event, index) => {
        setSelectedIndexx(index);
        Geocode.setApiKey('AIzaSyCvlR6R50PN-7o-7UABXDTrdjIAMudbRfM');
        Geocode.enableDebug();
        Geocode.fromLatLng(lat, lng).then(
            response => {
                // let newList = vehicle[0];
                // const prevIndex=vehicleInfo.filter(item=>)
                const address = response.results[0].formatted_address;
                console.log('address:', address);
                setAddress(address);
            },
            error => {
                console.error(error);
            },
        );
    };
    const getStatus = vehicle => {
        // 0 => running
        // 1 => idle
        // 2 => stop

        console.log('Func: ', vehicle);

        if (
            (props.engineData.status== 0 &&
                props.gpsData.speed > 0) ||
            (props.engineData.statuss == 0 &&
                props.gpsData.speed > 0)
        ) {
            // moving
            console.log('moving');
            return 'MOVING';
        } else if (
            (props.engineData.status == 1 &&
                props.gpsData.speed > 0) ||
            (props.engineData.status == 1 &&
                props.gpsData.speed > 0)
        ) {
            // idle
            console.log('idle');
            return 'IDLE..!';
        } else if (
            (props.engineData.status == 2 &&
                props.gpsData.speed > 0) ||
            (props.engineData.status == 2 &&
                props.gpsData.speed > 0)
        ) {
            // parked
            console.log('parked');
            return 'PARKED..!';
        } else if (
            (props.engineData.status == 3 &&
                props.gpsData.speed > 0) ||
            (props.engineData.status == 3 &&
                props.gpsData.speed > 0)
        ) {
            offline
            console.log('offline');
            return 'OFFLINE';
        }
    };
    const body = (
        <Grid className={`${classes.paper} modalBody`}>
            <Grid container direction="column">
                <Grid item xs={10} md={11} className={classes.content}>
                    <Grid container>
                        <Grid item className={classes.avatar}>
                            <FontAwesomeIcon
                                icon={faCar}
                                color="white"
                                size="3x"
                            />
                        </Grid>
                        <Grid item>
                            <Typography
                                variant="body1"
                                className={classes.title}
                                style={{ color: 'grey' }}
                            >
                                {moment().format('MMM DD , YYYY HH:mm A')}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography
                                variant="body1"
                                className={classes.description}
                                style={{ color: 'green', fontWeight: 'bold' }}
                            >
                                {`${
                                    vehicle.registrationNo
                                }`}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography
                                variant="body1"
                                className={classes.description}
                            >
                                {vehicle.deviceID}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography
                                variant="body1"
                                className={classes.description}
                            >
                                {`(${moment
                                    .unix(vehicle.activatedTime_)
                                    .format('D.MM.YYYY')} - ${moment
                                    .unix(vehicle.expiredTime_)
                                    .add(1, 'y')
                                    .format('D.MM.YYYY')})`}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography
                                className={classes.description}
                                style={{
                                    color: '#08c3eb',
                                    textDecoration: 'underline',
                                    cursor: 'pointer',
                                }}
                                onClick={(event, index) => {
                                    getLocationAddress(
                                        props.gpsData.latitude,
                                        props.gpsData.longitude,
                                        event,
                                        index,
                                    );
                                }}
                            >
                                {props.gpsData.latitude},
                                {props.gpsData.latitude},
                                {props.gpsData.longitude},
                                {props.gpsData.longitude},
                            </Typography>
                            <span
                                style={{
                                    fontSize: 12,
                                    color: 'white',
                                }}
                            >
                                <span>{address}</span>
                            </span>
                        </Grid>
                        <Grid item>
                            <Typography
                                className={classes.description}
                                style={{
                                    color: '#08c3eb',
                                    textDecoration: 'underline',
                                    cursor: 'pointer',
                                }}
                            >
                                {''}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography
                                variant="body1"
                                className={classes.description}
                                style={{
                                     color: 'green',
                                    fontWeight: 'bold',
                                }}
                            >
                                {getStatus(vehicle)}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography
                                className={classes.description}
                                style={{
                                    padding: '1.5em 1.4em',
                                }}
                            >
                                { props.gpsData.speed }
                           
                                {' km/h'}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <DialogActions
                style={{
                    alignSelf: 'center',
                    justifyContent: 'center',
                }}
            >
                <Button
                    color="secondary"
                    onClick={goToTripScreen}
                    style={{
                        fontWeight: 'bold',
                        fontSize: '17px',
                        textDecoration: 'underline',
                    }}
                >
                    {'Trip'}
                </Button>
                <Button
                    color="secondary"
                    onClick={goToHistoryScreen}
                    style={{
                        fontWeight: 'bold',
                        fontSize: '17px',
                        textDecoration: 'underline',
                    }}
                >
                    {'Report'}
                </Button>
            </DialogActions>
        </Grid>
    );

    return (
        <div>
            <Paper
                open={true}
                // onClose={handleClose}

                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Paper>
        </div>
    );
}

// SimpleModal.propTypes = {
//     dispatch: PropTypes.func.isRequired,
// };

const mapStateToProps = state => {
    console.log('what we have in socket gpsdata>>>>', state.socket.gpsData);
    console.log('what we have in socket devices..', state.socket.devices);
    console.log('what we have in socket setEngineStatus..', state.socket.engineData);
    const { socket } = state;
    return socket;
};
function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        setGPSData,
        setDevices,
        setEngineStatus,
    };
}
 export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SimpleModal);