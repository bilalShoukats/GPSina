import { compose } from 'redux';
import messages from './messages';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import 'react-activity/dist/Sentry.css';
import { useStyles } from './styles.js';
import { Sentry } from 'react-activity';
import SCREENS from '../../constants/screen';
import Header from '../../components/Header';
import APIURLS from '../../ApiManager/apiUrl';
import Delete from '@material-ui/icons/Delete';
import React, { useEffect, useState } from 'react';
import UserAvatar from '../../components/UserAvatar';
import ApiManager from '../../ApiManager/ApiManager';
import { Grid, Typography } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { FormattedMessage, injectIntl } from 'react-intl';
import ConfirmDialog from '../../components/confirmAlert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import satellite from '../../../assets/images/icons/satellite.svg';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import {
    SwipeableList,
    SwipeableListItem,
} from '@sandstreamdev/react-swipeable-list';

export function DevicePage(props) {
    const [list, setList] = useState([]);
    const [resMsg, setResMsg] = useState('');
    const [totalPage, setTotalPage] = useState(1);
    const [pageLoad, setPageLoad] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedItem, setSelectedItem] = useState({});
    const [message, setMessage] = useState('');

    const classes = useStyles(props);

    const confirmAgree = () => {
        const api = ApiManager.getInstance();
        setOpenDialog(false);
        api.send('POST', APIURLS.deleteDevice, {
            deviceID: selectedItem.deviceID,
        })
            .then(res => {
                if (res.data.code === 1016) {
                    getAllItems();
                }
            })
            .catch(error => {});
    };
    const confirmDisagree = () => {
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
    const swipeLeftAction = device => {
        setSelectedItem(device);
        setOpenDialog(true);
        setMessage('Are you sure to delete this Device');
    };
    const swipeRightAction = device => {
        setSelectedItem(device);
        if (device.registrationNo && device.deviceAttachStatus === 2) {
            setOpenDialog(true);
            setMessage('Are you sure to un-assign vehicle');
        } else if (device.registrationNo && device.deviceAttachStatus !== 2) {
            setOpenDialog(true);
            setMessage('Are you sure to un-assign vehicle');
        }
    };

    useEffect(() => {
        getAllItems();
    }, [currentPage]);

    return (
        <div>
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
            </div>

            {list && !pageLoad && (
                <div>
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
                                open={openDialog}
                                disagreeText={'Cancel'}
                                agree={confirmAgree}
                                disagree={confirmDisagree}
                                handleClose={confirmDisagree}
                                message={message}
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
        </div>
    );
}
DevicePage.propTypes = {};
const withConnect = connect();

export default compose(withConnect)(injectIntl(DevicePage));
