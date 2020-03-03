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
    let newLat = 0;
    let newLng = 0;
    if (props.markers.length > 0) {
        newLat = props.markers[0][2];
        newLng = props.markers[0][3];
    }
    else {
        newLat = props.defulatLat;
        newLng = props.defulatLng;
    }
    console.log(props.markers)
    return (
        <GoogleMap defaultZoom={1.5} defaultCenter={{ lat: props.defulatLat, lng: props.defulatLng }} center={{ lat: newLat, lng: newLng }} defaultOptions={defaultMapOptions}>
            <Polyline path={[{ lat: props.defulatLat, lng: props.defulatLng }, { lat: newLat, lng: newLng }]} options={{ strokeColor: 'blue', strokeWeight: 3 }} />
            {props.markers.map(marker => {
                const onClick = props.onClick.bind(this, marker)
                return (
                    <Marker
                        key={marker[0]}
                        onClick={onClick}
                        position={{ lat: marker[2], lng: marker[3] }}
                    >
                        {props.selectedMarker === marker &&
                            <InfoWindow>
                                <div>
                                    {marker[2]}
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
            selectedMarker: false,
            defulatLat: 0,
            defulatLng: 0
        }
    }
    componentDidMount() {
        let data = [...this.props.data.values()];
        // this.setState({ shelters: this.props.data, initialData: this.props.initialData })
    }
    handleClick = (marker, event) => {
        // console.log({ marker })
        this.setState({ selectedMarker: marker })
    }
    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            this.setState({ shelters: this.props.data })
            if (this.state.defulatLat === 0 && this.props.data.length > 0) {
                this.setState({ defulatLat: this.props.data[0][2], defulatLng: this.props.data[0][3] })
            }
        }
    }
    render() {

        return (
            <MapWithAMarker
                disabledefaultUI={true}
                selectedMarker={this.state.selectedMarker}
                defulatLat={this.state.defulatLat}
                defulatLng={this.state.defulatLng}
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