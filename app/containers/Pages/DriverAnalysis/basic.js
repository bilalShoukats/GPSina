import React from 'react';
import { withGoogleMap, withScriptjs, GoogleMap, Polyline, Marker, InfoWindow } from 'react-google-maps'
const demoFancyMapStyles = require("../../../MapStyle/MapStyle.json");
class AnalysisMap extends React.Component {
  state = {
    progress: [],
  }
  path = [
  ]
  constructor(props) {
    super(props);
  }

  velocity = 5
  initialDate = new Date()

  getDistance = () => {
    // seconds between when the component loaded and now
    const differentInTime = (new Date() - this.initialDate) / 500 // pass to seconds
    return differentInTime * this.velocity // d = v*t -- thanks Newton!
  }

  componentDidMount = () => {
    this.interval = window.setInterval(this.moveObject, 500)
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
  componentWillReceiveProps(nextProps) {
    let array = []
    console.log('componentWill1ps', nextProps.data.length);
    if (nextProps.data.length === 2) {
      console.log('componentWillps', nextProps.data);
      nextProps.data.map((item, i) => {
        item.map((subItem, i) => {
          let latlng = subItem.startGpsLocation.split(',')
          let A = { 'lat': parseFloat(latlng[0]), 'lng': parseFloat(latlng[1]), 'text': subItem.isHarshAcc === true ? 'harshacc' : 'harshbreak', 'url': subItem.isHarshAcc === true ? ('http://maps.google.com/mapfiles/ms/icons/red-dot.png') : ('http://maps.google.com/mapfiles/ms/icons/blue-dot.png') }
          this.path.push(A)
        })
      })
    }
  }
  check = () => {
    this.path = this.path.map((coordinates, i, array) => {
      console.log('bawwaaaaa', array)
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

  componentWillMount = () => {
    // let array = []
    // this.props.data.map((item, i) => {
    //     let A = { 'lat': parseFloat(item[2]), 'lng': parseFloat(item[3]) }
    //     array.push(A)
    // })
    // this.path = array;
    // this.path = this.path.map((coordinates, i, array) => {
    //     console.log('bawwaaaaa', coordinates)
    //     if (i === 0) {
    //         return { ...coordinates, distance: 0 } // it begins here! 
    //     }
    //     console.log('bawwaaaaa', i)
    //     const { lat: lat1, lng: lng1 } = coordinates
    //     const latLong1 = new window.google.maps.LatLng(lat1, lng1)

    //     const { lat: lat2, lng: lng2 } = array[0]
    //     const latLong2 = new window.google.maps.LatLng(lat2, lng2)

    //     // in meters:
    //     const distance = window.google.maps.geometry.spherical.computeDistanceBetween(
    //         latLong1,
    //         latLong2
    //     )

    //     return { ...coordinates, distance }
    // })

  }
  componentDidUpdate = () => {
    const distance = this.getDistance()
    if (!distance) {
      return
    }

    let progress = this.path.filter(coordinates => coordinates.distance < distance)

    const nextLine = this.path.find(coordinates => coordinates.distance > distance)

    let point1, point2

    if (nextLine) {
      point1 = progress[progress.length - 1]
      point2 = nextLine
    } else {
      // it's the end, so use the latest 2
      point1 = progress[progress.length - 2]
      point2 = progress[progress.length - 1]
    }

    const point1LatLng = new window.google.maps.LatLng(point1 && point1.lat ? point1.lat : '', point1 && point1.lng ? point1.lng : '')
    const point2LatLng = new window.google.maps.LatLng(point2 && point2.lat ? point2.lat : '', point2 && point2.lng ? point2.lng : '')

    const angle = window.google.maps.geometry.spherical.computeHeading(point1LatLng, point2LatLng)
    const actualAngle = angle - 90

    const markerUrl = require('./car.png')
    const marker = document.querySelector(`[src="${markerUrl}"]`)

    if (marker) { // when it hasn't loaded, it's null
      marker.style.transform = `rotate(${actualAngle}deg)`
    }

  }


  render = () => {
    // const defaultMapOptions = {
    //     disableDefaultUI: true
    // };
    return (
      <GoogleMap
        defaultZoom={9}
        defaultCenter={{ lat: 18.559008, lng: -68.388881 }}
        // defaultOptions={defaultMapOptions}
        defaultOptions={{ styles: demoFancyMapStyles, disableDefaultUI: true, scaleControl: true, zoomControl: true }}
      >
        {this.path.map((marker, index) => {
          if (index < 15) {
            return (
              <Marker
                icon={marker.url}
                key={index}
                defaultVisible={true}
                // defaultPosition={props.center}
                position={marker}

              >
                <InfoWindow >
                  <div>
                    <span style={{ color: marker.text === 'harsh acc' ? 'red' : marker.text === 'harsh swe' ? 'purple' : 'blue' }} > {' ' + marker.text + ' '}</span>
                    {marker.lat.toFixed(4)}
                  </div>
                </InfoWindow>
              </Marker>
            )
          }
        })}
      </GoogleMap>
    )
  }
}

const MapComponent = withScriptjs(withGoogleMap(AnalysisMap))

export default (props) => (
  < MapComponent
    data={props.data}
    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAywCpAjtueU2fVwjArfZMm_4RAf7BqZBI&libraries=geometry,drawing,places"
    loadingElement={< div style={{ height: `100%` }} />}
    containerElement={< div style={{ height: `400px` }} />}
    mapElement={< div style={{ height: `100%` }} />}
  />
);