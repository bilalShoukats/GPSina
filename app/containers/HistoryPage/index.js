import {
    Line,
    YAxis,
    Tooltip,
    LineChart,
    CartesianGrid,
    ResponsiveContainer,
} from 'recharts';
import messages from './messages';
//import 'rc-slider/assets/index.css';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import Map from '../../components/Map';
import React, { Component } from 'react';
import {
    faCar,
    faRoute,
    faPlay,
    faPause,
} from '@fortawesome/free-solid-svg-icons';
import Header from '../../components/Header';
import Car from '../../components/Marker/car';
import List from '../../components/List/index';
import PropTypes, { object } from 'prop-types';
import TabPanel from '../../components/TabPanel';
import ListItem from '@material-ui/core/ListItem';
import SwipeableViews from 'react-swipeable-views';
import { useStyles, IOSSlider } from './styles.js';
import { Tab, Tabs, Grid } from '@material-ui/core';
import ReactSpeedometer from 'react-d3-speedometer';
import { withStyles, styled } from '@material-ui/styles';
import ListItemText from '@material-ui/core/ListItemText';
import { FormattedMessage, injectIntl } from 'react-intl';
import SampleGPSData from '../../components/Marker/points';
import { speedData, randomData } from '../../constants/dummy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { width, height, LATITUDE, LONGITUDE } from '../../constants/maps';
import DateTimeRange from '../../components/DatePicker/DateTimeRangePicker';

let gps = new SampleGPSData();
const SpeedoMeterComponent = ({ text }) => (
    <div
        style={{
            left: 120,
            bottom: 230,
            width: '13%',
            height: '20%',
            color: 'white',
            display: 'flex',
            textAlign: 'center',
            position: 'absolute',
            borderRadius: '100%',
            justifyContent: 'center',
            transform: 'translate(-50%, -50%)',
        }}
    >
        <ReactSpeedometer
            value={473}
            segments={10}
            maxValue={500}
            endColor={'blue'}
            fluidWidth={true}
            textColor={'grey'}
            needleColor={'red'}
            textColor={'black'}
            startColor={'lightblue'}
        />
    </div>
);

class HistoryPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            zoom: 15,
            slider: 0,
            Gdata: [],
            play: false,
            tabValue: 0,
            carWidth: 30,
            carHeight: 16,
            hasNextPage: true,
            isNextPageLoading: false,
            mapType: 'roadmap',
            coordinate: {
                lat: LATITUDE,
                lng: LONGITUDE,
            },
        };
        this.mapRef = null;
        this.sliderInterval = null;
        this.readDataInterval = null;
    }

    componentDidMount = () => {
        this.loadData();
    };

    componentWillUnmount = () => {};

    handleApiLoaded = (map, google) => {};

    playHistory = () => {
        this.sliderPlay();
        let count = 0;
        this.readDataInterval = setInterval(() => {
            if (count <= speedData.length) {
                count++;
                this.socketInit(count);
            } else {
                clearInterval(this.readDataInterval);
                this.setState({ play: false });
            }
        }, 1000);
    };

    socketInit = i => {
        let point = speedData[i];
        this.calculateHeading(point);
    };

    calculateHeading = point => {
        let point1 = this.state.coordinate;
        let point2 = point;
        const point1LatLng = new window.google.maps.LatLng(
            point1.lat,
            point1.lng,
        );
        const point2LatLng = new window.google.maps.LatLng(
            point2.latitude,
            point2.longitude,
        );

        const angle = window.google.maps.geometry.spherical.computeHeading(
            point1LatLng,
            point2LatLng,
        );
        const actualAngle = angle - 90;

        const marker = document
            .querySelector(
                `[src="${require('../../../assets/images/icons/car_green.png')}"]`,
            )
            .closest('div');

        if (marker) {
            marker.style.transform = `rotate(${actualAngle}deg)`;
        }
        this.setState({
            coordinate: {
                lat: point2LatLng.lat(),
                lng: point2LatLng.lng(),
            },
        });
    };

    sliderPlay = () => {
        this.sliderInterval = setInterval(() => {
            this.setState({ slider: this.state.slider + 1 });
        }, Math.round(1000 / (100 / speedData.length)));
    };

    loadData = (page = 1) => {
        this.setState({
            isNextPageLoading: true,
        });

        let temp =
            page == 1 ? randomData.slice(0, 10) : randomData.slice(11, 20);

        this.setState({ Gdata: [...this.state.Gdata, ...temp] });
        this.setState({
            hasNextPage: page == 1 ? true : false,
            isNextPageLoading: false,
        });
    };

    render() {
        const mapOptions = {
            panControl: true,
            scrollwheel: true,
            mapTypeId: 'roadmap',
            mapTypeControl: false,
            fullscreenControl: true,
            streetViewControl: true,
        };
        const { classes } = this.props;
        const { coordinate, zoom } = this.state;
        mapOptions.mapTypeId =
            this.state.mapType == 'hybrid' ? 'hybrid' : 'roadmap';

        return (
            <div>
                <Helmet>
                    <title>
                        {this.props.intl.formatMessage({ ...messages.history })}
                    </title>
                </Helmet>
                <Header title={<FormattedMessage {...messages.history} />} />

                <Grid container style={{ height: height }}>
                    <Grid
                        lg={3}
                        md={3}
                        sm={12}
                        xs={12}
                        direction="column"
                        className={classes.black}
                    >
                        <Tabs
                            textColor="primary"
                            variant="fullWidth"
                            indicatorColor="primary"
                            value={this.state.tabValue}
                            aria-label="full width tabs example"
                            onChange={(event, index) =>
                                this.setState({ tabValue: index })
                            }
                        >
                            <Tab
                                style={{
                                    color:
                                        this.state.tabValue === 0
                                            ? '#08c3eb'
                                            : '#fff',
                                }}
                                label="About Trip"
                                icon={<FontAwesomeIcon icon={faRoute} />}
                            />
                            <Tab
                                style={{
                                    color:
                                        this.state.tabValue === 1
                                            ? '#08c3eb'
                                            : '#fff',
                                }}
                                label="Vehicle Info"
                                icon={<FontAwesomeIcon icon={faCar} />}
                            />
                        </Tabs>
                        <SwipeableViews
                            axis={'x-reverse'}
                            index={this.state.tabValue}
                            onChangeIndex={index =>
                                console.log('index: ', index)
                            }
                        >
                            <TabPanel
                                index={0}
                                className={classes.tab}
                                value={this.state.tabValue}
                            >
                                <List
                                    classes={classes}
                                    index={0}
                                    height={570}
                                    width={'100%'}
                                    text={' List'}
                                    itemData={this.state.Gdata}
                                    itemCount={this.state.Gdata.length}
                                    hasNextPage={this.state.hasNextPage}
                                    isNextPageLoading={
                                        this.state.isNextPageLoading
                                    }
                                    loadNextPage={() => {
                                        this.loadData(2);
                                    }}
                                />
                            </TabPanel>
                            <TabPanel value={this.state.tabValue} index={1}>
                                Vehicle Info
                            </TabPanel>
                        </SwipeableViews>
                    </Grid>
                    <Grid container lg={9} md={9} sm={12} xs={12}>
                        {/* <Map
                            zoom={zoom}
                            options={mapOptions}
                            center={coordinate}
                            ref={ref => {
                                this.mapRef.current = ref;
                            }}
                            yesIWantToUseGoogleMapApiInternals
                            onGoogleApiLoaded={({ map, maps }) =>
                                this.handleApiLoaded(map, maps)
                            }
                        >
                            <Car
                                key={0}
                                width={this.state.carWidth}
                                height={this.state.carHeight}
                                lat={this.state.coordinate.lat}
                                lng={this.state.coordinate.lng}
                            />
                        </Map> */}
                        <Grid
                            lg={9}
                            md={9}
                            sm={12}
                            xs={12}
                            container
                            className={classes.player}
                        >
                            {/* <IOSSlider
                                marks={[]}
                                defaultValue={0}
                                valueLabelDisplay="on"
                                aria-label="ios slider"
                                value={this.state.slider}
                                getAriaValueText={(e, i) => {
                                    if (e >= 100) {
                                        clearInterval(this.sliderInterval);
                                    }
                                }}
                            />
                            <ResponsiveContainer width="100%" height="100%"> 
                                <LineChart
                                    data={speedData}
                                    margin={classes.lineMargin}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line
                                        yAxisId={0}
                                        dot={false}
                                        strokeWidth={1}
                                        type="monotone"
                                        dataKey="Speed"
                                        stroke="#08c3eb"
                                    />
                                </LineChart>
                            </ResponsiveContainer>*/}
                            <div
                                className={classes.playButton}
                                onClick={() =>
                                    this.setState(
                                        { play: !this.state.play },
                                        () => {
                                            this.playHistory();
                                        },
                                    )
                                }
                            >
                                <FontAwesomeIcon
                                    size={'2x'}
                                    color={'#08c3eb'}
                                    style={{ margin: 'auto' }}
                                    icon={this.state.play ? faPause : faPlay}
                                />
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

HistoryPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(
    null,
    mapDispatchToProps,
);

export default withConnect(injectIntl(withStyles(useStyles)(HistoryPage)));
