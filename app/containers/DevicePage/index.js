/**
 *
 * DevicePage
 *
 */

import './styles.css';
import { compose } from 'redux';
import messages from './messages';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import 'react-activity/dist/Sentry.css';
import { useStyles } from './styles.js';
import { Sentry } from 'react-activity';
import SCREENS from '../../constants/screen';
import Header from '../../components/Header';
import 'react-swipeable-list/dist/styles.css';
import APIURLS from '../../ApiManager/apiUrl';
import React, { useEffect, useState } from 'react';
import UserAvatar from '../../components/UserAvatar';
import ApiManager from '../../ApiManager/ApiManager';
import { Grid, Typography } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { FormattedMessage, injectIntl } from 'react-intl';
import ConfirmDialog from '../../components/confirmAlert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import deviceIcon from '../../../assets/images/icons/satellite.svg';
import {
    faEdit,
    faTrashAlt,
    faChevronRight,
    faLink,
    faUnlink,
} from '@fortawesome/free-solid-svg-icons';
import {
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
    Type,
} from 'react-swipeable-list';

export function DevicePage(props) {
    const [list, setList] = useState([]);
    const [resMsg, setResMsg] = useState('');
    const [totalPage, setTotalPage] = useState(1);
    const [pageLoad, setPageLoad] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedItem, setSelectedItem] = useState({});
    const [message, setMessage] = useState('');
    const [deleteItem, setDeleteItem] = useState(false);

    const classes = useStyles(props);

    const confirmAgree = () => {
        const api = ApiManager.getInstance();
        setOpenDialog(false);
        if (deleteItem) {
            setDeleteItem(false);
            const body = {
                deviceID: selectedItem.deviceID,
            };
            console.log('Delete Called');
            api.send('POST', APIURLS.deleteDevice, body)
                .then(res => {
                    console.log('Body : ', body, 'Response Delete Zone :', res);
                    if (res.data.code === 1016) {
                        getAllItems();
                    }
                })
                .catch(error => {});
        }
    };
    const confirmClose = () => {
        setOpenDialog(false);
    };
    const getAllItems = () => {
        setPageLoad(true);
        const api = ApiManager.getInstance();
        api.send('GET', APIURLS.getAllDevices, { page: currentPage })
            .then(res => {
                console.log('ALL DEVICES', res);
                if (res.data.code === 1019) {
                    setPageLoad(false);
                    setList(res.data.response);
                    setTotalPage(res.data.totalPages);
                    if (!res.data.response) {
                        if (currentPage > 1) {
                            setCurrentPage(currentPage - 1);
                        } else {
                            setResMsg('NO DEVICES');
                        }
                    }
                } else {
                    setPageLoad(false);
                }
            })
            .catch(error => {
                setResMsg('NETWORK ERROR');
                setPageLoad(false);
            });
    };
    const goToDeviceDetailScreen = device => {
        props.history.push(SCREENS.DEVICEDETAIL, { device: device });
    };
    const handleAddDevice = () => {
        props.history.push(SCREENS.ADDDEVICE);
    };
    const handlePageClick = (event, value) => {
        setCurrentPage(value);
    };

    const handleDelete = zone => () => {
        setOpenDialog(true);
        setSelectedItem(zone);
        setMessage('Do you want to delete this Device?');
        setDeleteItem(true);
    };

    const trailingActions = device => (
        <TrailingActions>
            <SwipeAction
                className={classes.delete}
                onClick={handleDelete(device)}
            >
                <Grid className={classes.centered}>
                    <FontAwesomeIcon
                        className={classes.icon}
                        icon={faTrashAlt}
                        size="1x"
                        title="DELETE"
                    />
                </Grid>
            </SwipeAction>
            <SwipeAction
                className={classes.assign}
                onClick={() => goToDeviceDetailScreen(device)}
            >
                <Grid className={classes.centered}>
                    <FontAwesomeIcon
                        className={classes.icon}
                        icon={faEdit}
                        size="1x"
                        title="EDIT"
                    />
                </Grid>
            </SwipeAction>
            <SwipeAction
                className={
                    device.deviceAttachStatus === 2
                        ? classes.available
                        : classes.notAvailable
                }
                // onClick={() => goToDeviceDetailScreen(device)}
            >
                <Grid className={classes.centered}>
                    <FontAwesomeIcon
                        className={classes.icon}
                        icon={device.registrationNo ? faUnlink : faLink}
                        size="1x"
                        title={
                            device.deviceAttachStatus !== 2
                                ? 'Not Available'
                                : device.registrationNo
                                ? 'Remove Device'
                                : 'Attach Device'
                        }
                    />
                </Grid>
            </SwipeAction>
        </TrailingActions>
    );

    useEffect(() => {
        getAllItems();
    }, [currentPage]);

    return (
        <Grid>
            <Grid>
                <Helmet>
                    <title>
                        {props.intl.formatMessage({ ...messages.device })}
                    </title>
                </Helmet>
                <Header
                    title={<FormattedMessage {...messages.device} />}
                    showAddBtn
                    onPressAdd={handleAddDevice}
                />
            </Grid>

            {list && !pageLoad && (
                <Grid>
                    {
                        <SwipeableList className={classes.main} type={Type.IOS}>
                            {list.map(device => (
                                <SwipeableListItem
                                    key={device.deviceID}
                                    trailingActions={trailingActions(device)}
                                >
                                    <Grid
                                        container
                                        direction="row"
                                        alignItems="center"
                                        className={classes.container}
                                    >
                                        <Grid
                                            item
                                            xs={2}
                                            md={1}
                                            className={classes.avatar}
                                        >
                                            <Grid
                                                container
                                                direction="row"
                                                justifyContent="center"
                                                alignItems="center"
                                            >
                                                <UserAvatar
                                                    alt="Device Avatar"
                                                    src={deviceIcon}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={10}
                                            md={11}
                                            alignItems="center"
                                            className={classes.content}
                                        >
                                            <Grid
                                                container
                                                direction="row"
                                                justifyContent="space-between"
                                                alignItems="center"
                                            >
                                                <Grid item>
                                                    <Grid
                                                        container
                                                        direction="column"
                                                    >
                                                        <Grid item>
                                                            <Typography
                                                                variant="body1"
                                                                className={
                                                                    classes.title
                                                                }
                                                            >
                                                                {
                                                                    device.deviceID
                                                                }
                                                            </Typography>
                                                        </Grid>

                                                        <Grid item>
                                                            <Typography
                                                                variant="body1"
                                                                className={
                                                                    classes.content
                                                                }
                                                            >
                                                                {
                                                                    device.registrationNo
                                                                }
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>

                                                <Grid item>
                                                    <FontAwesomeIcon
                                                        icon={faChevronRight}
                                                        size="1x"
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <ConfirmDialog
                                        title={'Alert'}
                                        agreeText={'Ok'}
                                        open={openDialog}
                                        disagreeText={'Cancel'}
                                        agree={confirmAgree}
                                        disagree={confirmClose}
                                        handleClose={confirmClose}
                                        message={message}
                                    />
                                </SwipeableListItem>
                            ))}
                        </SwipeableList>
                    }

                    {totalPage > 1 && (
                        <Grid container className={classes.main}>
                            <div className={classes.paginate}>
                                <Pagination
                                    count={totalPage}
                                    color="primary"
                                    page={currentPage}
                                    onChange={handlePageClick}
                                />
                            </div>
                        </Grid>
                    )}
                </Grid>
            )}

            {pageLoad && (
                <Grid
                    container
                    justifyContent="center"
                    className={classes.loading}
                >
                    <Grid item xs={3}>
                        <Grid className={classes.activity}>
                            <Sentry
                                color="#28ACEA"
                                size={200}
                                speed={1}
                                animating={pageLoad}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            )}

            {!list && (
                <Grid
                    container
                    justifyContent="center"
                    className={classes.loading}
                >
                    <Grid item xs={3}>
                        <Grid className={classes.activity}>
                            <h1>{resMsg}</h1>
                        </Grid>
                    </Grid>
                </Grid>
            )}
        </Grid>
    );
}
DevicePage.propTypes = {};
const withConnect = connect();

export default compose(withConnect)(injectIntl(DevicePage));
