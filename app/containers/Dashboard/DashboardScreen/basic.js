import React from 'react';
import { withGoogleMap, withScriptjs, GoogleMap, Polyline, Marker } from 'react-google-maps'
const demoFancyMapStyles = require("../../../MapStyle/MapStyle.json");
import DashboardVehicleInfo from 'components/Dashboard/DashboardScreen/DashboardVehicleInfo';
import DashboardVehicleEngineInfo from 'components/Dashboard/DashboardScreen/DashboardVehicleEngineInfo';
import { Button, Grid } from '@material-ui/core'
import Bar from './bar'
import DistanceDriven from './distanceDriven'

class DashboardMap extends React.Component {

    constructor(props) {
        super(props);
        this.barItems = [{ class: <Bar />, key: 0 }, { class: <Bar />, key: 1 }, { class: <DistanceDriven />, key: 2 }, { class: <DistanceDriven />, key: 3 }]
    }

    state = {
        progress: [],
    }

    bool = false;
    zoomValue = false;

    path = [
        // { lat: 18.558908, lng: -68.389916 },
        // { lat: 18.558853, lng: -68.389922 },
        // { lat: 18.558375, lng: -68.389729 },
        // { lat: 18.558032, lng: -68.389182 },
        // { lat: 18.558050, lng: -68.388613 },
        // { lat: 18.558256, lng: -68.388213 },
        // { lat: 18.558744, lng: -68.387929 },
    ]

    velocity = 5
    initialDate = new Date()

    getDistance = () => {
        // seconds between when the component loaded and now
        const differentInTime = (new Date() - this.initialDate) / 1000 // pass to seconds
        return differentInTime * this.velocity // d = v*t -- thanks Newton!
    }

    componentDidUpdate = () => {
    }

    componentDidMount = () => {
        this.interval = window.setInterval(this.moveObject, 1000)
    }

    componentWillUnmount = () => {
        window.clearInterval(this.interval)
    }

    moveObject = () => {
        const distance = this.getDistance()
        if (!distance) {
            return
        }

        let progress = this.path.filter(coordinates => coordinates.distance < distance)

        const nextLine = this.path.find(coordinates => coordinates.distance > distance)
        if (!nextLine) {
            this.setState({ progress })
            return // it's the end!
        }
        const lastLine = progress[progress.length - 1]

        const lastLineLatLng = new window.google.maps.LatLng(
            lastLine.lat,
            lastLine.lng
        )

        const nextLineLatLng = new window.google.maps.LatLng(
            nextLine.lat,
            nextLine.lng
        )

        // distance of this line 
        const totalDistance = nextLine.distance - lastLine.distance
        const percentage = (distance - lastLine.distance) / totalDistance

        const position = window.google.maps.geometry.spherical.interpolate(
            lastLineLatLng,
            nextLineLatLng,
            percentage
        )

        progress = progress.concat(position)
        this.setState({ progress })
    }

    showAllVehicles = () => {
        this.bool = false;
        this.zoomValue = false;
    }

    componentWillReceiveProps(nextProps) {
        //console.log('componentWillReceiveProps', nextProps);
        // console.log('componentWillReceiveProps', this.props);
        let array = []
        if (this.props !== nextProps) {
            nextProps.data.map((item, i) => {
                let A = { 'lat': parseFloat(item[2]), 'lng': parseFloat(item[3]), 'i': i }
                this.path.push(A)
            })
            this.check()
        }

    }
    check = () => {
        this.path = this.path.map((coordinates, i, array) => {
            // console.log('bawwaaaaa', array)
            if (array.i === 0) {
                return { ...coordinates, distance: 0 } // it begins here! 
            }
            const { lat: lat1, lng: lng1 } = coordinates
            const latLong1 = new window.google.maps.LatLng(lat1, lng1)

            const { lat: lat2, lng: lng2 } = array[0]
            const latLong2 = new window.google.maps.LatLng(lat2, lng2)

            // in meters:
            const distance = window.google.maps.geometry.spherical.computeDistanceBetween(
                latLong1,
                latLong2
            )

            return { ...coordinates, distance }
        })
    }

    // componentWillMount = () => {
    //     this.path = this.path.map((coordinates, i, array) => {
    //         if (i === 0) {
    //             return { ...coordinates, distance: 0 } // it begins here! 
    //         }
    //         const { lat: lat1, lng: lng1 } = coordinates
    //         const latLong1 = new window.google.maps.LatLng(lat1, lng1)

    //         const { lat: lat2, lng: lng2 } = array[0]
    //         const latLong2 = new window.google.maps.LatLng(lat2, lng2)

    //         // in meters:
    //         const distance = window.google.maps.geometry.spherical.computeDistanceBetween(
    //             latLong1,
    //             latLong2
    //         )

    //         return { ...coordinates, distance }
    //     })

    //     console.log(this.path)
    //     console.log(this.myMap);
    //     console.log("check socket data: ", this.props.vehicleData);
    // }

    render = () => {
        return (
            <div>
                <GoogleMap
                    ref={(myMap) => (this._googleMapComponent = myMap)}
                    defaultZoom={3}
                    zoom={this.zoomValue ? 12 : 3}
                    defaultCenter={{ lat: 12.22, lng: 12.22 }}
                    defaultOptions={{ styles: demoFancyMapStyles, disableDefaultUI: true, scaleControl: true, zoomControl: true }}
                >
                    {this.state.progress && (
                        <>
                            {/* <Polyline path={this.state.progress} options={{ strokeColor: "#FF0000 " }} /> */}
                            {/* <Marker position={{ lat: this.path.length > 0 ? this.path[0].lat : 12.22, lng: this.path.length > 0 ? this.path[0].lng : 12.22 }} onClick={() => { this.bool = true, this.zoomValue = true; }} /> */}
                            <Marker position={{ lat: 12.22, lng: 12.22 }} onClick={() => { this.bool = true, this.zoomValue = true; }} />

                        </>
                    )}
                </GoogleMap>
                <div style={{ position: "absolute", top: "17%", bottom: "83%", marginLeft: "35%" }}>
                    <Button className="btn bg-success" onClick={this.showAllVehicles}>All Fleet ({this.props.data.length} cars)</Button>
                </div>
                <div style={{ position: "absolute", top: "17%", bottom: "83%", marginLeft: "1%", visibility: this.bool ? 'visible' : 'hidden' }}>
                    <DashboardVehicleInfo />
                </div>
                <div style={{ position: "absolute", top: "74%", bottom: "26%", marginLeft: "1%", visibility: this.bool ? 'visible' : 'hidden' }}>
                    <DashboardVehicleEngineInfo />
                </div>
                <div style={{ position: "absolute", top: "17%", bottom: "83%", right: "3%", visibility: this.bool ? 'visible' : 'hidden' }}>
                    {this.barItems.map((item, index) => {
                        // console.log('bawaaaaa-', item)
                        return (
                            <Grid style={{ display: 'flex', flex: 1, height: '120px', padding: 5, cursor: 'pointer', backgroundColor: 'rgba(0, 0, 0, 0.25)', boxShadow: '2px 3px 2px #d0d0d0', minWidth: '200px', margin: 5 }} key={item.key}
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    this.setState({ selectedIndex: item.key })
                                }}
                            >
                                {item.class}
                            </Grid>
                        )
                    })}
                </div>
            </div>
        )
    }
}

const MapComponent = withScriptjs(withGoogleMap(DashboardMap))

export default (props) => (
    <MapComponent
        data={props.data}
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAywCpAjtueU2fVwjArfZMm_4RAf7BqZBI&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `600px`, width: '100%' }} />}
        mapElement={<div style={{ height: `100%` }} />}
    />
)