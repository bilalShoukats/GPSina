import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import { Sentry } from 'react-activity';
import 'react-activity/dist/Sentry.css';
import messages from './messages';
import Header from '../../components/Header';
import { useStyles } from './styles.js';
import ApiManager from '../../ApiManager/ApiManager';
import { useHistory } from 'react-router-dom';
import { Badge, Grid, Typography } from '@material-ui/core';
import UserAvatar from '../../components/UserAvatar';
import satellite from '../../../assets/images/icons/satellite.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import SCREENS from '../../constants/screen';
import moment from 'moment';
import Pagination from '@material-ui/lab/Pagination';
import APIURLS from '../../ApiManager/apiUrl';
import ConfirmDialog from '../../components/confirmAlert';
import {
    SwipeableList,
    SwipeableListItem,
} from '@sandstreamdev/react-swipeable-list';
import Delete from '@material-ui/icons/Delete';

export function DevicePage(props) {
    const classes = useStyles(props);
    const history = useHistory();
    const [list, setList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [pageLoad, setPageLoad] = useState(true);
    const [openDelete, setOpenDelete] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState({});

    const goToDeviceDetailScreen = device => {
        console.log('Device Detail: ', device);
        props.history.push(SCREENS.DEVICEDETAIL, { device: device });
    };

    const handleAddDevice = () => {
        props.history.push(SCREENS.ADDDEVICE);
    };

    const handlePageClick = (event, value) => {
        setCurrentPage(value);
    };
    const confirmDeleteAgree = () => {
        console.log('Call delete Api');
        const api = ApiManager.getInstance();
        setOpenDelete(false);
        api.send('POST', APIURLS.deleteDevice, {
            deviceID: selectedDevice.deviceID,
        })
            .then(res => {
                console.log('ResponseDelete', res);
                if (res.data.code === 1016) {
                    getAllDevices();
                    // setCurrentPage(1);
                }
            })
            .catch(error => {
                console.log('Error', error);
            });
    };
    const confirmDeleteDialogClose = () => {
        setOpenDelete(false);
    };

    const swipeLeftAction = device => {
        setSelectedDevice(device);
        setOpenDelete(true);
    };

    const swipeRightAction = device => {
        setSelectedDevice(device);
    };

    const getAllDevices = () => {
        list.length = 0;
        setPageLoad(true);
        const api = ApiManager.getInstance();
        api.send('GET', APIURLS.getAllDevices, { page: currentPage })
            .then(res => {
                console.log(res);
                if (res.data.code === 1019) {
                    setList(res.data.response);
                    setTotalPage(res.data.totalPages);
                } else {
                    setPageLoad(false);
                }
            })
            .catch(error => {
                setPageLoad(false);
            });
    };
    useEffect(() => {
        getAllDevices();
        console.log('Devices ', list);
    }, [currentPage]);

    return (
        <div>
            {list.length >= 0 && (
                <div>
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
                    {list.map(device => (
                        <Grid className={classes.main}>
                            <SwipeableList threshold={0.25}>
                                <SwipeableListItem
                                    swipeLeft={{
                                        content: (
                                            <Grid className={classes.delete}>
                                                <Typography>
                                                    <FormattedMessage
                                                        {...messages.deleteVehicle}
                                                    />
                                                </Typography>
                                                <Delete />
                                            </Grid>
                                        ),
                                        action: () => swipeLeftAction(device),
                                    }}
                                    swipeRight={{
                                        content: (
                                            <Grid
                                                className={
                                                    device.deviceAttachStatus ===
                                                    2
                                                        ? classes.assign
                                                        : classes.attach
                                                }
                                            >
                                                {device.deviceAttachStatus ===
                                                    2 && (
                                                    <Typography>
                                                        {device.registrationNo ? (
                                                            <FormattedMessage
                                                                {...messages.unassignVehicle}
                                                            />
                                                        ) : (
                                                            <FormattedMessage
                                                                {...messages.assignVehicle}
                                                            />
                                                        )}
                                                    </Typography>
                                                )}
                                                {device.deviceAttachStatus !==
                                                    2 && (
                                                    <Typography>
                                                        <FormattedMessage
                                                            {...messages.unavailableVehicle}
                                                        />
                                                    </Typography>
                                                )}
                                            </Grid>
                                        ),
                                        action: () => swipeRightAction(device),
                                    }}
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
                                                    src={satellite}
                                                    onClick={() =>
                                                        goToDeviceDetailScreen(
                                                            device,
                                                        )
                                                    }
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
                                                                    classes.description
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
                                </SwipeableListItem>
                            </SwipeableList>
                            <ConfirmDialog
                                title={'Alert'}
                                agreeText={'Ok'}
                                open={openDelete}
                                disagreeText={'Cancel'}
                                agree={confirmDeleteAgree}
                                disagree={confirmDeleteDialogClose}
                                handleClose={confirmDeleteDialogClose}
                                message={'Are you sure to delete this Device'}
                            />
                        </Grid>
                    ))}
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
                </div>
            )}
            {list < 1 && (
                <Grid
                    container
                    justifyContent="center"
                    className={classes.loading}
                >
                    <Grid item xs={3}>
                        <h1>{pageLoad ? '' : 'Network Error'}</h1>
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
        </div>
    );
}
DevicePage.propTypes = {};
const withConnect = connect();

export default compose(withConnect)(injectIntl(DevicePage));
