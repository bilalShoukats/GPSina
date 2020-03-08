import React from 'react';
import { withGoogleMap, withScriptjs, GoogleMap, Polyline, Marker } from 'react-google-maps'
import DashboardVehicleInfo from 'components/Dashboard/DashboardScreen/DashboardVehicleInfo';
import DashboardVehicleEngineInfo from 'components/Dashboard/DashboardScreen/DashboardVehicleEngineInfo';
import { Button, Grid } from '@material-ui/core'
import Bar from './bar'
import DistanceDriven from './distanceDriven'
const demoFancyMapStyles = require("../../../MapStyle/MapStyle.json");

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
        const differentInTime = (new Date() - this.initialDate) / 5000 // pass to seconds
        return differentInTime * this.velocity // d = v*t -- thanks Newton!
    }

    componentDidMount = () => {
        let i = (Object.keys(this.props.data)).length
        for (let j = 0; j < i; j++) {
            let A = { 'lat': parseFloat(this.props.data[j][2]), 'lng': parseFloat(this.props.data[j][3]) }
            // this.path['i' + this.props.data[j][0]] = [A]
            this.path[j] = [A]
        }
        this.interval = window.setInterval(this.moveObject, 5000)
    }
    showAllVehicles = () => {
        this.bool = false;
        this.zoomValue = false;
    }

    componentWillUnmount = () => {
        window.clearInterval(this.interval)
    }

    moveObject = () => {
        let k = (Object.keys(this.props.data)).length
        // console.log('lal', k)
        for (let j = 0; j < k; j++) {
            // alert(j)
            const distance = this.getDistance()
            if (!distance) {
                return
            }
            let progress = []
            progress[j] = this.path[j].filter(coordinates => coordinates.distance < distance)
            const nextLine = this.path[j].find(coordinates => coordinates.distance > distance)
            if (!nextLine) {
                let a = this.state.progress.slice(); //creates the clone of the state
                a[j] = progress[j]
                this.setState({ progress: a })
                return // it's the end!
            }
            const lastLine = progress[j][0]
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

            progress[j] = progress[j].concat(position)
            let a = this.state.progress.slice(); //creates the clone of the state
            a[j] = progress[j]
            this.setState({ progress: a })
        }
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
    // }
    componentWillReceiveProps(nextProps) {
        // console.log('componentWillReceiveProps', nextProps);
        let array = []
        if (this.props !== nextProps) {
            nextProps.data.map((item, i) => {
                // console.log('componentWillReceiveProps', i);
                // let newArray = []
                let A = { 'lat': parseFloat(item[2]), 'lng': parseFloat(item[3]), 'i': i }
                // this.path.arrayName = item[0]
                // this.path.arrayName.add(A)
                // let B = React.cloneElement('loli',A)
                this.path[i].push(A)
            })
            this.check()
        }

    }
    check = () => {
        // console.log('bawwaaaaa lul', (Object.keys(this.path)).length)
        let k = (Object.keys(this.props.data)).length
        for (let j = 0; j < k; j++) {
            this.path[j] = this.path[j].map((coordinates, i, array) => {
                // console.log('lalli ne kia ha', array)
                if (i === 0) {
                    // console.log('lalli ne kia ha', coordinates)
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
    }
    render = () => {
        // console.log('bawaaaaa 1', this.state.progress.length > 0 ? this.state.progress[0][0].lat : '')
        // console.log('bawaaaaa 2', this.state.progress && this.state.progress[1] ? this.state.progress[1] : '')
        return (
            <div>
                <GoogleMap
                    zoom={this.zoomValue ? 10 : 4}
                    defaultZoom={4}
                    defaultCenter={{ lat: 34.558908, lng: 70.389916 }}
                    defaultOptions={{ styles: demoFancyMapStyles, disableDefaultUI: true, scaleControl: true, zoomControl: true }}
                // center={{ lat: this.state.progress.length > 0 ? this.state.progress[0].lat : 34.558908, lng: this.state.progress.length > 0 ? this.state.progress[0].lng : 70.389916 }}

                >
                    {/* {this.state.progress.map(item => { console.log('Pleseeee', item) })} */}
                    {
                        this.state.progress ? this.state.progress.map((item, index) => {
                            // console.log('bawaaaaa 1', index)
                            return (
                                <div key={index}>
                                    <Polyline path={item} options={{ strokeColor: "#FF0000" }} />
                                    <Marker position={item[1]} onClick={() => { this.bool = true, this.zoomValue = true; }} />
                                </div>
                            )
                        }) : ''
                    }
                </GoogleMap>
                <div style={{ position: "absolute", top: "25%", marginLeft: "35%" }}>
                    <Button className="btn bg-success" onClick={this.showAllVehicles}>All Fleet ({this.props.data.length} cars)</Button>
                </div >
                <div style={{ position: "absolute", top: "25%", marginLeft: "1%", visibility: this.bool ? 'visible' : 'hidden' }}>
                    <DashboardVehicleInfo />
                </div>
                <div style={{ position: "absolute", top: "74%", bottom: "26%", marginLeft: "1%", visibility: this.bool ? 'visible' : 'hidden' }}>
                    <DashboardVehicleEngineInfo />
                </div>
                <div style={{ position: "absolute", top: "25%", right: "3%", visibility: this.bool ? 'visible' : 'hidden' }}>
                    {this.barItems.map((item, index) => {
                        // console.log('bawaaaaa-', item)
                        return (
                            <Grid key={index} style={{ display: 'flex', flex: 1, height: '120px', padding: 5, cursor: 'pointer', backgroundColor: 'rgba(0, 0, 0, 0.25)', boxShadow: '2px 3px 2px #D0D0D0', minWidth: '200px', margin: 5 }} key={item.key}
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    this.setState({ selectedIndex: item.key })
                                }}
                            >
                                {item.class}
                            </Grid>
                        )
                    })
                    }
                </div >
            </div >
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