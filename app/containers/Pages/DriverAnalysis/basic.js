import React from 'react';
import { withGoogleMap, withScriptjs, GoogleMap, Marker, InfoWindow } from 'react-google-maps'
const demoFancyMapStyles = require("../../../MapStyle/MapStyle.json");
const { MarkerWithLabel } = require("react-google-maps/lib/components/addons/MarkerWithLabel");
import ruoteImg from 'images/routeIcon.png';
import ruoteImgOff from 'images/routeIconOff.png';

class DAnalysisMap extends React.Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        return (
            <div>
                <GoogleMap
                    zoom={4}
                    defaultZoom={4}
                    defaultCenter={{ lat: 31.407209396362305, lng: 73.7656021118164 }}
                    defaultOptions={{ styles: demoFancyMapStyles, disableDefaultUI: true, scaleControl: true, zoomControl: true }}
                >
                    {
                        this.props.data.length > 0 && this.props.data.map((item, index) => {
                            console.log("Markers Data: ", item)
                            let latlng = item.startGpsLocation.split(',');
                            let lastLineLatLng = new window.google.maps.LatLng(latlng[0], latlng[1])
                            let markerTitle = item.isHarshAcc === true ? 'harshacceleration' : 'harshbreak'
                            let markerIcon = item.isHarshAcc === true ? ruoteImg : ruoteImgOff
                            let latLngShow = latlng[0].split('E');
                            return (
                                <MarkerWithLabel labelAnchor={new google.maps.Point(0, 50)}
                                    labelStyle={{ backgroundColor: "white", fontSize: "16px", padding: "2px" }} icon={markerIcon} id={index} key={index} position={lastLineLatLng}>
                                    <div>
                                        {markerTitle} - {latLngShow[0]}
                                    </div>
                                </MarkerWithLabel>
                            )
                        })
                    }
                </GoogleMap>
            </div>
        )
    }
}

const MapComponent = withScriptjs(withGoogleMap(DAnalysisMap))

export default (props) => (
    <MapComponent
        data={props.data}
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAywCpAjtueU2fVwjArfZMm_4RAf7BqZBI&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px`, width: '100%' }} />}
        mapElement={<div style={{ height: `100%` }} />}
    />
)