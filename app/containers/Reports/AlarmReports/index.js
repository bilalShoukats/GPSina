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

export default function SimpleListMenu(props) {
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
    const handleClickListItem2 = (event, index, click) => {
        // setRegNo(click.registrationNo);
        // setSelectedIndex(index);
        // setSelectedId(event.deviceID);
        // console.log('event', event.deviceID);
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
            <div className={classes.iconDiv}>
                <VscFilePdf className={classes.topIcon} />
            </div>
            <h3
                style={{
                    color: 'white',
                    textAlign: 'center',
                }}
            >
                Alarm Reports
            </h3>
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
                    {/* <Typography className={classes.text2}>
                        {'Alarm Type'}
                    </Typography> */}
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
                    {/* <AiFillCaretDown
                        onClick={handleClickListItem2}
                        style={{ color: 'white' }}
                    /> */}
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
            {/* {selectedId !== null ? (
                <div className={classes.dateDiv}>
                    <div className={classes.maindiv}>
                        <div>
                            <text className={classes.nameText}>Name</text>
                            <text className={classes.nameDate}>Date</text>
                        </div>
                        <div>
                            <text className={classes.nameText1}>PNF 2963</text>
                            <text className={classes.nameDate1}>
                                Nov 22, 2021
                            </text>
                        </div>
                        <div>
                            <text className={classes.nameText}>Speed</text>
                            <text className={classes.nameDate}>Lat/long</text>
                        </div>
                        <div>
                            <text className={classes.nameText1}>2.7 kmp/h</text>
                            <text className={classes.nameDate1}>
                                5.24841167
                            </text>
                        </div>
                        <div>
                            <text className={classes.nameText}>
                                Positioning
                            </text>
                            <text className={classes.nameDate}>
                                {' '}
                                5.24841167
                            </text>
                        </div>
                    </div>
                </div>
            ) : null} */}
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
                                                {/* </Moment> */}
                                                {/* {dateFormate(
                                                    event.deviceInformation
                                                        .timeStamp,
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
                                                        (event.deviceInformation
                                                            .gpsLat,
                                                        event.deviceInformation
                                                            .gpsLng)
                                                    }
                                                </text>
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
