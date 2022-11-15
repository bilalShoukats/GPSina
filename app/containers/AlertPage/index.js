/**
 *
 * AlertPage
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import APIURLS from '../../ApiManager/apiUrl';
import ApiManager from '../../ApiManager/ApiManager';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Grid, List, Typography } from '@material-ui/core';
import makeSelectAlertPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import Header from '../../components/Header';
import { useStyles } from './styles.js';
import { ALARMSNOTIF } from './alarrmTypes';
import moment from 'moment';




 import wirecutIcon from'../../../assets/images/images/wirecutIcon.png'
 import sosIcon from'../../../assets/images/images/sosIcon.png'
 import underSpeedIcon from'../../../assets/images/images/speedRing.png'
 import overSpeedIcon from'../../../assets/images/images/speedRing.png'
 import vibrationIcon from'../../../assets/images/images/vibrationIcon.png'
 import RFIDLowIcon from '../../../assets/images/images/RFIDLowIcon.png'
 import RFIDMismatchIcon from'../../../assets/images/images/RFIDMismatchIcon.png'
 import collisionIcon from'../../../assets/images/images/collisionIcon.png'
 import batteryWarningIcon from'../../../assets/images/images/batteryWarningIcon.png'
 import oilCutIcon from'../../../assets/images/images/oilCutIcon.png'
 import oilReserveIcon from'../../../assets/images/images/oilReserveIcon.png'
 import accOnIcon from'../../../assets/images/images/carUnlockIcon.png'
 import accOffIcon from'../../../assets/images/images/carUnlockIcon.png'
 import GPSPositionIcon from'../../../assets/images/images/GPSPositionIcon.png'
 import lowBatteryIcon from'../../../assets/images/images/lowBatteryIcon.png'
 import harshBrakingIcon from'../../../assets/images/images/harshBrakingIcon.png'
 import harshAccelerationIcon from'../../../assets/images/images/harshAccelerationIcon.png'
 import harshSwerveIcon from'../../../assets/images/images/harshSwerveIcon.png'
 import overtakeIcon from'../../../assets/images/images/overtakeIcon.png'
 import fenceInIcon from'../../../assets/images/images/fenceInIcon.png'
 import fenceOutIcon from'../../../assets/images/images/fenceOutIcon.png'
 import alertIcon from'../../../assets/images/images/alertIcon.png'
 import UserAvatar from '../../components/UserAvatar';
 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    faChevronRight,
    faEdit,
    faTrashAlt,
    faUserSlash,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import vehicleIcon from '../../../assets/images/icons/vehicle.svg';
export function AlertPage(props) {
    const api = ApiManager.getInstance();
    const [list, setList] = useState([]);
    const [loader,setLoader]=useState(false)
    const [vehicle, setVehicle] = useState(props);
    const [pageLoad, setPageLoad] = useState(true);
    const [settings, setSettings] = useState({
        page: 0,
        pages: 1,
    })
    // const [totalPage, setTotalPage] = useState(1);
    // const [currentPage, setCurrentPage] = useState(1);
    const [resMsg, setResMsg] = useState('');
    useInjectReducer({ key: 'alertPage', reducer });
    useInjectSaga({ key: 'alertPage', saga });

    const classes = useStyles(props);
    // console.log('prrrooopps',props.location.state.deviceID)


    const getAllItems = () => {
        // console.log('ALARMSNOTIF',ALARMSNOTIF);
        if(settings.page < settings.pages) {
            api.send('GET', '/getAllDeviceAlerts', {
                deviceId: props.location.state.deviceID,
                isRead: 0,
                page:settings.page + 1,
            })
                .then(res => {
                    if(res.data.code === 1019) {
                        if(res.data.response && res.data.response.length > 0) {
                            var oldAlerts = list.concat(res.data.response)
                            setList(oldAlerts)
                            setSettings({
                                page: res.data.currentPage,
                                pages: res.data.totalPages,
                            })
                            console.log('ALL DEVICES ALERTS<res.data.response>>>', res.data.response);
                            console.log('res.data.response alarmCode<>>>', res.data.response[1].dateTime);
                        }
                    }
                    else {
                        alert('',"Alerts not found")
                    }
                })
                .catch(error => {});
        }
    };

    useEffect(() => {
        getAllItems();
    }, []);
    useEffect(() => {
        connect( hideLoader);
        showLoader();
    }, []);

    useEffect(() => {
        getAllItems();
    }, [settings.page])


    const hideLoader = () => {
        setLoader({ setLoader: false });
    };
    const showLoader = () => {
        setLoader({ setLoader: true });
    };

    return (
        <div>
        <Helmet>
            <title>Alert</title>
        </Helmet>
        <Header
            title={<FormattedMessage {...messages.alert} />}
            showClearBtn
        />
        <Grid className={classes.container}>
            <Typography variant="body2" align="center">
                
            </Typography >
        </Grid>
    
   
  
       {list.map((index)=> {
        return(
            <div key={index.id}>
            <Grid
            container
            direction="row"
            alignItems="center"
            className={classes.container}
        >
            <Grid
                item
                xs={2}
                md={1}
                className={classes.avatar}
            >
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >
                <img
                 src={index.alarmCode==1 ? wirecutIcon:
                    index.alarmCode == 2 ? sosIcon:
                    index.alarmCode == 3 ? underSpeedIcon:
                    index.alarmCode == 4 ? overSpeedIcon:
                    index.alarmCode == 5 ? vibrationIcon:
                    index.alarmCode == 6 ? RFIDLowIcon:
                    index.alarmCode == 7 ? RFIDMismatchIcon:
                    index.alarmCode == 8 ? collisionIcon:
                    index.alarmCode == 9 ? batteryWarningIcon:
                    index.alarmCode == 10 ? oilCutIcon:
                    index.alarmCode == 11 ? oilReserveIcon:
                    index.alarmCode == 12 ? carUnlockIcon:
                    index.alarmCode == 13 ? GPSPositionIcon:
                    index.alarmCode == 14 ? lowBatteryIcon:
                    index.alarmCode == 15 ? harshBrakingIcon:
                    index.alarmCode == 16 ? harshAccelerationIcon:
                    index.alarmCode == 17 ? harshSwerveIcon:
                    index.alarmCode == 18 ? overtakeIcon:
                    index.alarmCode == 19 ? collisionIcon:
                    index.alarmCode == 20 ? fenceInIcon:
                    index.alarmCode == 21 ? fenceOutIcon:
                    index.alarmCode == 22 ? accOnIcon:
                    index.alarmCode == 23 ? accOffIcon:
                    alertIcon
                }
                        />
                        
                        {
                    <p className= {classes.iconTextStyle} >    
                    {index.alarmCode == 3 || index.alarmCode == 4 ? Math.floor(index.deviceSpeedSetting) : null}
                    </p>}

                
                </Grid>
            </Grid>
            <Grid
                item
                xs={10}
                md={11}
                alignItems="center"
                className={classes.content}
            >
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Grid item>
                        <Grid
                            container
                            direction="column"
                        >
                            <Grid item>
                                <Typography
                                    variant="body1"
                                    className={
                                        classes.title
                                    }
                                >
                                {ALARMSNOTIF[index.alarmCode-1]}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography
                                    variant="body1"
                                    className={
                                        classes.description
                                    }
                                >
                                {moment.unix(index.dateTime).format('YYYY.MM.DD hh:mm:ss A')}
                          
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>

            
            </div>
            )
        })};
        {console.log('list....',list)}

        </div>
    );
}

AlertPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    alertPage: makeSelectAlertPage(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose(withConnect)(AlertPage);
