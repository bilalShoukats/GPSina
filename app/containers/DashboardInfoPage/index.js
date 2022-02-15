/**
 *
 * DashboardInfoPage
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
import InfoItem from './InfoItem';
import { dashboardInfoData } from '../../Locals/DashboardInfoSample';

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

export function DashboardInfoPage(props) {
    
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

    const getDashboardInfo = () => {
        setPageLoad(false);
        setList(dashboardInfoData);
        // const api = ApiManager.getInstance();
        // api.send('GET', APIURLS.getDashboardInfoDetail, {})
        //     .then(res => {
        //         console.log('Dashboard Information details', res);
        //         // if (res.data.code === 1019) {
        //         //     setPageLoad(false);
        //         //     setList(res.data.response);
        //         //     setTotalPage(res.data.totalPages);
        //         //     if (!res.data.response) {
        //         //         if (currentPage > 1) {
        //         //             setCurrentPage(currentPage - 1);
        //         //         } else {
        //         //             setResMsg('NO DEVICES');
        //         //         }
        //         //     }
        //         // } else {
        //         //     setPageLoad(false);
        //         // }
        //     })
        //     .catch(error => {
        //         setResMsg('NETWORK ERROR');
        //         setPageLoad(false);
        //     });
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
        getDashboardInfo();
    }, []);

    return (
        <Grid>
            <Grid>
                <Helmet>
                    <title>
                        {props.intl.formatMessage({ ...messages.dashboardInfo })}
                    </title>
                </Helmet>
                <Header
                    title={<FormattedMessage {...messages.dashboardInfo} />}
                />
            </Grid>

            {list && !pageLoad && (
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12} md={6}>
                        <InfoItem
                            classes={classes}
                            index={0}
                            event={list}
                            props={props}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InfoItem
                            classes={classes}
                            index={1}
                            event={list}
                            props={props}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InfoItem
                            classes={classes}
                            index={2}
                            event={list}
                            props={props}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InfoItem
                            classes={classes}
                            index={3}
                            event={list}
                            props={props}
                        />
                    </Grid>
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

DashboardInfoPage.propTypes = {};
const withConnect = connect();

export default compose(withConnect)(injectIntl(DashboardInfoPage));