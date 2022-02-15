import { Avatar, Box, Card, CardContent, CardHeader, Divider, IconButton, Typography } from "@material-ui/core";
import DirectionsCarOutlined from '@material-ui/icons/DirectionsCarOutlined';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import SignalCellularAlt from '@material-ui/icons/SignalCellularAlt';
import { BiGitMerge } from "react-icons/bi";
import BarChart from '@material-ui/icons/BarChart';
import React from "react";
import messages from './messages';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';

const InfoItem = ({ selected, event, index, classes, props }) => {

    const [onlineVehicles, setOnlineVehicles] = React.useState(0);
    const [offlineVehicles, setOfflineVehicles] = React.useState(0);
    const [expiredVehicles, setExpiredVehicles] = React.useState(0);
    const [availableDrivers, setAvailableDrivers] = React.useState(0);
    const [unavailableDrivers, setUnavailableDrivers] = React.useState(0);
    const [privatePoi, setPrivatePoi] = React.useState(0);
    const [businessPoi, setBusinessPoi] = React.useState(0);
    const [vehicleCount, setVehicleCount] = React.useState(0);
    const [driverCount, setDriverCount] = React.useState(0);
    const [poiCount, setPoiCount] = React.useState(0);
    const [zoneCount, setZoneCount] = React.useState(0);

    React.useEffect(() => {
        if(event && event.length > 0) {
            setOnlineVehicles(event[0].online);
            setOfflineVehicles(event[0].offline);
            setExpiredVehicles(event[0].expired);
            setAvailableDrivers(event[0].available);
            setUnavailableDrivers(event[0].unavailable);
            setPrivatePoi(event[0].private);
            setBusinessPoi(event[0].business);
            setVehicleCount(event[0].online + event[0].offline + event[0].expired);
            setDriverCount(event[0].available + event[0].unavailable);
            setPoiCount(event[0].private + event[0].business);
            setZoneCount(event[0].zone);
        }
    }, [])

    return (
        <Card sx={{ maxWidth: 345 }} className={classes.boxStyle}>
            <CardHeader
                className={classes.headerStyle}
                avatar={
                    <Avatar className={classes.avatarStyle}>
                        {
                            index == 0 ? <DirectionsCarOutlined />:
                            index == 1 ?  <PermIdentityOutlinedIcon />:
                            index == 2 ?  <BiGitMerge />:
                            <SignalCellularAlt />
                        }
                    </Avatar>
                }
                action={
                    <IconButton disabled className={classes.headerBarIcon}>
                        <BarChart />
                    </IconButton>
                }
                title={index == 0?<FormattedMessage {...messages.vehicles} />:index == 1?<FormattedMessage {...messages.drivers} />:index == 2?<FormattedMessage {...messages.poi} />:<FormattedMessage {...messages.zone} />}
            />
            <Divider className={index == 0?classes.vehicleDividerStyle:index == 1?classes.driverDividerStyle:index == 2?classes.poiDividerStyle:classes.zoneDividerStyle} />
            <div className={index == 3 ? classes.zoneInfoContent:index == 0?classes.infoContent:classes.otherInfoContent}>
                <CardContent className={classes.cardContainer}>
                    <Typography component="div" variant="h5" className={classes.totalStyle}>
                        <span className={classes.countStyle}>{index == 0?vehicleCount:index == 1?driverCount:index == 2?poiCount:zoneCount}</span>
                        <span className={classes.countStyle}>{props.intl.formatMessage({ ...messages.total })}</span>
                    </Typography>
                </CardContent>
                <div xs={12} md={6} sm={6} className={classes.infoDetailContent}>
                    {
                        index == 0 || index == 1 || index == 2 ?
                            <>
                                <div xs={12} md={6} sm={6} className={classes.titleElement}>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        {index == 0 ? props.intl.formatMessage({ ...messages.online }):index == 1? props.intl.formatMessage({ ...messages.available }):props.intl.formatMessage({ ...messages.private })}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        {index == 0 ? onlineVehicles:index == 1?availableDrivers:privatePoi}
                                    </Typography>
                                </div>
                                <div xs={12} md={6} sm={6} className={classes.titleElement}>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        {index == 0 ? props.intl.formatMessage({ ...messages.offline }):index == 1? props.intl.formatMessage({ ...messages.unavailable }):props.intl.formatMessage({ ...messages.business })}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        {index == 0 ? offlineVehicles:index == 1?unavailableDrivers:businessPoi}
                                    </Typography>
                                </div>
                                {
                                    index == 0 ? 
                                        <div xs={12} md={6} sm={6} className={classes.titleElement}>
                                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                                {props.intl.formatMessage({ ...messages.expired })}
                                            </Typography>
                                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                                {expiredVehicles}
                                            </Typography>
                                        </div>:null
                                }
                            </> :null
                    }
                </div>
            </div>
        </Card>
    )
}

const withConnect = connect();

export default compose(withConnect)(injectIntl(InfoItem));