import React, { useEffect, useState } from 'react';
import { makeStyles, Text } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { AiFillCaretDown } from 'react-icons/ai';
import APIURLS from '../../../ApiManager/apiUrl';
import ApiManager from '../../../ApiManager/ApiManager';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../AlarmReports/styles';
import { VscFilePdf } from 'react-icons/vsc';
import Geocode from 'react-geocode';
import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import Header from '../../../components/Header';
import messages from './messages';
import moment from 'moment';

export function AlarmReports(props) {
    const api = ApiManager.getInstance();
    const [list, setList] = useState(null);
    const classes = useStyles(props);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const [selectedId, setSelectedId] = React.useState(null);
    const [data, setData] = React.useState(null);
    const [vehicleInfo, setVehicleInfo] = React.useState(null);
    const [alarm, setAlarm] = React.useState(null);
    const [regNo, setRegNo] = React.useState('');
    const [selectedIndexx, setSelectedIndexx] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [age, setAge] = React.useState('');
    const getAllItems = () => {
        api.send('post', '/viewVehicles', { page: 1 })
            .then(res => {
                console.log('ALL DEVICES', res);
                if (res.data.code === 1019) {
                    setList(res.data.response);
                }
            })
            .catch(error => {});
    };
    const getSelectedVehicle = () => {
        api.send('GET', '/getAllDeviceAlerts', {
            deviceId: selectedId,
            isRead: 1,
        })
            .then(res => {
                console.log('ALL DEVICES ALERTS', res);
                if (res.data.code === 1019) {
                    setVehicleInfo(res.data.response);
                }
            })
            .catch(error => {});
    };
    console.log('list', list);
    console.log('selectedId', selectedId);
    useEffect(() => {
        getAllItems();
    }, []);
    useEffect(() => {
        if (selectedId !== null) {
            getSelectedVehicle();
        }
    }, [selectedId]);
    const handleClickListItem = event => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setAnchorEl(null);
        setSelectedId(event.deviceID);
        setRegNo(event.registrationNo);
        console.log('event', event.deviceID);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleChange = event => {
        setAge(event.target.value);
    };
    const getLocationAddress = (lat, lng, event, index) => {
        setSelectedIndexx(index);
        Geocode.setApiKey('AIzaSyCvlR6R50PN-7o-7UABXDTrdjIAMudbRfM');
        Geocode.enableDebug();
        Geocode.fromLatLng(lat, lng).then(
            response => {
                let newList = [...vehicleInfo];
                // const prevIndex=vehicleInfo.filter(item=>)
                const address = response.results[0].formatted_address;
                console.log('address', address);
                setAddress(address);
                return address;
            },
            error => {
                console.error(error);
            },
        );
    };

    return (
        <div className={classes.root}>
            <Helmet>
                <title>{props.intl.formatMessage({ ...messages.Alarm })}</title>
            </Helmet>
            <Header title={<FormattedMessage {...messages.Alarm} />} />

            <div className={classes.iconDiv}>
                <VscFilePdf className={classes.topIcon} />
            </div>

            <div className={classes.outerDiv}>
                <div className={classes.title}>
                    <Typography className={classes.text}>
                        {/* {selectedId === null ? 'Select Vehicle' : selectedId} */}
                        {regNo === '' ? 'Select Vehicle' : regNo}
                    </Typography>
                    <AiFillCaretDown
                        onClick={handleClickListItem}
                        style={{ color: 'white' }}
                    />
                </div>
                <div className={classes.title2}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">
                            Alarm Type
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            onChange={handleChange}
                        >
                            <MenuItem value={0}>Engine On</MenuItem>
                            <MenuItem value={1}>Engine off</MenuItem>
                            <MenuItem value={2}>Engine Idle</MenuItem>
                            <MenuItem value={3}>FenceIn</MenuItem>
                            <MenuItem value={4}>FenceOut</MenuItem>
                            <MenuItem value={5}>Vibrate</MenuItem>
                            <MenuItem value={6}>Temprature</MenuItem>
                            <MenuItem value={7}>Fuel</MenuItem>
                            <MenuItem value={8}>SOS</MenuItem>
                            <MenuItem value={9}>Device-Reset Protocol</MenuItem>
                            <MenuItem value={10}>TRIPSTART</MenuItem>
                            <MenuItem value={11}>TRIPSTOP</MenuItem>
                            <MenuItem value={12}>LOWBattery</MenuItem>
                            <MenuItem value={13}>HARSHSwerving</MenuItem>
                            <MenuItem value={14}>HarshBreaking</MenuItem>
                            <MenuItem value={15}>LOWFUELLEVEEL</MenuItem>
                            <MenuItem value={16}>GENERAL</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <Menu
                    id="lock-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    transformOrigin={{ horizontal: 'right' }}
                    getContentAnchorEl={null}
                    PaperProps={{
                        style: {
                            maxHeight: 200,
                            width: 300,
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            zIndex: 100,
                        },
                    }}
                >
                    {list &&
                        list.map((event, index) => (
                            <MenuItem
                                key={index}
                                selected={index === selectedIndex}
                                onClick={() =>
                                    handleMenuItemClick(event, index)
                                }
                            >
                                {event.registrationNo}
                            </MenuItem>
                        ))}
                </Menu>
            </div>
            {true ? (
                <div className={classes.dateDiv}>
                    {console.log('regNo', regNo)}
                    {vehicleInfo &&
                        vehicleInfo.map((event, index) => (
                            <MenuItem
                                key={index}
                                selected={index === selectedIndex}
                            >
                                <div className={classes.maindiv}>
                                    <div className={classes.mainOuterDiv}>
                                        <div className={classes.mainInnerDiv}>
                                            <span>Name</span>
                                            <span>Date</span>
                                        </div>
                                        <div className={classes.mainInnerDiv}>
                                            <span>{regNo}</span>
                                            <span>
                                                {moment(
                                                    event.deviceInformation
                                                        .timeStamp,
                                                ).format(
                                                    ' MMM DD, YYYY HH:mm A',
                                                )}
                                                {/* {
                                                    new Date(
                                                        event.deviceInformation
                                                            .timeStamp * 1000,
                                                    )
                                                } */}
                                                {/* </Moment> */}
                                                {/* {dateFormate(
                                                    event.deviceInformation
                                                        .timeStamp,
                                                )} */}
                                            </span>
                                        </div>
                                        <div className={classes.mainInnerDiv}>
                                            <span>Speed</span>
                                            <span>Lat/Long</span>
                                        </div>
                                        <div className={classes.mainInnerDiv}>
                                            {event.CreatedAt}
                                            <button
                                                onClick={() => {
                                                    getLocationAddress(
                                                        event.deviceInformation
                                                            .gpsLat,
                                                        event.deviceInformation
                                                            .gpsLng,
                                                        event,
                                                        index,
                                                    );
                                                }}
                                            >
                                                <span
                                                    className={classes.gpsLat}
                                                >
                                                    {
                                                        (event.deviceInformation
                                                            .gpsLat,
                                                        event.deviceInformation
                                                            .gpsLng)
                                                    }
                                                </span>
                                                {/* <text
                                                    className={classes.gpsLat}
                                                >
                                                    {
                                                        event.deviceInformation
                                                            .gpsLng
                                                    }
                                                </text> */}
                                            </button>
                                        </div>
                                        <span
                                            style={{
                                                fontSize: 12,
                                            }}
                                        >
                                            {index === selectedIndexx ? (
                                                <span>{address}</span>
                                            ) : null}
                                        </span>
                                        <div className={classes.mainInnerDiv}>
                                            <span>Positioning</span>
                                            <span>
                                                {
                                                    event.deviceInformation
                                                        .positioning
                                                }
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </MenuItem>
                        ))}
                </div>
            ) : null}
        </div>
    );
}

AlarmReports.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(
    null,
    mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(AlarmReports));
