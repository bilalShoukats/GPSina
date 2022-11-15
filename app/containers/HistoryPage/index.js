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
import { Tab, Tabs, Grid,Typography ,Box } from '@material-ui/core';
import ReactSpeedometer from 'react-d3-speedometer';
import { withStyles, styled } from '@material-ui/styles';
import ListItemText from '@material-ui/core/ListItemText';
import { FormattedMessage, injectIntl } from 'react-intl';
import SampleGPSData from '../../components/Marker/points';
import { randomData, speedData } from '../../constants/dummy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { width, height, LATITUDE, LONGITUDE } from '../../constants/maps';
import DateTimeRange from '../../components/DatePicker/DateTimeRangePicker';
import APIURLS from '../../../app/ApiManager/apiUrl';
import ApiManager from '../../../app/ApiManager/ApiManager';
import moment from 'moment';
// import Polyline from 'react-google-maps';
import {setDevices}from'../../redux/socket/actions';
import SCREENS from '../../constants/screen';
// import { useHistory } from 'react-router-dom';
import { Alert } from 'reactstrap';
// import mapp from '../HistoryPage/mapp';
//  import  {Polyline}  from 'react-polyline';
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
            // textColor={'black'}
            startColor={'lightblue'}
        />
    </div>
);
let api = ApiManager.getInstance();
class HistoryPage extends Component {
    constructor(props) {
        // console.log('propssss>',props)
        //  history = useHistory();
        super(props);
        this.state = {
            devices: [],
            ListData:[],
            pageData:[],
            zoom: 15,
            slider: 0,
            Gdata: [],
            play: false,
            pause: true,
            tabValue: 0,
            carWidth: 30,
            carHeight: 16,
            hasNextPage: true,
            isNextPageLoading: false,
            mapType: 'roadmap',
            selectedId: 0,
            selectVehicle: 0,
            historyLatLng: [],
            polyline: [],
            // polylineData: [],
            deviceID: 0,
            Speed: [],
            historyDetails: [],
            devices: [props.devices],
            speedData: [],
            gpsSpeed: [],
            coordinate: {
                lat: [],
                lng: [],
            },
        };
        this.mapRef = null;
        this.sliderInterval = null;
        this.readDataInterval = null;
    }

    // getDevicefences =()=>{

    //     if(settings.page<settings.pages){
            
    //         api.send ('GET','/getDeviceGeofences',{
                
    //         }).then(res=>{
    //             if(res.response.data && res.response.data.length > 0){
    //              var historyDatesArray = data.concat(res.response.data);
    //              this.setState.pageData(historyDatesArray);
    //                 console.log('res---',res)
    //                 if(settings.page ==0){
    //                     // date = moment(res.response.data[0].Date).format('YYYY-MM-DD');
    //                 }else{
    //                     Alert.alert('',"Alerts not found")
    //                 }
                    
    //             }
    //         }).catch(error => {
    //             console.log("error",error)
    //         });
    //     }
    // }

    // componentDidMount = () => {
      
    //       this.getDevicefences();
       
    //   };

    // FenceScreen = () => {
    //     this.props.history.push(SCREENS.FENCE);
    //     {console.log('SCREENS.FENCE',this.props.history.push)}
    // };
    getVehicleTravelDates = () => {
        console.log('vehicle.....:', this.props.devices[0].deviceID)//state.vehicle[0].deviceID);
        api.send('GET', '/getAllTripDates', {
            deviceId:this.props.devices[0].deviceID.toString(),
            page: 1,
        })
            .then(res => {
                console.log('Travel History Dates respons....', res.data.response.data);
                //  this.setState.ListData(res.data.response.data);
                if (res.data.code === 6076) {
                    this.setState({ ListData: res.data.response.data});

                    let startDate = moment(res.data.response[0].dates)
                        .startOf('day')
                        .unix();
                    console.log('startDate', startDate);
                    let endTime = moment(res.data.response[0].dates)
                        .endOf('day')
                        .unix();
                    console.log('endTime', endTime);
                    console.log('convertDate', startDate, endTime);
                    this.setState({
                        historyDates: res.data.response[0].dates,
                    });
                    this.getVehicle(startDate, endTime);
                }
                const now = new Date(res.data.response[0].dates).unix();
                // let startOfDay = new Date(
                //     now - (now % res.data.response[0].dates),
                // );
                // let endDate = new Date(
                //     now -
                //         (now % res.data.response[0].dates) +
                //         res.data.response[0].dates,
                // );
                var t = new Date(res.data.response[0].dates);
                var formatted = moment(t).format('dd.mm.yyyy hh:MM:ss');
                console.log('t', t);
                                // const now = new Date().getTime();
                let startOfDay = new Date(now - (now % 86400000));
                let endDate = new Date(now - (now % 86400000) + 86400000);

                let polylines = res.response.map(item => (
                    {latitude: item.latitude, longitude: item.longitude}
                ))
                setSpeedData(polylines);

                const [speedData, setSpeedData] = useState([]);
                <Polyline coordinates={speedData} strokeWidth={3} />
            })
            .catch(error => {});
    };
    getVehicle = (startDate, endTime) => {
        console.log(this.state.devices);
        // console.log('selectedId', this.state.vehicle[0].deviceID);
        console.log('vehicle....22.:', this.props)//state.vehicle[0].deviceID);
        api.send('GET', '/getTripHistoryReport', {

            deviceId: this.props.devices[0].deviceID.toString(),
            //  data:this.setState.ListData,
            page:1
        })
            .then(res => {
                console.log('res>>>>>>>>',res.data.response.data[0])
                if (res.data.code === 6077) {
                    console.log('Travel History Details', res.data);
                    this.setState({ historyDetails: res.data.response.data });
                    this.setState({
                        coordinate: {
                            lat: res.data.response.data[0].latitude,
                            lng: res.data.response.data[0].longitude,
                        },
                    });
                    let latlng = res.data.response.map(item => ({
                        lat: item.latitude,
                        lng: item.longitude,
                        time: new Date(item.time),
                    }));
                    {console.log('item..............',latlng)}
                    
                    this.setState({ polylineData: latlng }, () => {
                        speed: Math.round(Math.random() * 120),
                            console.log('LatLng:', this.state.polylineData);
                    });
                    this.setState({ gpsSpeed: res.data.response.data[0].speed });
                }
            })
            .catch(error => {});
    };
    componentDidMount = () => {
        this.loadData();
    };
    componentDidMount = () => {
        this.polyline();
    };
    componentDidMount = () => {
        this.getVehicleTravelDates();
    };
    // componentDidMount = () => {
    //     this.getVehicle();
    // };
    // componentDidMount = (() => {
    //     if (this.selectedId !== null) {
    //         this.getVehicleTravelDates();
    //     }
    // },

    drawPollyline = () => {
        const map = new google.maps.Map(document.getElementById('map'), {
            zoom: 3,
            center: { lat: 0, lng: -180 },
            mapTypeId: 'terrain',
        });
          const flightPlanCoordinates = [
            { lat: 37.772, lng: -122.214 },
            { lat: 21.291, lng: -157.821 },
            { lat: -18.142, lng: 178.431 },
            { lat: -27.467, lng: 153.027 },
          ];
        const flightPath = new google.maps.Polyline({
            path: historyDetails,
            geodesic: true,
            strokeColor: '#B1210',
            strokeOpacity: 1.0,
            strokeWeight: 2,
        });
        flightPath.setMap(map);
    };
    componentWillUnmount = () => {};

    handleApiLoaded = (map, google) => {};

    playHistory = () => {
        this.sliderPlay();
        let count = 1;

        this.readDataInterval = setInterval(() => {
            // if (count <= this.state.polylineData.length) {
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
        // let point = this.state.polylineData[i];
        let point = speedData[i];
        // console.log('point', this.state.speedData[i]);
        this.calculateHeading(point);
    };

    calculateHeading = point => {
        let point1 = this.state.coordinate;

        let point2 =  point;
        const point1LatLng = new window.google.maps.LatLng(
            point1.latitude,
            point1.latitude,
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
        // }, Math.round(1000 / (100 / this.state.polylineData.length)));
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
            isNextToPageLoading: true,
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
                       <Box sx={{ width: '100%' }}>
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
                      
                            <TabPanel
                                index={0}
                                className={classes.tab}
                                value={this.state.tabValue}
                            >
                           {
                            this.state.ListData.map((index,id)=>{
                                console.log('index',index.dateTime)
                                return (
                                <div key={id}>
                                <button onClick={ this.getVehicle}>{moment(index.dateTime).format('DD-MM-YYYY')}</button>
                                
                                </div>
                                )
                            })
                           }
                                
                                                    </TabPanel>
                            <TabPanel value={this.state.tabValue} index={1}>
                            <p style={{color:"lightgrey"}}> Vehicle Info</p>
                               
                            </TabPanel>
                            </Box>
                    </Grid>
                    <Grid container lg={9} md={9} sm={12} xs={12}>
                        <Map
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
                                key={1}
                                width={this.state.carWidth}
                                height={this.state.carHeight}
                                lat={this.state.coordinate.lat}
                                lng={this.state.coordinate.lng}
                            />
                    {/* <Polyline
                            // path={pathCoordinates}
                            // geodesic={true}
                            options={{
                                path: speedData,
                                geodesic: true,
                                strokeColor: '#00a1e1',
                                strokeOpacity: 1.0,
                                strokeWeight: 4,
                            }}
                        />*/}
                        </Map>
                        <Grid
                            lg={9}
                            md={9}
                            sm={12}
                            xs={12}
                            container
                            className={classes.player}
                        >
                            <IOSSlider
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
                                    // data={this.state.polylineData}
                                    data={speedData}
                                    margin={classes.lineMargin}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line
                                        yAxisId={0}
                                        dot={true}
                                        strokeWidth={1}
                                        type="monotone"
                                        dataKey="Speed"
                                        stroke="#08c3eb"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
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


const mapStateToProps = state => {
    
    console.log('what we have in socket devices', state.socket.devices);
   

    const { socket } = state;
    return socket;
};



function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        setDevices
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default withConnect(injectIntl(withStyles(useStyles)(HistoryPage)));
