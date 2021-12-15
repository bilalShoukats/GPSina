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
import { useStyles } from '../IdlingReports/styles';
import { VscFilePdf } from 'react-icons/vsc';
import Geocode from 'react-geocode';
export default function SimpleListMenu(props) {
    const api = ApiManager.getInstance();
    const [list, setList] = useState(null);
    const classes = useStyles(props);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const [selectedId, setSelectedId] = React.useState(null);
    const [vehicleInfo, setVehicleInfo] = React.useState(null);
    const [regNo, setRegNo] = React.useState('');
    const [selectedIndexx, setSelectedIndexx] = React.useState('');
    const [address, setAddress] = React.useState('');

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
        setRegNo(event.registrationNo);
        setSelectedId(event.deviceID);
        console.log('event', event.deviceID);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const dateFormate = dates => {
        let newDate = new Date(dates);
        // setDate(newDate);
        // console.log('date', newDate);
        return newDate;
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
        // // const latlngStr = input.split(',', 2);
        // console.log('event', event);
        // // console.log('vehicleInfo', vehicleInfo);
        // const latlng = {
        //     lat: lat,
        //     lng: lng,
        // };
        // geocoder
        //     .geocode({ location: latlng })
        //     .then(response => {
        //         if (response.results[0]) {
        //             // map.setZoom(11);
        //             // const marker = new google.maps.Marker({
        //             //   position: latlng,
        //             //   map: map,
        //             // });
        //             console.log(
        //                 'latlong',
        //                 response.results[0].formatted_address,
        //             );
        //             setAddress(response.results[0].formatted_address);
        //             // infowindow.open(map, marker);
        //         } else {
        //             window.alert('No results found');
        //         }
        //     })
        //     .catch(e => window.alert('Geocoder failed due to: ' + e));
        // console.log('latlong', lat, lng);
        // Geocode.fromLatLng(lat, lng).then(
        //     response => {
        //         const address = response.results[0].formatted_address;
        //         console.log(address);
        //     },
        //     error => {
        //         console.error(error);
        //     },
        // );
    };
    return (
        <div className={classes.root}>
            <div className={classes.iconDiv}>
                <VscFilePdf className={classes.topIcon} />
            </div>
            <h3
                style={{
                    color: 'white',
                    textAlign: 'center',
                }}
            >
                Idling Reports
            </h3>
            <div className={classes.outerDiv}>
                <div className={classes.title}>
                    <Typography className={classes.text}>
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
                                // onClick={

                                //     // handleMenuItemClick(event, index)
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
                                            <text>
                                                {
                                                    event.deviceInformation
                                                        .timeStamp
                                                }
                                                {/* {
                                                    new Date(
                                                        event.deviceInformation
                                                            .timeStamp * 1000,
                                                    )
                                                } */}
                                                {/* <Moment> */}
                                                {/* {dateFormate(
                                                    event.deviceInformation
                                                        .timeStamp,
                                                        </Moment>
                                                )} */}
                                            </text>
                                        </div>
                                        <div className={classes.mainInnerDiv}>
                                            <text>Speed</text>
                                            <text>Lat/Long</text>
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
                                                <text
                                                    className={classes.gpsLat}
                                                >
                                                    {
                                                        event.deviceInformation
                                                            .gpsLat
                                                    }
                                                </text>
                                                <text
                                                    className={classes.gpsLat}
                                                >
                                                    {
                                                        event.deviceInformation
                                                            .gpsLng
                                                    }
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
                                        <div className={classes.mainInnerDiv}>
                                            <text>Positioning</text>
                                            <text>
                                                {
                                                    event.deviceInformation
                                                        .positioning
                                                }
                                            </text>
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
