/**
 *
 * DriverPage
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
import ConfirmMessage from '../../components/ConfirmDialouge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import driverIcon from '../../../assets/images/icons/driver.svg';
import {
    faEdit,
    faTrashAlt,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import {
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
    Type,
} from 'react-swipeable-list';

export function DriverPage(props) {
    const [list, setList] = useState([]);
    const [resMsg, setResMsg] = useState('');
    const [totalPage, setTotalPage] = useState(1);
    const [pageLoad, setPageLoad] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedItem, setSelectedItem] = useState({});
    const [openDialog, setOpenDialog] = useState(false);
    const [openResponse, setOpenResponse] = useState(false);
    const [message, setMessage] = useState('');
    const [deleteItem, setDeleteItem] = useState(false);
    const [vehicle, setVehicle] = useState('');

    const classes = useStyles(props);

    const confirmAgree = () => {
        const api = ApiManager.getInstance();
        setOpenDialog(false);
        if (deleteItem) {
            setDeleteItem(false);
            const body = {
                driverEmail: selectedItem.driverEmail,
            };
            console.log('Delete Called');
            api.send('POST', APIURLS.deleteDriver, body)
                .then(res => {
                    console.log('Body : ', body, 'Response Delete :', res);
                    setOpenResponse(true);
                    if (res.data.code === 1016) {
                        getAllItems();
                        setResMsg('Deleted Successfully');
                    } else {
                        setResMsg(res.data.id);
                    }
                })
                .catch(error => {});
        }
    };
    const confirmClose = () => {
        setOpenDialog(false);
        setOpenResponse(false);
    };

    const goToDriverDetailScreen = driver => {
        props.history.push(SCREENS.DRIVERDETAIL, { driver: driver });
    };

    const handleAddDriver = () => {
        props.history.push(SCREENS.ADDDRIVER);
    };

    const selectDriverForVehicle = driver => {
        console.log('Vehicle From Prop : ', vehicle);
        if (vehicle.registrationNo) {
            const body = {
                registrationNo: vehicle.registrationNo,
                driverID: driver.driverID,
            };
            const api = ApiManager.getInstance();
            api.send('POST', APIURLS.assignVehicle, body)
                .then(res => {
                    setOpenResponse(true);
                    console.log(
                        'Submitted body for assign : ',
                        body,
                        'Response: ',
                        res,
                    );
                    setResMsg(res.data.id);
                })
                .catch(error => {
                    console.log('Error', error);
                });
        }
    };

    const getAllItems = () => {
        setPageLoad(true);
        const api = ApiManager.getInstance();
        api.send('GET', APIURLS.getAlldrivers, { page: currentPage })
            .then(res => {
                console.log('Response Drivers : ', res);
                if (res.data.code === 1019) {
                    setPageLoad(false);
                    setList(res.data.response);
                    setTotalPage(res.data.totalPages);
                    if (!res.data.response) {
                        if (currentPage > 1) {
                            setCurrentPage(currentPage - 1);
                        } else {
                            setResMsg('NO DRIVERS');
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

    const handleDelete = zone => () => {
        setOpenDialog(true);
        setSelectedItem(zone);
        setMessage('Do you want to delete this Driver?');
        setDeleteItem(true);
    };

    const trailingActions = driver => (
        <TrailingActions>
            <SwipeAction
                className={classes.delete}
                onClick={handleDelete(driver)}
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
                onClick={() => goToDriverDetailScreen(driver)}
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
        </TrailingActions>
    );

    useEffect(() => {
        getAllItems();
    }, [currentPage]);

    useEffect(() => {
        console.log('Detail useEffect Vehicle : ', props.location.state);
        if (props.location.state) {
            setVehicle(props.location.state.vehicle);
        }
        console.log('prop Vehicle : ', vehicle);
    }, []);

    return (
        <Grid>
            <Helmet>
                <title>
                    {props.intl.formatMessage({ ...messages.driver })}
                </title>
            </Helmet>
            <Header
                title={<FormattedMessage {...messages.driver} />}
                showAddBtn
                onPressAdd={handleAddDriver}
            />

            {list && !pageLoad && (
                <Grid>
                    {
                        <SwipeableList className={classes.main} type={Type.IOS}>
                            {list.map(driver => (
                                <SwipeableListItem
                                    key={driver.driverID}
                                    trailingActions={trailingActions(driver)}
                                    blockSwipe={vehicle}
                                >
                                    <Grid
                                        container
                                        direction="row"
                                        alignItems="center"
                                        className={classes.container}
                                        onClick={() => {
                                            selectDriverForVehicle(driver);
                                        }}
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
                                                    alt="driver Avatar"
                                                    src={driverIcon}
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
                                                                    driver.driverName
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
                                                                    driver.driverID
                                                                }
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>

                                                {!vehicle.registrationNo && (
                                                    <Grid item>
                                                        <FontAwesomeIcon
                                                            icon={
                                                                faChevronRight
                                                            }
                                                            size="1x"
                                                        />
                                                    </Grid>
                                                )}
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
                                    <ConfirmMessage
                                        open={openResponse}
                                        title={'Response Message'}
                                        msg={resMsg}
                                        handleClose={confirmClose}
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

DriverPage.propTypes = {};

const withConnect = connect();

export default compose(withConnect)(injectIntl(DriverPage));
