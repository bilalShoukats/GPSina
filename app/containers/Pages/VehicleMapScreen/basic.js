import React, { Component } from "react"
import { compose } from "recompose"
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow,
    Polyline
} from "react-google-maps"

const MapWithAMarker = compose(withScriptjs, withGoogleMap)(props => {
    const defaultMapOptions = {
        disableDefaultUI: true
    };
    return (
        <GoogleMap defaultZoom={15} defaultCenter={{ lat: 29.5, lng: -95 }} center={{ lat: props.markers[0].latitude, lng: props.markers[0].longitude }} defaultOptions={defaultMapOptions}>
            <Polyline path={[{ lat: props.initialData[0].latitude, lng: props.initialData[0].longitude }, { lat: props.markers[0].latitude, lng: props.markers[0].longitude }]} options={{strokeColor: 'blue',strokeWeight: 3}}/>
            {props.markers.map(marker => {
                const onClick = props.onClick.bind(this, marker)
                return (
                    <Marker
                        key={marker.id}
                        onClick={onClick}
                        position={{ lat: marker.latitude, lng: marker.longitude }}
                    >
                        {props.selectedMarker === marker &&
                            <InfoWindow>
                                <div>
                                    {marker.latitude}
                                </div>
                            </InfoWindow>}
                    </Marker>
                )
            })}
        </GoogleMap>
    )
})

export default class ShelterMap extends Component {
    constructor(props) {
        super(props)
        this.state = {
            shelters: [],
            selectedMarker: false
        }
    }
    componentDidMount() {
        this.setState({ shelters: this.props.data, initialData: this.props.initialData })
    }
    handleClick = (marker, event) => {
        // console.log({ marker })
        this.setState({ selectedMarker: marker })
    }
    render() {

        return (
            <MapWithAMarker
                disabledefaultUI={true}
                selectedMarker={this.state.selectedMarker}
                markers={this.state.shelters}
                initialData={this.state.initialData}
                onClick={this.handleClick}
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAywCpAjtueU2fVwjArfZMm_4RAf7BqZBI"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100vh` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            >
            </MapWithAMarker>
        )
    }
}