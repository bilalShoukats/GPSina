// import React, { useEffect, useState } from 'react';
// import { makeStyles, Text } from '@material-ui/core/styles';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import MenuItem from '@material-ui/core/MenuItem';
// import Menu from '@material-ui/core/Menu';
// import { AiFillCaretDown } from 'react-icons/ai';
// import APIURLS from '../../../ApiManager/apiUrl';
// import ApiManager from '../../../ApiManager/ApiManager';
// import Button from '@material-ui/core/Button';
// import { useStyles } from '../IgnitionReports/styles';
// import { VscFilePdf } from 'react-icons/vsc';
// import messages from '../../Reports/IgnitionReports/messages';
// import { connect } from 'react-redux';
// import Header from '../../../components/Header';
// import { Grid, Typography } from '@material-ui/core';
// import { FormattedMessage, injectIntl } from 'react-intl';
// import '../IgnitionReports/styles.css';
// import { Helmet } from 'react-helmet';
// export default function SimpleListMenu(props) {
//     const api = ApiManager.getInstance();
//     const [list, setList] = useState(null);
//     const classes = useStyles(props);
//     const [anchorEl, setAnchorEl] = React.useState(null);
//     const [selectedIndex, setSelectedIndex] = React.useState(1);
//     const [selectedId, setSelectedId] = React.useState(null);
//     const [vehicleInfo, setVehicleInfo] = React.useState(null);
//     const getAllItems = () => {
//         api.send('post', '/viewVehicles', { page: 1 })
//             .then(res => {
//                 console.log('ALL DEVICES', res);
//                 if (res.data.code === 1019) {
//                     setList(res.data.response);
//                 }
//             })
//             .catch(error => {});
//     };

//     const getSelectedVehicle = () => {
//         api.send('GET', '/getAllDeviceAlerts', {
//             deviceId: selectedId,
//         })
//             .then(res => {
//                 console.log('ALL DEVICES ALERTS', res);
//                 if (res.data.code === 1019) {
//                     setVehicleInfo(res.data.response);
//                 }
//             })
//             .catch(error => {});
//     };

//     console.log('list', list);
//     console.log('selectedId', selectedId);

//     useEffect(() => {
//         getAllItems();
//     }, []);
//     useEffect(() => {
//         if (selectedId !== null) {
//             getSelectedVehicle();
//         }
//     }, [selectedId]);
//     const handleClickListItem = event => {
//         setAnchorEl(event.currentTarget);
//     };
//     const handleMenuItemClick = (event, index) => {
//         setSelectedIndex(index);
//         setAnchorEl(null);
//         setSelectedId(event.deviceID);
//         console.log('event', event.deviceID);
//     };
//     const handleClose = () => {
//         setAnchorEl(null);
//     };
//     return (
//         <div className={classes.root}>
//             <div className={classes.iconDiv}>
//                 <VscFilePdf className={classes.topIcon} />
//             </div>
//             <h3
//                 style={{
//                     color: 'white',
//                     textAlign: 'center',
//                 }}
//             >
//                 Ignition Reports
//             </h3>
//             <div className={classes.outerDiv}>
//                 <div className={classes.title}>
//                     <Typography className={classes.text}>
//                         {selectedId === null ? 'Select Vehicle' : selectedId}
//                     </Typography>
//                     <AiFillCaretDown
//                         onClick={handleClickListItem}
//                         style={{ color: 'white' }}
//                     />
//                 </div>
//                 <Menu
//                     id="lock-menu"
//                     anchorEl={anchorEl}
//                     keepMounted
//                     open={Boolean(anchorEl)}
//                     onClose={handleClose}
//                     anchorOrigin={{
//                         vertical: 'bottom',
//                         horizontal: 'right',
//                     }}
//                     transformOrigin={{ horizontal: 'right' }}
//                     getContentAnchorEl={null}
//                     PaperProps={{
//                         style: {
//                             maxHeight: 200,
//                             width: 300,
//                             position: 'absolute',
//                             top: 0,
//                             right: 0,
//                             zIndex: 100,
//                         },
//                     }}
//                 >
//                     {list &&
//                         list.map((event, index) => (
//                             <MenuItem
//                                 key={index}
//                                 selected={index === selectedIndex}
//                                 onClick={() =>
//                                     handleMenuItemClick(event, index)
//                                 }
//                             >
//                                 {event.deviceID}
//                             </MenuItem>
//                         ))}
//                 </Menu>
//             </div>
//             {selectedId !== null ? (
//                 <div className={classes.dateDiv}>
//                     <Button
//                         style={{ backgroundColor: 'grey' }}
//                         variant="contained"
//                     >
//                         <text>Nov 22, 2021</text>
//                     </Button>
//                     <div className={classes.maindiv}>
//                         <div>
//                             <text className={classes.nameText}>Name</text>
//                             <text className={classes.nameDate}>Date</text>
//                         </div>
//                         <div>
//                             <text className={classes.nameText1}>PNF 2963</text>
//                             <text className={classes.nameDate1}>
//                                 Nov 22, 2021
//                             </text>
//                         </div>
//                         <div>
//                             <text className={classes.nameText}>Speed</text>
//                             <text className={classes.nameDate}>Lat/long</text>
//                         </div>
//                         <div>
//                             <text className={classes.nameText1}>2.7 kmp/h</text>
//                             <text className={classes.nameDate1}>
//                                 5.24841167
//                             </text>
//                         </div>
//                         <div>
//                             <text className={classes.nameText}>
//                                 Positioning
//                             </text>
//                             <text className={classes.nameDate}>
//                                 {' '}
//                                 5.24841167
//                             </text>
//                         </div>
//                     </div>
//                 </div>
//             ) : null}
//         </div>
//     );
// }

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
import moment from 'moment';
import Geocode from 'react-geocode';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import Header from '../../../components/Header';
import messages from './messages';
export function IgnitionReports(props) {
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
            <Helmet>
                <title>
                    {props.intl.formatMessage({ ...messages.Ignition })}
                </title>
            </Helmet>
            <Header title={<FormattedMessage {...messages.Ignition} />} />
            <div className={classes.iconDiv}>
                <VscFilePdf className={classes.topIcon} />
            </div>

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
                                            <span>Name</span>
                                            <span>Date</span>
                                        </div>
                                        <div className={classes.mainInnerDiv}>
                                            <span>{regNo}</span>
                                            {moment(
                                                event.deviceInformation
                                                    .timeStamp,
                                            ).format(' MMM DD, YYYY HH:mm A')}
                                            {/* <text>
                                                {
                                                    event.deviceInformation
                                                        .timeStamp
                                                } */}
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
                                            {/* </text> */}
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
                                                        event.deviceInformation
                                                            .gpsLat
                                                    }
                                                </span>
                                                <span
                                                    className={classes.gpsLat}
                                                >
                                                    {
                                                        event.deviceInformation
                                                            .gpsLng
                                                    }
                                                </span>
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
IgnitionReports.propTypes = {
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

export default compose(withConnect)(injectIntl(IgnitionReports));
