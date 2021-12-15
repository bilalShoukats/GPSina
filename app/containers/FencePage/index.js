/**
 *
 * FencePage
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Helmet } from 'react-helmet';
import Geocode from 'react-geocode';

import Header from '../../components/Header';
import {
    Button,
    CircularProgress,
    Divider,
    Drawer,
    Grid,
    Input,
    TextField,
    Switch,
    Typography,
} from '@material-ui/core';
import { useStyles } from './styles.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBars,
    faTrashAlt,
    faHandPaper,
    faPencilAlt,
    faSearch,
    faTimes,
} from '@fortawesome/free-solid-svg-icons';

import messages from './messages';
import Map from '../../components/Map';

import mapIcon from '../../../assets/images/icons/map.png';
import Img from '../../components/Img';
import {
    GoogleMapsAPI,
    height,
    LATITUDE,
    LONGITUDE,
    PADDING,
    width,
} from '../../constants/maps';
import { withStyles } from '@material-ui/styles';
import { fenceList } from '../../constants/dummy';
import APIURLS from '../../ApiManager/apiUrl';
import ApiManager from '../../ApiManager/ApiManager';
import ConfirmDialog from '../../components/confirmAlert';

//Geocode.setApiKey(GoogleMapsAPI);
//Geocode.enableDebug();

const seeAllRef = React.createRef();
const textField = React.createRef();
const searchField = React.createRef();
class FencePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            map: null,
            open: false,
            fenceName: '',
            fenceId: null,
            coordinate: {
                lat: LATITUDE,
                lng: LONGITUDE,
            },
            fenceModel: false,
            isMarkerShown: true,
            isOpenDrawer: true,
            mapType: 'roadmap',
            fenceSwitch: false,
            searchPlace: '',
            showSearchPlace: false,

            createFence: false, // Indicate user is now creating the fence
            isFenceMode: false,
            radius: 0,
            fenceName: '',
            newFence: null,
            startPos: { x: 0, y: 0 },
            fences: [], // list of all available fences

            showAddFenceModal: false,
            showDeleteFenceModal: false,
            modalTitle: '',
            modalDesc: '',
            editing: null,
            loading: false,
        };
        this.circle = null;
        this.mapRef = null;
        this.circleRef = [];
        this.markerRef = null;
        this.api = ApiManager.getInstance();
    }

    componentDidMount = () => {};

    // Refer to https://github.com/google-map-react/google-map-react#use-google-maps-api
    handleApiLoaded = (map, google) => {
        console.log('map: ', map, ' google ', google);
        this.setState({ map });
        this.getAllFence()
            .then(fences => {
                this.drawFence(map, fences);
                this.addSearchBox(map, google);
                map.setZoom(16);
                this.addDrawingOnMap(map, google);
            })
            .catch(error => console.log(error));
    };

    addSearchBox = (map, google) => {
        let searchBox = new google.places.SearchBox(searchField.current);
        searchBox.addListener('places_changed', () => {
            let place = searchBox.getPlaces();
            if (place.length > 0) {
                place = place[0];
                if (!place.geometry || !place.geometry.location) {
                    window.alert(
                        "No details available for input: '" + place.name + "'",
                    );
                    return;
                }
                if (place.geometry.viewport) {
                    this.markerRef = new google.Marker({
                        map,
                        title: place.name,
                        position: place.geometry.location,
                    });
                    map.fitBounds(place.geometry.viewport);
                }
            }
        });
    };

    getAllFence = () => {
        return new Promise((resolve, reject) => {
            this.api
                .send('GET', APIURLS.getAllGeoFence, { page: 1 })
                .then(response => {
                    if (response.data.code == '1019') {
                        resolve(response.data.response);
                        this.setState({
                            coordinate: {
                                lat:
                                    response.data.response[0].location
                                        .coordinates[1],
                                lng:
                                    response.data.response[0].location
                                        .coordinates[0],
                            },
                        });
                    } else {
                        reject(new Error(response.data.id));
                    }
                })
                .catch(error => reject(error));
        });
    };

    drawFence = async (map, fences) => {
        await fences.map(fence => {
            let circle = new google.maps.Circle({
                strokeWeight: 2,
                fillOpacity: 0.3,
                strokeOpacity: 0.8,
                fillColor: '#000000',
                strokeColor: '#000000',
                map,
                center: new google.maps.LatLng(
                    fence.location.coordinates[1],
                    fence.location.coordinates[0],
                ),
                radius: fence.fenceRadius,
                title: fence.fenceName,
            });
            this.circleRef[fence.assignedId] = circle;
        });
        this.setState({ fences });
    };

    addDrawingOnMap = (map, maps) => {
        const drawingManager = new google.maps.drawing.DrawingManager({
            drawingControl: true,
            drawingControlOptions: {
                position: google.maps.ControlPosition.TOP_CENTER,
                drawingModes: [google.maps.drawing.OverlayType.CIRCLE],
                markerOptions: {
                    icon:
                        'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
                },
                circleOptions: {
                    strokeWeight: 2,
                    fillOpacity: 0.3,
                    strokeOpacity: 0.8,
                    fillColor: '#000000',
                    strokeColor: '#000000',
                    clickable: false,
                    editable: true,
                    zIndex: 1,
                },
            },
        });
        drawingManager.setMap(map);
        new google.maps.event.addListener(
            drawingManager,
            'circlecomplete',
            circle => {
                this.circle = circle;
                this.setState({ fenceModel: true });
            },
        );
    };

    handleChange = event => {
        event.preventDefault();
        const { name, value } = event.target;
        switch (name) {
            case 'searchPlace':
                this.setState({
                    searchPlace: value,
                });
                break;
        }
    };

    handleMapTypeClick = () => {
        if (this.state.mapType == 'roadmap') {
            this.setState({
                mapType: 'hybrid',
            });
        } else {
            this.setState({
                mapType: 'roadmap',
            });
        }
    };

    toggleDrawer = () => {
        this.setState({
            isOpenDrawer: !this.state.isOpenDrawer,
        });
    };

    handleShowSearchPlace = newState => {
        this.setState({
            showSearchPlace: newState,
        });
    };

    addFence = () => {
        this.api
            .send('POST', APIURLS.addFence, {
                fenceType: 1,
                location: {
                    type: 'Point',
                    coordinates: [
                        this.circle.getCenter().lng(),
                        this.circle.getCenter().lat(),
                    ],
                },
                ownerEmail: this.props.user.email,
                fenceName: textField.current.value,
                fenceRadius: this.circle.getRadius(),
            })
            .then(response => {
                this.setState({ fenceModel: false, fenceName: '' });
                if (response.data.code === 1008) {
                    this.setState({
                        fences: [...this.state.fences, response.data.response],
                    });
                } else {
                    console.log(response.data);
                }
            })
            .catch(error => console.log(error));
    };

    deleteFence = assignId => {
        this.api
            .send('POST', APIURLS.deleteFence, { assignedId: assignId })
            .then(response => {
                console.log('response: ', response.data);
                if (response.data.code === 1016) {
                    this.circleRef[assignId].setMap(null);
                    let fences = this.state.fences.filter(
                        fence => fence.assignedId != assignId,
                    );
                    this.setState({ fences });
                }
            })
            .catch(error => console.log(error));
    };

    updateFenceForm = () => {
        return (
            <TextField
                required
                label="Fence Name"
                variant="outlined"
                id="outlined-basic"
                inputRef={textField}
                defaultValue={this.state.fenceName}
            />
        );
    };

    fenceDialogClose = () => {
        this.circle.setMap(null);
        this.circle = null;
        this.setState({ fenceModel: false, fenceName: '' });
    };

    ConfirmDialogClose = () =>
        this.setState({ open: false, fenceId: '', fenceName: '' });

    updateFence = () => {
        this.api
            .send('POST', APIURLS.updateGeoFence, {
                assignedId: this.state.fenceId,
                fenceName: textField.current.value,
            })
            .then(response => {
                if (response.data.code == 1014) {
                    for (var i = 0; i < this.state.fences.length; i++) {
                        if (
                            this.state.fences[i].assignedId ===
                            this.state.fenceId
                        ) {
                            let newData = this.state.fences;
                            newData[i].fenceName = textField.current.value;

                            this.setState({ fences: newData }, () => {
                                this.ConfirmDialogClose();
                            });
                            break;
                        }
                    }

                    // document.querySelector(
                    //     `[id="${this.state.fenceId}"]`,
                    // ).children[0].children[0].innerText =
                    //     textField.current.value;
                } else {
                    new Error(response.data.id);
                }
            })
            .catch(error => console.log(error));
    };

    render() {
        const {
            fences,
            coordinate,
            isOpenDrawer,
            fenceSwitch,
            searchPlace,
            showSearchPlace,
            isFenceMode,
            loading,
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

        if (this.state.isFenceMode) {
            (mapOptions.panControl = false), (mapOptions.zoomControl = false);
        }

        if (this.state.mapType == 'hybrid') {
            mapOptions.mapTypeId = 'hybrid';
        } else {
            mapOptions.mapTypeId = 'roadmap';
        }

        return loading ? (
            <Grid
                style={{ width: width, height: height }}
                container
                justifyContent="center"
                alignItems="center"
            >
                <CircularProgress
                    className={classes.loadingSpinner}
                    size="4rem"
                    thickness={5}
                />
            </Grid>
        ) : (
            <div>
                <Helmet>
                    <title>
                        {this.props.intl.formatMessage({ ...messages.fence })}
                    </title>
                </Helmet>
                <Header
                    title={<FormattedMessage {...messages.fence} />}
                    showFenceBtn
                />

                <div>
                    <Grid container style={{ width: width, height: height }}>
                        <div
                            //id="seeAllFence"
                            style={{ visibility: 'hidden' }}
                        />
                        <Drawer
                            anchor="left"
                            role="presentation"
                            open={isOpenDrawer}
                            variant="temporary"
                            onClose={this.toggleDrawer}
                            classes={{ paper: classes.paper }}
                        >
                            <div
                                className={classes.drawer}
                                onClick={this.toggleDrawer}
                            >
                                <Typography
                                    variant="body1"
                                    className={classes.textTitleStyle}
                                    align="center"
                                >
                                    <FormattedMessage {...messages.fence} />
                                </Typography>
                                <Divider className={classes.dividerTitle} />
                                {fences.map(fence => (
                                    <div
                                        key={fence.assignedId}
                                        id={fence.assignedId}
                                    >
                                        <Grid
                                            container
                                            direction="row"
                                            justifyContent="space-between"
                                            align="center"
                                            className={
                                                classes.drawerItemContainer
                                            }
                                        >
                                            <Typography
                                                variant="body2"
                                                className={classes.textStyle}
                                                onClick={() => {
                                                    this.state.map.setZoom(10);
                                                    setTimeout(() => {
                                                        this.state.map.panTo({
                                                            lat:
                                                                fence.location
                                                                    .coordinates[1],
                                                            lng:
                                                                fence.location
                                                                    .coordinates[0],
                                                        });
                                                    }, 1000);
                                                    setTimeout(() => {
                                                        this.state.map.setZoom(
                                                            14,
                                                        );
                                                    }, 3000);
                                                }}
                                            >
                                                {fence.fenceName}
                                            </Typography>
                                            <div>
                                                <FontAwesomeIcon
                                                    icon={faPencilAlt}
                                                    color="green"
                                                    size="sm"
                                                    onClick={() =>
                                                        this.setState({
                                                            fenceId:
                                                                fence.assignedId,
                                                            fenceName:
                                                                fence.fenceName,
                                                            open: true,
                                                        })
                                                    }
                                                    style={{
                                                        cursor: 'pointer',
                                                    }}
                                                />
                                                <FontAwesomeIcon
                                                    size="sm"
                                                    color="red"
                                                    icon={faTrashAlt}
                                                    style={{
                                                        marginLeft: '10px',
                                                        cursor: 'pointer',
                                                    }}
                                                    onClick={() =>
                                                        this.deleteFence(
                                                            fence.assignedId,
                                                        )
                                                    }
                                                />
                                            </div>
                                        </Grid>
                                        <Divider className={classes.divider} />
                                    </div>
                                ))}
                                <Grid
                                    container
                                    direction="row"
                                    align="center"
                                    className={classes.drawerItemContainer}
                                >
                                    <Button
                                        ref={seeAllRef}
                                        id="seeAllFence"
                                        className={classes.btnDrawer}
                                        onClick={() =>
                                            this.state.map.setZoom(6)
                                        }
                                    >
                                        <Typography
                                            variant="body2"
                                            className={classes.textStyle}
                                        >
                                            <FormattedMessage
                                                {...messages.seeAllFence}
                                            />
                                        </Typography>
                                    </Button>
                                </Grid>
                                <Divider className={classes.divider} />
                            </div>
                        </Drawer>
                        <Grid item xs>
                            <div>
                                <Grid
                                    container
                                    direction="row"
                                    className={classes.topHeaderLeft}
                                >
                                    <Button
                                        className={classes.btnMenu}
                                        onClick={this.toggleDrawer}
                                    >
                                        <FontAwesomeIcon
                                            icon={faBars}
                                            color="#FFFFFF"
                                            size="lg"
                                        />
                                    </Button>
                                    <Switch
                                        checked={fenceSwitch}
                                        onChange={this.handleFenceSwitch}
                                        name="fenceSwitch"
                                        className={classes.switch}
                                    >
                                        <Typography
                                            variant="body1"
                                            className={classes.title}
                                        >
                                            <FormattedMessage
                                                {...messages.fence}
                                            />
                                        </Typography>
                                    </Switch>
                                </Grid>
                                <Grid
                                    container
                                    direction="row"
                                    className={classes.topHeaderRight}
                                >
                                    <div
                                        className={classes.searchInput}
                                        style={
                                            showSearchPlace
                                                ? { visibility: 'visible' }
                                                : { visibility: 'hidden' }
                                        }
                                    >
                                        <Input
                                            type="text"
                                            disableUnderline
                                            name="searchPlace"
                                            value={searchPlace}
                                            inputRef={searchField}
                                            className={classes.textfield}
                                            onChange={this.handleChange}
                                        />
                                        <Button
                                            className={classes.searchBtn}
                                            id="searchPlace"
                                        >
                                            <FontAwesomeIcon
                                                icon={faSearch}
                                                color="#FFFFFF"
                                                style={{
                                                    marginLeft: '5px',
                                                    cursor: 'pointer',
                                                }}
                                                size="lg"
                                            />
                                        </Button>
                                    </div>
                                    <Button
                                        className={classes.btnGrey}
                                        onClick={this.handleMapTypeClick}
                                    >
                                        <Img
                                            src={mapIcon}
                                            className={classes.logo}
                                            alt="Map icon"
                                        />
                                    </Button>
                                    <Button
                                        className={classes.btnGrey}
                                        onClick={() =>
                                            this.handleShowSearchPlace(
                                                !showSearchPlace,
                                            )
                                        }
                                    >
                                        <FontAwesomeIcon
                                            icon={
                                                !showSearchPlace
                                                    ? faSearch
                                                    : faTimes
                                            }
                                            color="#FFFFFF"
                                            size="lg"
                                        />
                                    </Button>
                                </Grid>
                            </div>
                            <Map
                                draggable={!isFenceMode}
                                options={mapOptions}
                                resetBoundsOnResize
                                center={coordinate}
                                ref={ref => {
                                    this.mapRef.current = ref;
                                }}
                                yesIWantToUseGoogleMapApiInternals
                                onGoogleApiLoaded={({ map, maps }) =>
                                    this.handleApiLoaded(map, maps)
                                }
                            />
                        </Grid>
                        <ConfirmDialog
                            message={''}
                            agreeText={'Update'}
                            open={this.state.open}
                            disagreeText={'Cancel'}
                            agree={this.updateFence}
                            title={'Update Fence Name'}
                            children={this.updateFenceForm()}
                            disagree={this.ConfirmDialogClose}
                            handleClose={this.ConfirmDialogClose}
                        />

                        <ConfirmDialog
                            message={''}
                            title={'Add Fence'}
                            agree={this.addFence}
                            agreeText={'Add Fence'}
                            disagreeText={'Cancel'}
                            open={this.state.fenceModel}
                            disagree={this.fenceDialogClose}
                            children={this.updateFenceForm()}
                            handleClose={this.fenceDialogClose}
                        />
                    </Grid>
                </div>
            </div>
        );
    }
}

FencePage.propTypes = {
    dispatch: PropTypes.func.isRequired,
};
function mapStateToProps({ auth }) {
    return auth;
}
function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default withConnect(injectIntl(withStyles(useStyles)(FencePage)));
