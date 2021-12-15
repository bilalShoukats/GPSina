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
import Button from '@material-ui/core/Button';
import { useStyles } from '../IgnitionReports/styles';
import { VscFilePdf } from 'react-icons/vsc';
import messages from '../../Reports/IgnitionReports/messages';
import { connect } from 'react-redux';
import Header from '../../../components/Header';
import { Grid, Typography } from '@material-ui/core';
import { FormattedMessage, injectIntl } from 'react-intl';
import '../IgnitionReports/styles.css';
import { Helmet } from 'react-helmet';
export default function SimpleListMenu(props) {
    const api = ApiManager.getInstance();
    const [list, setList] = useState(null);
    const classes = useStyles(props);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const [selectedId, setSelectedId] = React.useState(null);
    const [vehicleInfo, setVehicleInfo] = React.useState(null);
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
        console.log('event', event.deviceID);
    };
    const handleClose = () => {
        setAnchorEl(null);
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
                Ignition Reports
            </h3>
            <div className={classes.outerDiv}>
                <div className={classes.title}>
                    <Typography className={classes.text}>
                        {selectedId === null ? 'Select Vehicle' : selectedId}
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
                                {event.deviceID}
                            </MenuItem>
                        ))}
                </Menu>
            </div>
            {selectedId !== null ? (
                <div className={classes.dateDiv}>
                    <Button
                        style={{ backgroundColor: 'grey' }}
                        variant="contained"
                    >
                        <text>Nov 22, 2021</text>
                    </Button>
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
            ) : null}
        </div>
    );
}
