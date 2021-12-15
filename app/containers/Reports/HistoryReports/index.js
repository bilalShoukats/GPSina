import React, { useEffect, useState } from 'react';
import { makeStyles, Text } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { AiFillCaretDown } from 'react-icons/ai';
import APIURLS from '../../../ApiManager/apiUrl';
import ApiManager from '../../../ApiManager/ApiManager';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useStyles } from '../HistoryReports/styles';
import { VscFilePdf } from 'react-icons/vsc';
import { BschevronRight } from 'react-icons/bs';
import TextField from '@material-ui/core/TextField';
import Geocode from 'react-geocode';
import moment from 'moment';
export default function SimpleListMenu(props) {
    // console.log('props', props);
    const api = ApiManager.getInstance();
    const [list, setList] = useState(null);
    const classes = useStyles(props);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const [selectedId, setSelectedId] = React.useState(null);
    const [data, setData] = React.useState(null);
    const [vehicleInfo, setVehicleInfo] = React.useState(null);
    const [historyDetail, setHistoryDetail] = React.useState(null);
    const [regNo, setRegNo] = React.useState('');
    const [selectedIndexx, setSelectedIndexx] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [date, setDate] = React.useState('');
    let today = new Date();
    let unixTime = (today / 1000) | 0;
    let reminder = unixTime % (60 * 60 * 24);
    let startTime = unixTime - reminder;
    let endTime = startTime + 60 * 60 * 24;
    const getAllItems = () => {
        api.send('post', '/viewVehicles', { page: 1 })
            .then(res => {
                console.log('ALL DEVICES', res);
                if (res.data.code === 1019) {
                    setList(res.data.response);
                    if (res.data.code === 1019) {
                        setData(res.data.response);
                    }
                }
            })
            .catch(error => {});
    };
    const getSelectedVehicle = () => {
        console.log('selectedId', selectedId);
        api.send('POST', '/vehicleTravelHistoryDetails', {
            deviceid: '' + selectedId,
            starttime: 1635724800,
            enddate: 1635724800,
        })
            .then(res => {
                console.log('Travel History Detail', res);
                if (res.data.code === 1012) {
                    setVehicleInfo(res.data.response);
                    if (res.data.code === 1012) {
                        setHistoryDetail(res.data.response);
                    }
                    let time = res.data.response.map(item => ({
                        time: new Date(item.time),
                    }));
                    setDate(time);
                    console.log('time', time);
                }
            })
            .catch(error => {});
    };
    // const getSelectedVehicle = () => {
    //     console.log('selectedId', selectedId);
    //     api.send('POST', '/vehicleTravelHistoryDates', {
    //         deviceid: '' + selectedId,
    //         page: 1,
    //     })
    //         .then(res => {
    //             console.log('Travel History Dates', res);
    //             if (res.data.code === 1012) {
    //                 setVehicleInfo(res.data.response);
    //                 if (res.data.code === 1012) {
    //                     setHistoryDetail(res.data.response);
    //                 }
    //             }
    //         })
    //         .catch(error => {});
    // };
    useEffect(() => {
        if (selectedId !== null) {
            getSelectedVehicle();
        }
    }, [selectedId]);

    useEffect(() => {
        getAllItems();
    }, []);
    // useEffect(() => {
    //     if (selectedId !== null) {
    //         getSelectedVehicle();
    //     }
    // }, [selectedId]);

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
        alert('yes');
        setAnchorEl(null);
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
            <div className={classes.iconDiv}>
                <VscFilePdf className={classes.topIcon} />
            </div>
            <h3 className={classes.headerText}>History Report</h3>
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
                <Menu
                    id="lock-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
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
            <div className={classes.dateDiv}>
                <Button style={{ backgroundColor: 'grey' }} variant="contained">
                    <TextField
                        id="date"
                        type="date"
                        defaultValue={today}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Button>
            </div>

            {selectedId !== null ? (
                <div>
                    {vehicleInfo &&
                        vehicleInfo.map((event, index) => (
                            <MenuItem
                                key={index}
                                selected={index === selectedIndex}
                                // onClick={() =>
                                //     handleMenuItemClick(event, index)
                                // }
                            >
                                <div className={classes.maindiv}>
                                    <div className={classes.mainOuterDiv}>
                                        <div className={classes.mainInnerDiv}>
                                            <text>Name</text>
                                            <text>Date</text>
                                        </div>
                                        <div className={classes.mainInnerDiv}>
                                            <text>{regNo}</text>
                                            {/* time: new Date(item.time), */}

                                            <text>{event.time}</text>
                                            {/* console.log("time",time) */}
                                        </div>
                                        <div className={classes.mainInnerDiv}>
                                            <text>Speed</text>
                                            <text>Lat/Long</text>
                                        </div>
                                        <div className={classes.mainInnerDiv}>
                                            <text>{event.gpsSpeed}</text>
                                            <button
                                                onClick={() => {
                                                    getLocationAddress(
                                                        event.gpsLat,
                                                        event.gpsLng,
                                                        event,
                                                        index,
                                                    );
                                                }}
                                            >
                                                <text
                                                    className={classes.gpsLat}
                                                >
                                                    {event.gpsLat},
                                                    {event.gpsLng}
                                                </text>
                                            </button>
                                        </div>
                                        <text
                                            style={{
                                                fontSize: 12,
                                            }}
                                        >
                                            {index === selectedIndexx ? (
                                                <span>{address}</span>
                                            ) : null}
                                        </text>
                                        {/* <div className={classes.mainInnerDiv}>
                                            <text>{''}</text>
                                            <button>
                                                <text
                                                    className={classes.gpsLat}
                                                >
                                                    {event.gpsLng}
                                                </text>
                                            </button>
                                        </div> */}
                                        <div className={classes.mainInnerDiv}>
                                            <text>Positioning</text>
                                            <text>{''}</text>
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
