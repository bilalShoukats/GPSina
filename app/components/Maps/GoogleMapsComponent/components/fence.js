import React from 'react';
import { compose, withStateHandlers, lifecycle } from "recompose";
import { withGoogleMap, withScriptjs, GoogleMap, Polyline } from 'react-google-maps';
const { DrawingManager } = require("react-google-maps/lib/components/drawing/DrawingManager");
const demoFancyMapStyles = require("../../../../MapStyle/MapStyle.json");

const triangleCoords = [
    { lat: 25.774, lng: -80.19 },
    { lat: 18.466, lng: -66.118 },
    { lat: 32.321, lng: -64.757 },
    { lat: 25.774, lng: -80.19 }
];

export default class FenceContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    resetFence = () => {
        this.innerProps.resetFence();
    }

    componentDidMount = () => {
        // console.log("testing: ", this.map);
    }

    render() {
        const defaultMapOptions = {
            disableDefaultUI: true,
            scaleControl: true,
            zoomControl: true,
            styles: demoFancyMapStyles,
        };
        let me = this;
        const MapMapWithADrawingManager = compose(
            withStateHandlers(() => ({
                isMarkerShown: false,
                markerPosition: null
            }), {
                    onMapClick: ({ isMarkerShown }) => (e) => ({
                        markerPosition: e.latLng,
                        isMarkerShown: true
                    })
                }),
            withScriptjs,
            withGoogleMap,
            lifecycle({
                componentWillMount() {
                    this.setState({
                        places: [],
                        maxMarkers: 0,
                        mapRef: {},
                        onMapMounted: ref => {
                            this.setState({
                                mapRef: ref
                            });
                        },
                        addMarker: e => {
                            if (this.state.maxMarkers < 2) {
                                const newPlace = {
                                    id: this.state.places.length,
                                    lat: e.latLng.lat(),
                                    lng: e.latLng.lng()
                                };
                                this.setState({ places: [...this.state.places, newPlace], maxMarkers: this.state.maxMarkers + 1 }, () => {
                                    if (this.state.places.length === 2) {
                                        this.state.showDirections();
                                    }
                                });
                            }
                        },
                        resetFence: () => {
                            me.props.disableResetButton();
                            this.setState({
                                places: [], maxMarkers: 0, directions: null
                            });
                        },
                        showDirections: () => {
                            if (this.state.places.length == 2) {
                                const DirectionsService = new google.maps.DirectionsService();
                                DirectionsService.route({
                                    origin: this.state.places[0],
                                    destination: this.state.places[1],
                                    optimizeWaypoints: true,
                                    travelMode: google.maps.TravelMode.DRIVING,
                                }, (result, status) => {
                                    if (status === google.maps.DirectionsStatus.OK) {
                                        this.setState({ directions: { ...result }, markers: true }, () => {
                                            me.props.enableAddFenceButton(this.state.directions.routes[0].overview_path);
                                            // me.props.onDirectionConfirm(this.state.directions.routes[0].overview_path);
                                        })
                                    } else {
                                        this.state.resetFence();
                                        console.error(`error fetching directions ${result}`);
                                    }
                                });
                            }
                        },
                        onDrawingComplete: evt => {
                            // const polyArray = evt.getPath().getArray();
                            // let paths = [];
                            // polyArray.forEach(function (path) {
                            //     paths.push({ latitude: path.lat(), longitude: path.lng() });
                            // });

                            // console.log("polyline paths: ", paths);
                        },
                        onDragEnd: (markerId) => evt => {
                            this.state.places[markerId].lat = evt.latLng.lat();
                            this.state.places[markerId].lng = evt.latLng.lng();
                            this.setState({ places: this.state.places });
                            this.state.showDirections();
                        },
                    })
                }
            })
        )
            (props =>
                <GoogleMap
                    onClick={props.addMarker.bind(this)}
                    ref={props.onMapMounted}
                    defaultZoom={10}
                    defaultCenter={{ lat: -33.8665433, lng: 151.1956316 }}
                    defaultOptions={defaultMapOptions}
                >
                    <Polyline
                        path={triangleCoords}
                        key={1}
                        editable={true}
                        options={{
                            strokeColor: "#FF0000",
                            strokeOpacity: 0.8,
                            strokeWeight: 2,
                            fillColor: "#FF0000",
                            fillOpacity: 0.35
                        }}
                    />

                    <DrawingManager
                        setMap={GoogleMap}
                        onOverlayComplete={props.onDrawingComplete()}
                        // defaultDrawingMode={google.maps.drawing.OverlayType.CIRCLE}
                        defaultDrawingMode={google.maps.drawing.OverlayType.POLYLINE}
                        defaultOptions={{
                            drawingControl: false,
                            drawingControlOptions: {
                                position: google.maps.ControlPosition.TOP_CENTER,
                                drawingModes: [
                                    google.maps.drawing.OverlayType.CIRCLE,
                                    google.maps.drawing.OverlayType.POLYGON,
                                    google.maps.drawing.OverlayType.POLYLINE,
                                    google.maps.drawing.OverlayType.RECTANGLE,
                                ],
                            },
                            polylineOptions: {
                                strokeColor: `#ffffff`,
                                strokeOpacity: 0.8,
                                strokeWeight: 5,
                                clickable: false,
                                editable: true,
                                zIndex: 1,
                            },
                            circleOptions: {
                                fillColor: `#ffffff`,
                                fillOpacity: 0.5,
                                strokeWeight: 5,
                                clickable: false,
                                editable: true,
                                zIndex: 1,
                            },
                        }}
                    />
                    {/* {props.directions && <DirectionsRenderer directions={props.directions} options={{ suppressMarkers: true }} />}
                    {props.places.map(place => {
                        this.innerProps = props;
                        this.props.enableResetButton();
                        return (
                            <Marker
                                icon={ruoteImg}
                                key={place.id}
                                position={{ lat: place.lat, lng: place.lng }}
                                draggable={true}
                                onDragEnd={props.onDragEnd(place.id)}
                            />
                        );
                    })} */}

                </GoogleMap>
            );
        return (
            <div style={{ height: '100%' }}>
                <MapMapWithADrawingManager
                    ref={r => this.map = r}
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAywCpAjtueU2fVwjArfZMm_4RAf7BqZBI&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
            </div>
        )
    }
}