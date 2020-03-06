import React, { Component } from "react"
import { compose } from "recompose"
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow
} from "react-google-maps"
const demoFancyMapStyles = require("../../../MapStyle/MapStyle.json");

const MapWithAMarker = compose(withScriptjs, withGoogleMap)(props => {
    return (
        <GoogleMap defaultZoom={1.5}
            defaultOptions={{ styles: demoFancyMapStyles, disableDefaultUI: true, scaleControl: true, zoomControl: true }} defaultCenter={{ lat: 29.5, lng: -95 }}>
            {
                props.markers.map(marker => {
                    console.log('bawwa jee aja', marker)
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
                })
            }
        </GoogleMap >
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
        let data = [...this.props.data.values()];
        console.log("Data in google map: ", [...this.props.data.values()]);
        console.log("Data in google map: ", this.props.data)
        // this.setState({ shelters: this.props.data })
        console.log("Data in google map: ", this.state.shelters)
    }
    handleClick = (marker, event) => {
        // console.log({ marker })
        this.setState({ selectedMarker: marker })

    }

    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            this.setState({ shelters: this.props.data })
        }
    }
    render() {
        console.log("Data in google map: ", this.state.shelters);
        return (
            <MapWithAMarker
                selectedMarker={this.state.selectedMarker}
                markers={this.state.shelters}
                onClick={this.handleClick}
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAywCpAjtueU2fVwjArfZMm_4RAf7BqZBI"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `85%`, width: '100%', minHeight: '400px', }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        )
    }
}