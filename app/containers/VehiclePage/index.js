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
import APIURLS from '../../ApiManager/apiUrl';
import 'react-swipeable-list/dist/styles.css';
import React, { useEffect, useState } from 'react';
import UserAvatar from '../../components/UserAvatar';
import ApiManager from '../../ApiManager/ApiManager';
import { Grid, Typography } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { FormattedMessage, injectIntl } from 'react-intl';
import ConfirmDialog from '../../components/confirmAlert';
import ConfirmMessage from '../../components/ConfirmDialouge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import vehicleIcon from '../../../assets/images/icons/vehicle.svg';
import {
    faChevronRight,
    faEdit,
    faTrashAlt,
    faUserSlash,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import {
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
    Type,
} from 'react-swipeable-list';

export function VehiclePage(props) {
    const [list, setList] = useState([]);
    const [resMsg, setResMsg] = useState('');
    const [message, setMessage] = useState('');
    const [assign, setAssign] = useState(false);
    const [totalPage, setTotalPage] = useState(1);
    const [pageLoad, setPageLoad] = useState(true);
    const [unAssign, setUnAssign] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedItem, setSelectedItem] = useState({});
    const [deleteItem, setDeleteItem] = useState(false);
    const [openResponse, setOpenResponse] = useState(false);

    const classes = useStyles(props);

    const confirmAgree = () => {
        const api = ApiManager.getInstance();
        setOpenDialog(false);
        if (deleteItem) {
            setDeleteItem(false);
            const body = {
                registrationNo: selectedItem.registrationNo,
            };
            console.log('Delete Called');
            api.send('POST', APIURLS.deleteVehicles, body)
                .then(res => {
                    setOpenResponse(true);
                    console.log(
                        'Body : ',
                        body,
                        'Response Delete Vehicle :',
                        res,
                    );
                    if (res.data.code === 1016) {
                        getAllItems();
                        setResMsg('Vehicle Deleted Successfully');
                    } else {
                        setResMsg(res.data.id);
                    }
                })
                .catch(error => {
                    setOpenResponse(true);
                    setResMsg(error.message);
                });
        } else if (assign) {
            setAssign(false);
            const body = {};
            console.log('Assigned Called');
            //Call Assign Api
            props.history.push(SCREENS.DRIVER, { vehicle: selectedItem });
        } else if (unAssign) {
            setUnAssign(false);
            const body = {};
            console.log('UnAssigned Called');
            //Call UnAssign Api
        }
    };
    const confirmClose = () => {
        setOpenDialog(false);
        setOpenResponse(false);
    };
    const getAllItems = () => {
        setPageLoad(true);
        const api = ApiManager.getInstance();
        api.send('GET', APIURLS.getAllVehicle, { page: currentPage })
            .then(res => {
                console.log('Vehcicle Response : ', res);
                if (res.data.code === 1019) {
                    setPageLoad(false);
                    setList(res.data.response);
                    setTotalPage(res.data.totalPages);
                    if (!res.data.response) {
                        if (currentPage > 1) {
                            setCurrentPage(currentPage - 1);
                        } else {
                            setResMsg('NO VEHICLE');
                        }
                    }
                } else {
                    setPageLoad(false);
                    setResMsg(res.data.id);
                    setOpenResponse(true);
                }
            })
            .catch(error => {
                setPageLoad(false);
                setResMsg(error.message);
                console.log(error.message);
                setOpenResponse(true);
            });
    };
    const goToVehicleDetailScreen = vehicle => {
        props.history.push(SCREENS.VEHICLEDETAIL, { vehicle: vehicle });
    };
    const handleAddVehicle = () => {
        props.history.push(SCREENS.ADDVEHICLE);
    };
    const handlePageClick = (event, value) => {
        setCurrentPage(value);
    };

    const handleDelete = vehicle => () => {
        console.log('[Handle DELETE]', vehicle);
        setOpenDialog(true);
        setSelectedItem(vehicle);
        setMessage('Do you want to delete this vehicle');
        setDeleteItem(true);
    };

    const handleAssign = vehicle => () => {
        console.log('[Handle ASSIGN]', vehicle);
        setSelectedItem(vehicle);
        setOpenDialog(true);
        if (vehicle.driverID) {
            setMessage('Do you want to unAssigned the driver');
            setUnAssign(true);
        } else {
            setMessage('Do you want to Assigned the driver');
            setAssign(true);
        }
    };

    const trailingActions = vehicle => (
        <TrailingActions>
            <SwipeAction
                onClick={handleAssign(vehicle)}
                className={classes.available}
            >
                {vehicle.driverID ? (
                    <Grid className={classes.centered}>
                        <FontAwesomeIcon
                            className={classes.icon}
                            icon={faUserSlash}
                            size="1x"
                            title="Remove Driver"
                        />
                    </Grid>
                ) : (
                    <Grid className={classes.centered}>
                        <FontAwesomeIcon
                            className={classes.icon}
                            icon={faUser}
                            size="1x"
                            title="Assign Driver"
                        />
                    </Grid>
                )}
            </SwipeAction>
            <SwipeAction
                onClick={() => goToVehicleDetailScreen(vehicle)}
                className={classes.assign}
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
                onClick={handleDelete(vehicle)}
                className={classes.delete}
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
                        {props.intl.formatMessage({ ...messages.vehicle })}
                    </title>
                </Helmet>
                <Header
                    title={<FormattedMessage {...messages.vehicle} />}
                    showAddBtn
                    onPressAdd={handleAddVehicle}
                />
            </Grid>
            {list && !pageLoad && (
                <Grid>
                    {
                        <SwipeableList className={classes.main} type={Type.IOS}>
                            {list.map(vehicle => (
                                <SwipeableListItem
                                    key={vehicle.vehicleID}
                                    trailingActions={trailingActions(vehicle)}
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
                                                    alt="Vehicle Avatar"
                                                    src={vehicleIcon}
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
                                                                    vehicle.vehicleID
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
                                                                    vehicle.registrationNo
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
            <ConfirmMessage
                open={openResponse}
                title={'Response Message'}
                msg={resMsg}
                handleClose={confirmClose}
            />

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

VehiclePage.propTypes = {};
const withConnect = connect();

export default compose(withConnect)(injectIntl(VehiclePage));
