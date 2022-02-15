import { MenuItem } from "@material-ui/core";
import moment from "moment";
import React from "react";
import Geocode from 'react-geocode';

const ReportItem = ({ selected, event, index, classes }) => {
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
                        <span className={classes.titleSpan}>Duration</span>
                    </div>
                    <div className={classes.mainInnerDiv}>
                        <span className={classes.valueSpan}>{event.registrationNo}</span>
                        <span className={classes.valueSpan}>{moment.utc(moment.duration(moment(event.endTime).diff(moment(event.startTime))).asMilliseconds()).format("HH:mm:ss")}</span>
                    </div>
                    <div className={classes.mainInnerDiv}>
                        <span className={classes.titleSpan}>Start Time:</span>
                        <span className={classes.titleSpan}>End Time:</span>
                    </div>
                    <div className={classes.mainInnerDiv}>
                        <span className={classes.valueSpan}>{moment(
                            event.startTime,
                        ).format(' MMM DD, YYYY HH:mm A')}</span>
                        <span className={classes.valueSpan}>{moment(
                            event.endTime,
                        ).format(' MMM DD, YYYY HH:mm A')}</span>
                    </div>
                    <div className={classes.mainInnerDiv}>
                        <span className={classes.titleSpan}>Lat/Long</span>
                        <span className={classes.titleSpan}>Location</span>
                    </div>
                    <div className={classes.mainInnerDiv}>
                        <span className={classes.valueSpan}>{event.lat}<br></br>{event.lng}</span>
                        <div className={classes.addressDiv}>
                            <span className={classes.addressSpan}>{address}</span>
                        </div>
                    </div>
                </div>
            </div>
        </MenuItem>
    )
}
export default ReportItem;