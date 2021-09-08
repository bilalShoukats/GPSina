/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */
import Paper from '@material-ui/core/Paper';
import messages from './messages';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import Img from '../../components/Img';
import Map from '../../components/Map';
import { useStyles } from './styles.js';
import React, { Component } from 'react';
import SCREENS from '../../constants/screen';
import APIURLS from '../../ApiManager/apiUrl';
import { withStyles } from '@material-ui/styles';
import { deviceList } from '../../constants/dummy';
import DeviceList from '../../components/DeviceList';
import CustomModal from '../../components/CustomModal';
import { FormattedMessage, injectIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SortUpIcon from '../../../assets/images/icons/sortUp.png';
import SortDownIcon from '../../../assets/images/icons/sortDown.png';
import { Button, Grid, Input, List, Typography } from '@material-ui/core';
import { height, LATITUDE, LONGITUDE, width } from '../../constants/maps';
import GPSinaLogoGrey from '../../../assets/images/logo/logo-small-gray.png';
import { faSortUp, faCog, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import ApiManager from '../../ApiManager/ApiManager';
import ConfirmDialog from '../confirmAlert';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            isModalShown: false,
            coordinate: {
                lat: LATITUDE,
                lng: LONGITUDE,
            },
            deviceList: deviceList,
            sortBy: 'vehicleNo', // vehicleNo, trackerNo, status
            sortAsc: false, // true: ascending/ON, false: descending/OFF
            page: 1,
            totalPage: 1,
        };
        this.api = ApiManager.getInstance();
    }

    componentDidMount = () => {
        this.getDevices();
    };

    confirmOpen = () => {
        this.setState({ open: true });
    };

    ConfirmDialogClose = () => {
        this.setState({ open: false });
    };

    confirmAgree = () => {
        console.log('you agreee the dialog');
    };

    getDevices = async () => {
        this.api
            .send('GET', APIURLS.getVehicle, {})
            .then(response => {
                console.log('devices: ', response.data);
                if (response.data.code === 1019) {
                    this.setState({
                        deviceList: response.data.response,
                        page: response.data.currentPage,
                        totalPage: response.data.totalPages,
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
            // mapTypeControl: false,
            // fullscreenControl: false,
            // streetViewControl: false,
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
        console.log('classes: ', classes.black);
        return (
            <div>
                <Helmet>
                    <title>
                        {this.props.intl.formatMessage({ ...messages.home })}
                    </title>
                </Helmet>

                <div>
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
                                onClick={this.goToSettingScreen}
                                className={classes.settingsBtn}
                            >
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
                                {/* <Grid
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
                                                    className={
                                                        classes.textfield
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
                                        >
                                            <FormattedMessage
                                                {...messages.addDevice}
                                            />
                                        </Button>
                                    </Grid>
                                </Grid> */}

                                <Grid container direction="column">
                                    <Grid
                                        item
                                        className={classes.paginationContainer}
                                    >
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
                                        // style={{
                                        //     background: '#000',
                                        // }}
                                        className={classes.black}
                                    >
                                        <Grid item className={classes.list}>
                                            {deviceList.map(device => (
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
                                                />
                                            ))}
                                        </Grid>
                                    </Paper>
                                </Grid>
                            </Grid>
                            <Grid item xs={8} className={classes.mapContainer}>
                                <Map center={coordinate} />
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
                <ConfirmDialog
                    title={'Alert'}
                    message={'Are you sure to delete this vehicle'}
                    open={this.state.open}
                    agree={this.confirmAgree}
                    disagree={this.ConfirmDialogClose}
                    handleClose={this.ConfirmDialogClose}
                />
            </div>
        );
    }
}

HomePage.propTypes = {
    dispatch: PropTypes.func.isRequired,
};
const mapStateToProps = state => {
    const { auth } = state;
    return auth;
};

export function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default withConnect(injectIntl(withStyles(useStyles)(HomePage)));
