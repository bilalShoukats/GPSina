/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */
import messages from './messages';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import Img from '../../components/Img';
import Map from '../../components/Map';
import { useStyles } from './styles.js';
import AutoSizer from 'react-virtualized-auto-sizer';
import InfiniteList from '../../components/List';
import SCREENS from '../../constants/screen';
import APIURLS from '../../ApiManager/apiUrl';
import { withStyles } from '@material-ui/styles';
import React, { Component, createRef } from 'react';
import { logoutUser } from '../../redux/auth/actions';
import UserAvatar from '../../components/UserAvatar';
import DeviceList from '../../components/DeviceList';
import ApiManager from '../../ApiManager/ApiManager';
import CustomModal from '../../components/CustomModal';
import FormControl from '@material-ui/core/FormControl';
import { DummydeviceList } from '../../constants/dummy';
import { FormattedMessage, injectIntl } from 'react-intl';
import ConfirmDialog from '../../components/confirmAlert';
import SortUpIcon from '../../../assets/images/icons/sortUp.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SortDownIcon from '../../../assets/images/icons/sortDown.png';
import { height, LATITUDE, LONGITUDE, width } from '../../constants/maps';
import GPSinaLogoGrey from '../../../assets/images/logo/logo-small-gray.png';
import defaultProfileImage from '../../../assets/images/icons/defaultProfileImage.png';
import { AiFillAliwangwang } from 'react-icons/ai';
// import SocketComponent from '../LocatePage/socketComponent';
import SocketManager from '../../SocketManager/SocketManager';
import { encode, decode } from 'js-base64';
 import {setDevices,setGPSData, setVoltageBattery,setAlarms,setDeviceSetting,setDeviceStatus,setEngineStatus,setDeviceSignal} from '../../redux/socket/actions';
import {
    faSortUp,
    faCog,
    faPowerOff,
    faBars,
    faHome,
    faFileAlt,
    faSearchLocation,
    faUsers,
    faCarAlt,
    faCogs,
    faChartBar,
    faFilter,
    faSatelliteDish,
    faCar,
    FaAirbnb,
} from '@fortawesome/free-solid-svg-icons';

import {
    Button,
    Divider,
    Drawer,
    Grid,
    Input,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    Typography,
    TextField,
    MenuItem,
    Box,
    Select,
} from '@material-ui/core';

import {
    SwipeableList,
    SwipeableListItem,
} from '@sandstreamdev/react-swipeable-list';
import { Sentry } from 'react-activity';
import 'react-activity/dist/Sentry.css';

const textField = createRef();

class HomePage extends Component {

    constructor(props) {
        
        super(props);
        this.state = {
            open: false,
            hasNextPage: false,
            isNextPageLoading: false,
            isModalShown: false,
            // vehicle: [props.location.state.vehicle],
            filter: '',
            coordinate: {
                lat: LATITUDE,
                lng: LONGITUDE,
            },
            deviceList: [],
            tempDeviceList: [],
            sortBy: 'vehicleNo', // vehicleNo, trackerNo, status
            sortAsc: false, // true: ascending/ON, false: descending/OFF
            page: 1,
            totalPage: 1,
            // deviceIDs: [],
            isSidebarShown: false,
            vehicleNo:null,
            trackerNo:null,

            deviceUnpackData: [],
            engineStatus: [],
            Lat: [],
            Lng: [],
            gpsSpeed: [],
            obdSpeed: [],
            carTemperature: [],
            fuelReading: [],
            rpm: [],
            loaderVisible: false,
            // deviceIDs: [this.props.lastVehicleInformation.deviceIDs],
        };
        this.api = ApiManager.getInstance();
        this.socket = SocketManager.getInstance();
    }

    componentDidMount = () => {
        console.log('WHAT IS M Y USER:', this.props.user);
    this.showLoader();
    this.socket.connect(this.props.user.email, this.props.token, this.devicesReceived, this.gpsDataReceived, this.batteryDataReceived, this.alarmsDataReceived, this.deviceSettingDataReceived, this.deviceStatusReceived, this.engineReceived, this.deviceSignalReceived, this.hideLoader);
};
    devicesReceived= devices => {
        console.log('DEVICES ARE: ', devices);
        this.setState({
        deviceList: devices.data,
        });

        // this.socket.getLiveGPS([devices.data[0].deviceID, devices.data[0].deviceID]);
              this.setState({ deviceList: devices.data,  });
        //    this.socket.deviceStatusReceived(devices.data);
       
        this.props.dispatch(setDevices(devices.data));//storing devices inside redux
        
            this.socket.getGPSData(devices.data);
        
    };

        gpsDataReceived = gpsData => {
            // yield put(setDeviceSignal(userResponse.data.id));
             console.log('GPSdatastatus HOME', gpsData);
            if(this.state.deviceList.length >0){ 
            console.log('GPS data>>>>>>>>>',gpsData.data );
            var tempDevices = [...this.state.deviceList];
            let index = tempDevices.findIndex(
                e => e.deviceID === gpsData.data.deviceId);
        
                    tempDevices[index].lastLatitude=gpsData.data.latitude;
                    tempDevices[index].lastLongitude=gpsData.data.longitude;
                    tempDevices[index].lastSpeed=gpsData.data.speed;
                     console.log('temp devices gps', tempDevices[index]);

                // this.setState({ coordinate: {
                //     lat: gpsData.data.latitude,
                //     lng: gpsData.data.longitude,
                // }});
                  this.setState({ deviceList: tempDevices });
            //console.log("coordinatelat>>>>>",coordinate)
        }
        this.props.dispatch(setGPSData(gpsData.data));
                };


            batteryDataReceived = batteryData => {
        console.log('BATTERY DATA RECEIVED:***', batteryData);
           this.props.dispatch(setVoltageBattery(batteryData));//storing voltage battery data inside redux
           

    //   if(this.state.deviceList.length >0){
    //     var tempDevices = [...this.state.deviceList];
    //     let index = tempDevices.findIndex(

    //       e=>e.deviceID === batteryData.data.deviceId) 
    //     this.setState({ deviceList: tempDevices.data })
    //   }
     };



          alarmsDataReceived = alarmData => {
            console.log('ALARMS DATA RECEIVED****:', alarmData);
            this.props.dispatch(setAlarms(alarmData.data));//storing alarm data inside redux
        };



          deviceSettingDataReceived = deviceSettingData => {
            console.log('DEVICE SETTING DATA RECEIVED: ',deviceSettingData);
            this.props.dispatch(setDeviceSetting(deviceSettingData.data));//storing SettingData data inside redux
            
       };



        deviceStatusReceived = deviceStatusData => {
            
            console.log('DEVICES STATUS', deviceStatusData);
        
            if (this.state.deviceList.length > 0) {
                var tempDevices = [...this.state.deviceList];
            let index = tempDevices.findIndex(
                e => e.deviceID === deviceStatusData.data.deviceId);
                tempDevices[index].currentState = parseInt(deviceStatusData.data.state,10);
                // console.log('tempDevices [1].currentState ==>', tempDevices[1].currentState);
                this.setState({ deviceList: tempDevices });
                this.props.dispatch(setDeviceStatus(deviceStatusData.data));//storing set Device Status data inside redux
            }
      };
      



          engineReceived = engineData => {
            console.log('ENGINE RECEIVED: ', engineData);
            // console.log('list>', this.state.deviceList);
            if (this.state.deviceList.length > 0) {
                console.log('engine data');
                var tempDevices = [...this.state.deviceList];
                // console.log("temp data>>>>>>>>",tempDevices);
                let index = tempDevices.findIndex(
                    e => e.deviceID === engineData.data.deviceId,
                );
            
                if (engineData.data.status == '1') {
                    tempDevices[index].lastEngineOnOff = 1; //parseInt(engineData.data.status,10);
                } else if (engineData.data.status == '0') {
                    tempDevices[index].lastEngineOnOff = 0;
                }
                console.log('temp devices engine', tempDevices[index]);

                this.setState({ deviceList: tempDevices});
                this.props.dispatch(setEngineStatus(engineData.data));//storing engine status data inside redux
                console.log("setEngineStatus>>>>" ,setEngineStatus)
                }
            };



            deviceSignalReceived = signalData => {
            console.log('DEVICE SIGNAL RECEIVED:*** ', signalData);
            if (this.state.deviceList.length > 0){
                var tempDevices = [...this.state.deviceList];
                let index =tempDevices.findIndex(
                    e => e.deviceID === signalData.data.deviceId);
                    tempDevices[index].currentState;
                    this.setState({deviceList: tempDevices});
            }

            this.props.dispatch(setDeviceSignal(signalData));//storing device Signal Received data inside redux
            //   console.log("setDeviceSignal>>>>" ,setDeviceSignal)
             };


    confirmOpen = () => {
        this.setState({ open: false})
    
    
    
    
}
    hideLoader = () => {
        this.setState({ loaderVisible: false });
    };
    showLoader = () => {
        this.setState({ loaderVisible: true });
    };

    ConfirmDialogClose = () => {
        this.setState({ open: false });
    };

    confirmAgree = () => {
        console.log('you agreee the dialog');
    };

    socket = () => {
        new SocketComponent();
    };

    getDevices = async () => {
        this.setState({
            isNextPageLoading: true,
        });
        this.api
            .send('POST', APIURLS.viewVehicles, { page: this.state.page })
            .then(response => {
                console.log('active vehicles response: ', response);
                if (response.data.code === 1019) {
                    console.log('Home Device List : ', response.data.response);
                    this.setState({
                        deviceList: [
                            ...this.state.deviceList,
                            ...response.data.response,
                        ],
                        tempDeviceList: [
                            ...this.state.tempDeviceList,
                            ...response.data.response,
                        ],
                        page: response.data.currentPage + 1,
                        totalPage: response.data.totalPages,
                        hasNextPage:
                            response.data.currentPage < response.data.totalPages
                                ? true
                                : false,
                        isNextPageLoading: false,
                    });
                } else {
                }
            })
            .catch(error => console.log('error: ', error));
    };

    // Refer to https://github.com/google-map-react/google-map-react#use-google-maps-api
    handleApiLoaded = (map, google) => {
        console.log('map', map);
        console.log('google', google);
    };

    handleSidebarToggle = () => {
        this.setState({
            isSidebarShown: !this.state.isSidebarShown,
        });
    };

    goToGensetScreen = () => {
        this.props.history.push(SCREENS.GENSET);
    };

    goToDeviceScreen = () => {
        this.props.history.push(SCREENS.DEVICE);
    };

    goToDriverScreen = () => {
        this.props.history.push(SCREENS.DRIVER);
    };

    goToPOIScreen = () => {
        this.props.history.push(SCREENS.POI);
    };

    handleOpenModal = () => {
        this.setState({
            isModalShown: true,
        });
    };

    handleCloseModal = () => {
        this.setState({
            isModalShown: false,
        });
    };

    goToSettingScreen = () => {
        this.props.history.push(SCREENS.SETTINGS);
    };

    goToVehicleScreen = () => {
        this.props.history.push(SCREENS.VEHICLE);
    };

    goToHomeScreen = () => {
         this.props.history.push(SCREENS.HOME);
        this.props.history.push(SCREENS.DASHBOARDINFO);
    };

    goToReportScreen = () => {
        this.props.history.push(SCREENS.Reports);
    };

    handleVehicleNoSorting = () => {
        this.setState({
            sortBy: 'vehicleNo',
            sortAsc: !this.state.sortAsc,
        });
    };

    handleTrackerNoSorting = () => {
        this.setState({
            sortBy: 'trackerNo',
            sortAsc: !this.state.sortAsc,
        });
    };

    handleStatusSorting = () => {
        this.setState({
            sortBy: 'status',
            sortAsc: !this.state.sortAsc,
        });
    };

    //  handleOpenModal = () => {
    //     this.setState({
    //     setIsModalShown:false
    //     })
    // };
    

    addDevice = async () => {
        const body = {
            device:{
                deviceID: ""+this.state.trackerNo,
            } ,
            vehicle: {
               registrationNo:this.state.vehicleNo,
               color: "red",
               vehicleType : 2,
               fuelType:1,
               mileage:"200",
               engineNo:"engine",
               chassis:"chassis",
               vehicleModel:"200",
            },
        };
        this.api.send('POST', APIURLS.addDevice,body)
            .then(res => {
                console.log(
                    'Body for add device',
                    body,
                    'Response add device',
                );
                if (res.data.code === 1008) {
                    props.history.goBack();
                } else {
                    console.log("res>",res);

                   // ModalDescription(res.data.id);
                    handleOpenModal();
                    console.log('Bad Body ADD DEVICE');
                }
            })
            .catch(error => {
                console.log('Error', error);
                {this.props.intl.formatMessage({ ...messages.DeviceNotExist })}
            });
    }

    changeFilter = e => {
        // 0 => running
        // 1 => idle
        // 2 => Parked
        let devices = this.state.deviceList.filter(device => {
            if (
                e.target.value === 0 &&
                device.lastVehicleInformation.EngineStatus == 0 &&
                device.lastVehicleInformation.GpsSpeed > 0
            ) {
                 running
                return device;
            } else if (
                e.target.value === 1 &&
                device.lastVehicleInformation.EngineStatus == 1 &&
                device.lastVehicleInformation.GpsSpeed == 0
            ) {
                 idle
                return device;
            } else if (
                e.target.value === 2 &&
                device.lastVehicleInformation.EngineStatus == 2 &&
                device.lastVehicleInformation.GpsSpeed == 0
            ) {
             parked
                return device;
            } else if (e.target.value === 3) {
                 offline
            }
        });
        this.setState({ deviceList: devices, filter: e.target.value });
    };

    clearFilter = () => {
        this.setState({ deviceList: this.state.tempDeviceList, filter: '' });
    };

    searchVehicle = () => {};

    render() {
        const {
            isModalShown,
            coordinate,
            sortBy,
            sortAsc,
            deviceList,
        } = this.state;
        const { classes } = this.props;
        const mapOptions = {
            panControl: true,
            mapTypeControl: false,
            fullscreenControl: false,
            streetViewControl: false,
            scrollwheel: true,
            mapTypeId: 'roadmap',
        };

        const sortUp = (
            <Img src={SortUpIcon} alt="sort up icon" className={classes.icon} />
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
                    <title>
                        {this.props.intl.formatMessage({ ...messages.home })}            
                    </title>
                </Helmet>
                {this.state.loaderVisible ? (
                    <Grid item xs={3}>
                        <Grid className={classes.activity}>
                            <Sentry
                                color="#28ACEA"
                                size={200}
                                speed={1}
                                animating={true}
                            />
                        </Grid>
                    </Grid>
                ) : null}

                <div>
                    <Drawer
                        className={classes.drawer}
                        variant="temporary"
                        anchor="left"
                        open={this.state.isSidebarShown}
                        onClose={this.handleSidebarToggle}
                    >
                        <div
                            className={classes.drawer}
                            onClick={this.toggleDrawer}
                        >
                            <Grid
                                container
                                justify="center"
                                alignItems="center"
                                className={classes.avatar}
                            >
                                <UserAvatar
                                    alt="Profile Avatar"
                                    src={defaultProfileImage}
                                />
                            </Grid>
                            <Typography
                                variant="h6"
                                className={classes.textTitleStyle}
                                align="center"
                            >
                                <FormattedMessage {...messages.genset} />
                            </Typography>
                            <div style={{ marginTop: '1em' }}>
                                <List>
                                    <ListItem
                                        button
                                        key="dashboard"
                                        onClick={this.goToHomeScreen}
                                        className={classes.listItemContainer}
                                    >
                                        <ListItemIcon>
                                            <FontAwesomeIcon
                                                icon={faChartBar}
                                                size="lg"
                                            />
                                        </ListItemIcon>
                                        <ListItemText primary="Dashboard" />
                                    </ListItem>

                                    <ListItem
                                        button
                                        key="settings"
                                        onClick={this.goToSettingScreen}
                                        className={classes.listItemContainer}
                                    >
                                        <ListItemIcon>
                                            <FontAwesomeIcon
                                                icon={faCogs}
                                                size="lg"
                                            />
                                        </ListItemIcon>
                                        <ListItemText primary="Settings" />
                                    </ListItem>

                                    <ListItem
                                        button
                                        key="device"
                                        onClick={this.goToDeviceScreen}
                                        className={classes.listItemContainer}
                                    >
                                        <ListItemIcon>
                                            <FontAwesomeIcon
                                                icon={faSatelliteDish}
                                                size="lg"
                                            />
                                        </ListItemIcon>
                                        <ListItemText primary="Device" />
                                    </ListItem>

                                     <ListItem
                                        button
                                        key="genset"
                                        onClick={this.goToGensetScreen}
                                        className={classes.listItemContainer}
                                    >
                                        <ListItemIcon>
                                            <FontAwesomeIcon
                                                icon={faCarAlt}
                                                size="lg"
                                            />
                                        </ListItemIcon>
                                        <ListItemText primary="Genset" />
                                    </ListItem> 

                                    <ListItem
                                        button
                                        key="driver"
                                        onClick={this.goToDriverScreen}
                                        className={classes.listItemContainer}
                                    >
                                        <ListItemIcon>
                                            <FontAwesomeIcon
                                                icon={faUsers}
                                                size="lg"
                                            />
                                        </ListItemIcon>
                                        <ListItemText primary="Driver" />
                                    </ListItem>

                                    <ListItem
                                        button
                                        key="vehicle"
                                        onClick={this.goToVehicleScreen}
                                        className={classes.listItemContainer}
                                    >
                                        <ListItemIcon>
                                            <FontAwesomeIcon
                                                icon={faCar}
                                                size="lg"
                                            />
                                        </ListItemIcon>
                                        <ListItemText primary="Vehicle" />
                                    </ListItem>

                                    <ListItem
                                        button
                                        key="Reports"
                                        onClick={this.goToReportScreen}
                                        className={classes.listItemContainer}
                                    >
                                        <ListItemIcon>
                                            <FontAwesomeIcon
                                                icon={faFileAlt}
                                                size="lg"
                                            />
                                        </ListItemIcon>
                                        <ListItemText primary="Reports" />
                                    </ListItem>
                                    <ListItem
                                        button
                                        key="pointOfInterest"
                                        onClick={this.goToPOIScreen}
                                        className={classes.listItemContainer}
                                    >
                                        <ListItemIcon>
                                            <FontAwesomeIcon
                                                icon={faSearchLocation}
                                                size="lg"
                                            />
                                        </ListItemIcon>
                                        <ListItemText primary="Point Of Interest" />
                                    </ListItem>

                                     <ListItem button key="tnc" onClick={() => console.log('tnc')} className={classes.listItemContainer}>
                                <ListItemIcon>
                                <FontAwesomeIcon icon={faFileAlt} size="lg" />
                                </ListItemIcon>
                                <ListItemText primary="Terms and Conditions" />
                            </ListItem> 

                                    <ListItem
                                        button
                                        key="logout"
                                        onClick={() =>
                                            this.props.dispatch(
                                                logoutUser(history),
                                            )
                                        }
                                        className={classes.listItemContainer}
                                    >
                                        <ListItemIcon>
                                            <FontAwesomeIcon
                                                icon={faPowerOff}
                                                size="lg"
                                            />
                                        </ListItemIcon>
                                        <ListItemText primary="Logout" />
                                    </ListItem>
                                </List>
                            </div>
                        </div>
                    </Drawer>
                    <Grid container>
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
                            <Grid
                                item
                                onClick={this.handleSidebarToggle}
                                className={classes.settingsBtn}
                            >
                                <FontAwesomeIcon icon={faBars} size="2x" />
                            </Grid>
                            <Img
                                src={GPSinaLogoGrey}
                                alt="GPSina Grey Logo"
                                className={classes.logo}
                            />
                            <Grid
                                item
                                onClick={this.goToSettingScreen}
                                className={classes.settingsBtn}
                            >
                                <FontAwesomeIcon icon={faCog} size="2x" />
                            </Grid>
                        </Grid>

                        <Grid container className={classes.container}>
                            <Grid
                                item
                                xs={4}
                                id="item-container"
                                className={classes.leftContainer}
                            >
                                 <Grid
                                    container
                                    spacing={2}
                                    justify="space-between"
                                    direction="row"
                                >
                                    <Grid item xs={9}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={3}>
                                                <Typography
                                                    variant="body1"
                                                    color="initial"
                                                >
                                                    <FormattedMessage
                                                        {...messages.vehicleNo}
                                                    />
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={9}>
                                                <Input
                                                    className={classes.textfield}
                                                    type='text' onChange={(e)=>this.setState({vehicleNo:e.target.value})
                                                }
                                                    // defaultValue={"email"}
                                                    // placeholder="Enter Vehicle No"
                                                    disableUnderline
                                                />
                                            </Grid>
                                        </Grid>

                                        <Grid container spacing={2}>
                                            <Grid item xs={3}>
                                                <Typography
                                                    variant="body1"
                                                    color="initial"
                                                >
                                                    <FormattedMessage
                                                        {...messages.trackerNo}
                                                    />
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={9}>
                                                <Input
                                                    className={
                                                        classes.textfield
                                                    }
                                                    type='text' onChange={(e)=>this.setState({trackerNo:e.target.value})}
                                                    // defaultValue={"email"}
                                                    // placeholder="Enter Tracker No"
                                                    disableUnderline
                                                />
                                            </Grid>
                                        </Grid>

                                        <Grid container spacing={2}>
                                            <Grid item xs={3}>
                                                <Typography
                                                    variant="body1"
                                                    color="initial"
                                                >
                                                    <FormattedMessage
                                                        {...messages.search}
                                                    />
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={9}>
                                                <Input
                                                    className={
                                                        classes.textfield
                                                    }
                                                    // defaultValue={"email"}
                                                    // placeholder="Enter Search Key"
                                                    disableUnderline
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Button
                                            className={classes.btn}
                                            variant="contained"
                                            onClick={()=>this.addDevice()}
                                        >
                                            <FormattedMessage
                                                {...messages.addDevice}
                                            />
                                        </Button>
                                    </Grid>
                                </Grid> 

                                 <Grid container direction="column"> 
                                 <Grid
                                        item
                                        className={classes.paginationContainer}
                                    > 
                                 <div
                                    style={{
                                       flex: 1,
                                       backgroundColor: 'black',
                                  }}
                               >
                                        {/* 
                                    <div
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            display: 'flex',
                                        }}
                                        >
                                    <button
                                    style={{
                                        borderRadius: 20,
                                    }}
                                    >
                                    Parked
                                    </button>
                                    </div>
                                </div> 
                                 <Box xs={12}>
                                    <Select
                                        style={{
                                            minWidth: '75%',
                                            marginRight: '15px',
                                            backgroundColor: '#fff',
                                        }}
                                        id="demo-simple-select"
                                        value={this.state.filter}
                                        onChange={this.changeFilter}
                                    >
                                        <MenuItem value={0}>Moving</MenuItem>
                                        <MenuItem value={2}>Parked</MenuItem>
                                        <MenuItem value={1}>Idling</MenuItem>
                                        <MenuItem value={3}>Offline</MenuItem>
                                    </Select>
                                 <Button
                                        variant="contained"
                                        color="primary"
                                        href="#contained-buttons"
                                        onClick={this.clearFilter}
                                    >
                                    clear
                                    <FontAwesomeIcon
                                    icon={faFilter}
                                    size="sm"
                                    />
                                    </Button>
                                    
                                    </Box> 
                                    
                                    <div
                                    style={{
                                        margin: 10,
                                        backgroundColor: 'black',
                                    }}
                                    >
                                */}
                                            <button
                                                value={this.state.filter}
                                                onChange={this.changeFilter}
                                                className={classes.movingbtn}
                                                size="lg"
                                                style={{
                                                    margin: 5,
                                                    borderRadius: 15,
                                                    backgroundColor: 'black',
                                                    border: '1px solid #55b44f',
                                                    color: '#55b44f',
                                                }}
                                            >
                                                Moving(0)
                                            </button>
                                            <button
                                                value={this.state.filter}
                                                onChange={this.changeFilter}
                                                style={{
                                                    margin: 5,
                                                    borderRadius: 15,
                                                    backgroundColor: 'black',
                                                    border: '1px solid #4da8ee',
                                                    color: '#4da8ee',
                                                }}
                                            >
                                                Parked(0)
                                            </button>
                                            <button
                                                value={this.state.filter}
                                                onChange={this.changeFilter}
                                                style={{
                                                    margin: 5,
                                                    borderRadius: 15,
                                                    backgroundColor: 'black',
                                                    border: '1px solid #e5a744',
                                                    color: '#e5a744',
                                                }}
                                            >
                                                Idling(0)
                                            </button>
                                            <button
                                                value={this.state.filter}
                                                onChange={this.changeFilter}
                                                style={{
                                                    margin: 5,
                                                    borderRadius: 15,
                                                    backgroundColor: 'black',
                                                    border: '1px solid #cd3020',
                                                    color: '#cd3020',
                                                }}
                                            >
                                                Offline(0)
                                            </button>
                                        </div>
                                        {/*<Box flexGrow={1}>
                                    <TextField
                                        size="small"
                                        label="Search"
                                        variant="filled"
                                        id="outlined-basic"
                                        inputRef={textField}
                                        style={{
                                            backgroundColor: '#fff',
                                            borderRadius: '5px',
                                            marginRight: '5px',
                                        }}
                                    />
                                    <Button
                                        alignSelf="center"
                                        variant="contained"
                                        color="primary"
                                        //href="#contained-buttons"
                                        onClick={this.searchVehicle}
                                    >
                                        Search
                                    </Button>
                                </Box> */}
                                        <Grid
                                            container
                                            direction="row"
                                            justify="center"
                                            alignItems="center"
                                        >
                                            <Grid
                                                item
                                                xs
                                                className={
                                                    classes.paginationBtn
                                                }
                                                onClick={
                                                    this.handleVehicleNoSorting
                                                }
                                            >
                                                <Typography
                                                    variant="body1"
                                                    style={{
                                                        color: 'grey',
                                                        fontSize: '14px',
                                                    }}
                                                >
                                                    <FormattedMessage
                                                        {...messages.vehicleNo}
                                                    />
                                                </Typography>
                                                {sortBy === 'vehicleNo' ? (
                                                    sortAsc ? (
                                                        sortUp
                                                    ) : (
                                                        sortDown
                                                    )
                                                ) : (
                                                    <div />
                                                )}
                                            </Grid>

                                            <Grid
                                                item
                                                xs
                                                className={
                                                    classes.paginationBtn
                                                }
                                                onClick={
                                                    this.handleTrackerNoSorting
                                                }
                                            >
                                                <Typography
                                                    variant="body1"
                                                    style={{
                                                        color: 'grey',
                                                        fontSize: '14px',
                                                    }}
                                                >
                                                    <FormattedMessage
                                                        {...messages.trackerNo}
                                                    />
                                                </Typography>
                                                {sortBy === 'trackerNo' ? (
                                                    sortAsc ? (
                                                        sortUp
                                                    ) : (
                                                        sortDown
                                                    )
                                                ) : (
                                                    <div />
                                                )}
                                            </Grid>

                                            <Grid
                                                item
                                                xs
                                                className={
                                                    classes.paginationBtn
                                                }
                                                onClick={
                                                    this.handleStatusSorting
                                                }
                                            >
                                                <Typography
                                                    variant="body1"
                                                    style={{
                                                        color: 'grey',
                                                        fontSize: '14px',
                                                    }}
                                                >
                                                    <FormattedMessage
                                                        {...messages.status}
                                                    />
                                                </Typography>
                                                {sortBy === 'status' ? (
                                                    sortAsc ? (
                                                        sortUp
                                                    ) : (
                                                        sortDown
                                                    )
                                                ) : (
                                                    <div />
                                                )}
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Paper
                                        elevation={3}
                                        variant="outlined"
                                        className={classes.black}
                                    >
                                        <Grid item className={classes.list}>
                                            <AutoSizer>
                                                {({ height, width }) => (
                                                    <InfiniteList
                                                        index={0}
                                                        height={height}
                                                        width={width}
                                                        //text={' List'}
                                                        classes={classes}
                                                        List={'VehicleList'}
                                                        itemData={
                                                            this.state
                                                                .deviceList
                                                        }
                                                        itemCount={
                                                            this.state
                                                                .deviceList
                                                                .length
                                                        }
                                                        hasNextPage={
                                                            this.state
                                                                .hasNextPage
                                                        }
                                                        isNextPageLoading={
                                                            this.state
                                                                .isNextPageLoading
                                                        }
                                                        loadNextPage={() => {
                                                            
                                                            console.log('loadNextPage',);
                                                            // this.getDevices();
                                                        }}
                                                    />
                                                )}
                                            </AutoSizer>
                                            {this.state.deviceList.map(
                                                device => (
                                                    <DeviceList
                                                        swipeAction={
                                                            this.confirmOpen
                                                        }
                                                        onOpenModal={
                                                            this.handleOpenModal
                                                        }
                                                        date={device.CreatedAt}
                                                        modelNumber={
                                                            device.deviceID
                                                        }
                                                        deviceName={
                                                            device.registrationNo
                                                        }
                                                        lastVehicleInformation={
                                                            device.lastVehicleInformation
                                                        }
                                                        device={device}
                                                    />
                                                ),
                                            )} 
                                 </Grid>
                                </Paper> 
                                 </Grid> 
                            </Grid>
                            <Grid item xs={8} className={classes.mapContainer}>
                                <Map center={coordinate} />
                         {/*   {console.log('coordinate',coordinate)}  */}
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
                <ConfirmDialog
                    title={'Alert'}
                    agreeText={'Ok'}
                    open={this.state.open}
                    disagreeText={'Cancel'}
                    agree={this.confirmAgree}
                    disagree={this.ConfirmDialogClose}
                    handleClose={this.ConfirmDialogClose}
                    message={'Are you sure to delete this vehicle'}
                />
            </div>
        );
    }
}

HomePage.propTypes = {
    dispatch: PropTypes.func.isRequired,
};
const mapStateToProps = state => {
    console.log('state', state.auth.user);

    const { auth } = state;
    return auth;
};

export function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        setDevices,
        setGPSData,
        setVoltageBattery,
        setAlarms,
        setDeviceSetting,
        setDeviceStatus,
        setEngineStatus,
        setDeviceSignal,
      
         
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default withConnect(injectIntl(withStyles(useStyles)(HomePage)));
