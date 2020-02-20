import React from 'react';
import { compose, withStateHandlers, lifecycle } from "recompose";
import { InfoWindow, withGoogleMap, withScriptjs, GoogleMap, Marker, DirectionsRenderer } from 'react-google-maps';
import ruoteImg from 'images/routeIcon.png';

export default class MapContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    resetMarkers = () => {
        this.innerProps.resetMarkers();
    }

    componentDidMount = () => {
        // console.log("testing: ", this.map);

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
                            });
                        },
                        addMarker: e => {
                            console.log("add mark");
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
                            console.log("reset markers");
                            me.props.disableButton();
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
                                        this.setState({ directions: { ...result } }, () => {
                                            me.props.onDirectionConfirm(this.state.directions.routes[0].overview_path);
                                        })
                                    } else {
                                        this.state.resetMarkers();
                                        console.error(`error fetching directions ${result}`);
                                    }
                                });
                            }
                        },
                        onDragEnd: (markerId) => evt => {
                            console.log(this.state.places[markerId]);
                            this.state.places[markerId].lat = evt.latLng.lat();
                            this.state.places[markerId].lng = evt.latLng.lng();

                            this.setState({
                                places: this.state.places
                            }, () => {
                                console.log(this.state.places)
                            });

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
                    {props.directions && <DirectionsRenderer directions={props.directions} suppressMarkers={true} />}
                    {props.places.map(place => {
                        this.innerProps = props;
                        this.props.enableButton();
                        return (
                            <Marker
                                icon={ruoteImg}
                                key={place.id}
                                position={{ lat: place.lat, lng: place.lng }}
                                draggable={true}
                                onDragEnd={props.onDragEnd(place.id)}
                            // onDragEnd={() => props.onDragEnd((values) => this.props.handleDragEnd(values))}
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