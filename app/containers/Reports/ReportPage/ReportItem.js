import { MenuItem } from "@material-ui/core";
import moment from "moment";
import React from "react";
import Geocode from 'react-geocode';

const ReportItem = ({ selected, event, index, classes, reportID }) => {
    const [address, setAddress] = React.useState('');

    Geocode.setApiKey('AIzaSyCvlR6R50PN-7o-7UABXDTrdjIAMudbRfM');
    Geocode.enableDebug();

    React.useEffect(() => {
        Geocode.fromLatLng(event.lat, event.lng).then(
            response => {
                setAddress(response.results[0].formatted_address);
            },
            error => {
                console.error(error);
            },
        );
    }, [])

    return (
        <MenuItem
            key={index}
            selected={selected}
            style={{ whiteSpace: 'normal' }}
        >
            <div className={classes.maindiv}>
                <div className={classes.mainOuterDiv}>
                    <div className={classes.mainInnerDiv}>
                        <span className={classes.titleSpan}>Name</span>
                        {
                            reportID == 1?
                                <span className={classes.titleSpan}>Date</span>:
                            reportID == 2?
                                <span className={classes.titleSpan}>Duration</span>:
                            reportID == 3?
                                <span className={classes.titleSpan}>Duration</span>:
                                <span className={classes.titleSpan}>Ignition Status</span>
                        }
                    </div>
                    <div className={classes.mainInnerDiv}>
                        <span className={classes.valueSpanLeft}>{event.registrationNo}</span>
                        {
                            reportID == 1?
                                <span className={classes.valueSpanRight}>{moment(event.date).format(' MMM DD, YYYY HH:mm A')}</span>:
                            reportID == 2?
                                <span className={classes.valueSpanRight}>{moment.utc(moment.duration(moment(event.endTime).diff(moment(event.startTime))).asMilliseconds()).format("HH:mm:ss")}</span>:
                            reportID == 3?
                                <span className={classes.valueSpanRight}>{moment.utc(moment.duration(moment(event.endTime).diff(moment(event.startTime))).asMilliseconds()).format("HH:mm:ss")}</span>:
                                <span className={classes.valueSpanRight}>{event.status == 0 ? "OFF":"ON"}</span>
                        }
                    </div>
                    <div className={classes.mainInnerDiv}>
                        {
                            reportID == 1?
                                <span className={classes.titleSpan}>Speed</span>:
                            reportID == 2?
                                <span className={classes.titleSpan}>Start Time:</span>:
                            reportID == 3?
                                <span className={classes.titleSpan}>Start Time:</span>:
                                <span className={classes.titleSpan}>Ignition Time</span>
                        }
                        {
                            reportID == 1?
                                <span className={classes.titleSpan}>Lat/Long</span>:
                            reportID == 2?
                                <span className={classes.titleSpan}>End Time:</span>:
                            reportID == 3?
                                <span className={classes.titleSpan}>End Time:</span>:
                                <span className={classes.titleSpan}>Lat/Long</span>
                        }
                    </div>
                    <div className={classes.mainInnerDiv}>
                        {
                            reportID == 1?
                                <span className={classes.valueSpanLeft}>{event.speed} km/h</span>:
                            reportID == 2?
                                <span className={classes.valueSpanLeft}>{moment(event.startTime).format(' MMM DD, YYYY HH:mm A')}</span>:
                            reportID == 3?
                                <span className={classes.valueSpanLeft}>{moment(event.startTime).format(' MMM DD, YYYY HH:mm A')}</span>:
                                <span className={classes.valueSpanLeft}>{moment(event.ignitionTime).format(' MMM DD, YYYY HH:mm A')}</span>
                        }
                        {
                            reportID == 1?
                                <span className={classes.valueSpanRight}>{event.lat}<br></br>{event.lng}</span>:
                            reportID == 2?
                                <span className={classes.valueSpanRight}>{moment(event.endTime).format(' MMM DD, YYYY HH:mm A')}</span>:
                            reportID == 3?
                                <span className={classes.valueSpanRight}>{moment(event.endTime).format(' MMM DD, YYYY HH:mm A')}</span>:
                                <span className={classes.valueSpanRight}>{event.lat}<br></br>{event.lng}</span>
                        }
                    </div>
                    <div className={classes.mainInnerDiv}>
                        {
                            reportID == 1?
                                <span className={classes.titleSpan}>Location</span>:
                            reportID == 2?
                                <span className={classes.titleSpan}>Lat/Long</span>:
                            reportID == 3?
                                <span className={classes.titleSpan}>Lat/Long</span>:
                                <span className={classes.titleSpan}>Location</span>
                        }
                        {
                            reportID == 1?
                                null:
                            reportID == 2?
                                <span className={classes.titleSpan}>Location</span>:
                            reportID == 3?
                                <span className={classes.titleSpan}>Location</span>:
                                null
                        }
                    </div>
                    <div className={classes.mainInnerDiv}>
                        {
                            reportID == 1?
                                <span className={classes.valueSpanLeft}>{address}</span>:
                            reportID == 2?
                                <span className={classes.valueSpanLeft}>{event.lat}<br></br>{event.lng}</span>:
                            reportID == 3?
                                <span className={classes.valueSpanLeft}>{event.lat}<br></br>{event.lng}</span>:
                                <span className={classes.valueSpanLeft}>{address}</span>
                        }
                        {
                            reportID == 1?
                                null:
                            reportID == 2?
                                <div className={classes.addressDiv}>
                                    <span className={classes.addressSpan}>{address}</span>
                                </div>:
                            reportID == 3?
                                <div className={classes.addressDiv}>
                                    <span className={classes.addressSpan}>{address}</span>
                                </div>:null
                        }
                    </div>
                </div>
            </div>
        </MenuItem>
    )
}
export default ReportItem;