import React from 'react';
import { compose, withStateHandlers, lifecycle } from "recompose";
import { InfoWindow, withGoogleMap, withScriptjs, GoogleMap, Marker, DirectionsRenderer } from 'react-google-maps';
import ruoteImg from './node_modules/images/routeIcon.png';

export default class EditRouteMap extends React.Component {
    constructor(props) {
        super(props);
    }

    resetMarkers = () => {
        this.innerProps.resetMarkers();
    }

    render() {
        const defaultMapOptions = {
            disableDefaultUI: true,
            scaleControl: true,
            zoomControl: true,
        };
        let me = this;
        const Map = compose(
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
                            }, () => {
                                this.state.drawDirections(me.props.addresses);
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
                        resetMarkers: () => {
                            me.props.disableResetButton();
                            this.setState({
                                places: [], maxMarkers: 0, directions: null
                            });
                        },
                        drawDirections: (oldPlaces) => {
                            let oldPlaceMarkers = [{
                                id: 0,
                                lat: oldPlaces[0].lat,
                                lng: oldPlaces[0].lng
                            }, {
                                id: 1,
                                lat: oldPlaces[oldPlaces.length - 1].lat,
                                lng: oldPlaces[oldPlaces.length - 1].lng
                            }];

                            // oldPlaces = oldPlaces.slice(1, oldPlaces.length - 1);

                            this.setState({ maxMarkers: 2, places: oldPlaceMarkers }, () => {
                                this.state.showDirections();
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
                                            // me.props.enableeditRouteButton(this.state.directions.routes[0].overview_path);
                                            // me.props.onDirectionConfirm(this.state.directions.routes[0].overview_path);
                                        })
                                    } else {
                                        this.state.resetMarkers();
                                        console.error(`error fetching directions ${result}`);
                                    }
                                });
                            }
                        },
                        onDragEnd: (markerId) => evt => {
                            console.log(markerId);
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
                    // defaultCenter={{ lat: -33.8665433, lng: 151.1956316 }}
                    defaultOptions={defaultMapOptions}
                >
                    {props.directions && <DirectionsRenderer directions={props.directions} options={{ suppressMarkers: true }} />}
                    {props.places.map(place => {
                        this.innerProps = props;
                        // this.props.enableResetButton();
                        return (
                            <Marker
                                icon={ruoteImg}
                                key={place.id}
                                position={{ lat: place.lat, lng: place.lng }}
                                draggable={true}
                                onDragEnd={props.onDragEnd(place.id)}
                                // defaultPosition={{ lat: -33.866, lng: 151.195 }}
                            />
                        );
                    })}
                </GoogleMap>
            );
        return (
            <div style={{ height: '100%' }}>
                <Map
                    ref={r => this.map = r}
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAywCpAjtueU2fVwjArfZMm_4RAf7BqZBI"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
            </div>
        )
    }
}