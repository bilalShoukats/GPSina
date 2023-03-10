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
// import { useStyles } from './styles.js';
import messages from './messages';
import { idlingData, idlingVehicles } from '../../../Locals/ReportSample';
import IdlingItem from './IdlingItem';

export function IdlingReports(props) {

    const api = ApiManager.getInstance();
    const [list, setList] = useState(null);
    const classes = useStyles(props);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const [selectedId, setSelectedId] = React.useState(null);
    const [vehicleInfo, setVehicleInfo] = React.useState(null);
    const [regNo, setRegNo] = React.useState('');
    const [selectedIndexx, setSelectedIndexx] = React.useState('');
    const [address, setAddress] = React.useState([]);

    Geocode.setApiKey('AIzaSyCvlR6R50PN-7o-7UABXDTrdjIAMudbRfM');
    Geocode.enableDebug();

    console.log("IDLING REPORT DATA: ", idlingData);

    const getAllItems = () => {
        // api.send('post', '/viewVehicles', { page: 1 })
        //     .then(res => {
        //         console.log('ALL DEVICES', res);
        //         if (res.data.code === 1019) {
        //             setList(res.data.response);
        //         }
        //     })
        //     .catch(error => {});
        
        //setting it from Sample
        setList(idlingVehicles);
    };

    const getSelectedVehicle = () => {
        // api.send('GET', '/getAllDeviceAlerts', {
        //     deviceId: selectedId,
        //     isRead: 1,
        // })
        //     .then(res => {
        //         console.log('ALL DEVICES ALERTS', res);
        //         if (res.data.code === 1019) {
        //             setVehicleInfo(res.data.response);
        //         }
        //     })
        //     .catch(error => {});

        //setting it from Sample
        setAddress([]);
        setVehicleInfo(idlingData);
        getLocationAddress(idlingData);
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

    const getLocationAddress = (idlingArray) => {
        idlingArray.map((key, value) =>  {
            Geocode.fromLatLng(key.lat, key.lng).then(
                response => {
                    console.log("what address array: ", address);
                    var tempAddress = [...address];
                    console.log("what is tempadd: ",  tempAddress);
                    tempAddress.push(response.results[0].formatted_address);
                    console.log("what is tempadd:1: ",  tempAddress);
                    setAddress(tempAddress);
                },
                error => {
                    console.error(error);
                },
            );
        })
    };

    return (
        <div className={classes.root}>
            <Helmet>
                <title>
                    {props.intl.formatMessage({ ...messages.Idling })}
                </title>
            </Helmet>
            <Header title={<FormattedMessage {...messages.Idling} />} />

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
                            <IdlingItem
                                classes={classes}
                                selected={index === selectedIndex}
                                index={index}
                                event={event} 
                            />
                        ))}
                </div>
            ) : null}
        </div>
    );
}

IdlingReports.propTypes = {
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

export default compose(withConnect)(injectIntl(IdlingReports));
