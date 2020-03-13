import React from 'react';
import { withGoogleMap, withScriptjs, GoogleMap, Polyline, Marker } from 'react-google-maps'
import DashboardVehicleInfo from 'components/Dashboard/DashboardScreen/DashboardVehicleInfo';
import DashboardVehicleEngineInfo from 'components/Dashboard/DashboardScreen/DashboardVehicleEngineInfo';
import { Button, Grid } from '@material-ui/core'
import FuelReadingGraph from './FuelReadingGraph'
import GpsSpeedGraph from './GpsSpeedGraph'
import ObdSpeedGraph from './ObdSpeedGraph'
import RpmGraph from './RpmGraph'
import ruoteImg from 'images/routeIcon.png';
const demoFancyMapStyles = require("../../../MapStyle/MapStyle.json");

export default class DashboardMap extends React.Component {
    constructor(props) {
        super(props);
        this.show = this.show.bind(this);
    }

    state = {
        devicesData: [],
        gpsSpeedData: [],
        obdSpeedData: [],
        FuelReadingData: [],
        rpmReadingData: [],
        mapRendered: false,
        deviceCounter: 0,
    }

    showGraph = false;
    bool = false;
    zoomValue = false;
    mapCenterValue = { lat: 31.407209396362305, lng: 73.7656021118164 };
    currentMarkerClicked = 0;
    vehicleDetailsData = [];

    /**
        * binded function of HOC to get data from dashboard screen.
        */
    componentDidMount = () => {
        this.props.show(this.show);
    }

    /**
        * Called when clicked on marker and show vehicle graphs and details.
        * @param markerCurrentPos number.
        * @param clickedDeviceId status of engine false or true.
        */
    mapMarkerClicked = (markerCurrentPos, clickedDeviceId) => {
        this.bool = true;
        this.zoomValue = true;
        this.mapCenterValue = markerCurrentPos;
        this.currentMarkerClicked = clickedDeviceId;
        this.showGraph = true;
    }

    /**
        * Show all vehicles on map and recenter map to default location.
        */
    showAllVehicles = () => {
        this.bool = false;
        this.zoomValue = false;
        this.mapCenterValue = { lat: 31.407209396362305, lng: 73.7656021118164 };
        this.currentMarkerClicked = 0;
        this.showGraph = false;
    }

    /**
        * Binded function and sending data to dataRecieved.
        * @param data array of data that contains vehicle information.
        * @param vehicleDetailsInfo vehicle information.
        */
    show = (data, vehicleDetailsInfo) => {
        this.state.vehicleDetailsData = vehicleDetailsInfo;
        this.dataReceived(data);
    }

     /**
        * Creating vehicle data array and setting array for all vehicle socket data.
        * @param data array of data that contains vehicle websocket data.
        */
    dataReceived = (data) => {
        console.log("data recieved: ", data);
        var flag = false;

        if (this.state.devicesData.length > 0) {
            this.state.devicesData.forEach((item) => {
                if (item.deviceId === data.deviceId) {
                    flag = true;
                    item.Lat = data.Lat;
                    item.Lng = data.Lng;
                    item.engineStatus = data.engineStatus;
                    item.gpsSpeed = data.gpsSpeed;
                    item.obdSpeed = data.obdSpeed;
                    item.carTemperature = data.carTemperature;
                    item.fuelReading = data.fuelReading;
                    item.rpm = data.rpm;
                    this.setState({ devicesData: this.state.devicesData });
                }
            });
            if (!flag) {
                this.state.devicesData[this.state.deviceCounter] = data;
                this.setState({ devicesData: this.state.devicesData, deviceCounter: this.state.deviceCounter + 1 });
            }
        }
        else {
            this.state.devicesData[this.state.deviceCounter] = data;
            this.setState({ devicesData: this.state.devicesData, deviceCounter: this.state.deviceCounter + 1 });
        }
    }

     /**
        * Render with map that render all the UI elements.
        */
    renderWithMap = () => {
        return (
            <div>
                <GoogleMap
                    zoom={this.zoomValue ? 10 : 4}
                    ref={mp => this.mapRef = mp}
                    defaultZoom={6}
                    defaultCenter={{ lat: 31.407209396362305, lng: 73.7656021118164 }}
                    defaultOptions={{ styles: demoFancyMapStyles, disableDefaultUI: true, scaleControl: true, zoomControl: true }}
                    center={this.mapCenterValue}
                >
                    {
                        this.state.devicesData.length > 0 && this.state.devicesData.map((item) => {
                            let lastLineLatLng = new window.google.maps.LatLng(item.Lat, item.Lng)
                            return (
                                <Marker icon={ruoteImg} id={item.deviceId} key={item.deviceId} position={lastLineLatLng} onClick={() => { this.mapMarkerClicked(lastLineLatLng, item.deviceId) }} />
                            )
                        })
                    }
                </GoogleMap>
                <div style={{ position: "absolute", top: "23%", marginLeft: "35%" }}>
                    <Button className="btn bg-success" onClick={this.showAllVehicles}>All Fleet ({this.state.devicesData.length})</Button>
                </div >
                <div style={{ position: "absolute", top: "28%", marginLeft: "1%", visibility: this.bool ? 'visible' : 'hidden' }}>
                    <DashboardVehicleInfo selectedDeviceId={this.currentMarkerClicked} devicesInfo={this.state.vehicleDetailsData} />
                </div>
                <div style={{ position: "absolute", top: "71%", bottom: "26%", marginLeft: "1%", visibility: this.bool ? 'visible' : 'hidden' }}>
                    <DashboardVehicleEngineInfo data={this.state.devicesData} selectedDeviceId={this.currentMarkerClicked} />
                </div>
                {
                    this.showGraph ? (
                        <div style={{ position: "absolute", top: "26%", right: "3%", visibility: this.bool ? 'visible' : 'hidden' }}>
                            <Grid style={{ display: 'flex', flex: 1, height: '120px', padding: 5, cursor: 'pointer', backgroundColor: 'rgba(0, 0, 0, 0.25)', boxShadow: '2px 3px 2px #D0D0D0', minWidth: '200px', margin: 5 }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                }}
                            >
                                <GpsSpeedGraph data={this.state.devicesData} selectedId={this.currentMarkerClicked} />
                            </Grid>
                            <Grid style={{ display: 'flex', flex: 1, height: '120px', padding: 5, cursor: 'pointer', backgroundColor: 'rgba(0, 0, 0, 0.25)', boxShadow: '2px 3px 2px #D0D0D0', minWidth: '200px', margin: 5 }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                }}
                            >
                                <ObdSpeedGraph data={this.state.devicesData} selectedId={this.currentMarkerClicked} />
                            </Grid>
                            <Grid style={{ display: 'flex', flex: 1, height: '120px', padding: 5, cursor: 'pointer', backgroundColor: 'rgba(0, 0, 0, 0.25)', boxShadow: '2px 3px 2px #D0D0D0', minWidth: '200px', margin: 5 }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                }}
                            >
                                <FuelReadingGraph data={this.state.devicesData} selectedId={this.currentMarkerClicked}/>
                            </Grid>
                        </div >
                    ) : null
                }
            </div>
        )
    }

    renderWithoutMap = () => {
        return (<div></div>)
    }

    render = () => {
        // console.log("renderWithMap", this.props)
        if (!this.state.mapRendered) {
            // this.state.mapRendered = true;
            return this.renderWithMap()
        } else {
            //return this.renderWithoutMap()
        }
    }
}