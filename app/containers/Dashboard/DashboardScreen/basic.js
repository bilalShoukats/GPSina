import React from 'react';
import { withGoogleMap, withScriptjs, GoogleMap, Polyline, Marker } from 'react-google-maps'
const demoFancyMapStyles = require("../../../MapStyle/MapStyle.json");

class DashboardMap extends React.Component {
    state = {
        progress: [],
    }

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
        const differentInTime = (new Date() - this.initialDate) / 500 // pass to seconds
        return differentInTime * this.velocity // d = v*t -- thanks Newton!
    }

    componentDidMount = () => {
        let i = (Object.keys(this.props.data)).length
        for (let j = 0; j < i; j++) {
            let A = { 'lat': parseFloat(this.props.data[j][2]), 'lng': parseFloat(this.props.data[j][3]) }
            // this.path['i' + this.props.data[j][0]] = [A]
            this.path[j] = [A]
        }
        this.interval = window.setInterval(this.moveObject, 500)
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
            // if (j === 1) alert('52')
            let progress = []
            // if (j === 1) alert('54')
            progress[j] = this.path[j].filter(coordinates => coordinates.distance < distance)
            const nextLine = this.path[j].find(coordinates => coordinates.distance > distance)
            // if (j === 1) alert('57')
            if (!nextLine) {
                let a = this.state.progress.slice(); //creates the clone of the state
                a[j] = progress[j]
                this.setState({ progress: a })
                // return false// it's the end!
            }
            // if (j === 1) alert('64')
            if (j === 1) console.log('lastline 1', progress.length)
            const lastLine = progress[j][0]
            if (j === 1) console.log('lastline', lastLine)
            const lastLineLatLng = new window.google.maps.LatLng(
                lastLine.lat,
                lastLine.lng
            )
            // if (j === 1) alert('71')

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
            // alert(j)
            // console.log('lastline', j)
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
        // console.log('bawaaaaa 1', this.state.progress && this.state.progress[0] ? this.state.progress[0] : '')
        // console.log('bawaaaaa 2', this.state.progress && this.state.progress[1] ? this.state.progress[1] : '')
        return (
            <GoogleMap
                defaultZoom={10}
                defaultCenter={{ lat: 34.558908, lng: 70.389916 }}
                defaultOptions={{ styles: demoFancyMapStyles, disableDefaultUI: true, scaleControl: true, zoomControl: true }}
                center={{ lat: this.state.progress.length > 0 ? this.state.progress[0].lat : 34.558908, lng: this.state.progress.length > 0 ? this.state.progress[0].lng : 70.389916 }}

            >
                {/* {this.state.progress.map(item => { console.log('Pleseeee', item) })} */}
                {
                    this.state.progress ? this.state.progress.map((item, index) => {
                        console.log('bawaaaaa 1', item[0])
                        return (
                            <>
                                <Polyline key={index} path={item} options={{ strokeColor: "#FF0000" }} />
                                <Marker key={index} position={item[1]} />
                            </>
                        )
                    }) : ''
                }


            </GoogleMap>
        )
    }
}

const MapComponent = withScriptjs(withGoogleMap(DashboardMap))

export default (props) => (
    <MapComponent
        data={props.data}

        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAywCpAjtueU2fVwjArfZMm_4RAf7BqZBI&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px`, width: '100%' }} />}
        mapElement={<div style={{ height: `100%` }} />}
    />
)