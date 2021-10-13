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
import vehicleIcon from '../../../assets/images/icons/vehicle.svg';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import {
    SwipeableList,
    SwipeableListItem,
} from '@sandstreamdev/react-swipeable-list';

export function VehiclePage(props) {
    const [list, setList] = useState([]);
    const [resMsg, setResMsg] = useState('');
    const [totalPage, setTotalPage] = useState(1);
    const [pageLoad, setPageLoad] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [openDelete, setOpenDelete] = useState(false);
    const [selectedItem, setSelectedItem] = useState({});

    const classes = useStyles(props);

    const confirmDeleteAgree = () => {
        const api = ApiManager.getInstance();
        setOpenDelete(false);
        const body = {
            registrationNo: selectedItem.registrationNo,
        };
        api.send('POST', APIURLS.deleteVehicles, body)
            .then(res => {
                console.log('Body : ', body, 'Response Delete Vehicle :', res);
                // if (res.data.code === 1016) {
                //     getAllItems();
                // }
            })
            .catch(error => {});
    };
    const confirmDeleteDialogClose = () => {
        setOpenDelete(false);
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
                }
            })
            .catch(error => {
                setResMsg('NETWORK ERROR');
                setPageLoad(false);
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
    const swipeLeftAction = vehicle => {
        setSelectedItem(vehicle);
        setOpenDelete(true);
    };
    const swipeRightAction = vehicle => {
        setSelectedItem(vehicle);
    };

    useEffect(() => {
        getAllItems();
    }, [currentPage]);
    return (
        <div>
            <div>
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
            </div>
            {list && !pageLoad && (
                <div>
                    {list.map(vehicle => (
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
                                        action: () => swipeLeftAction(vehicle),
                                    }}
                                    swipeRight={{
                                        // content: (
                                        //     <Grid
                                        //         className={
                                        //             vehicle.deviceAttachStatus ===
                                        //             2
                                        //                 ? classes.assign
                                        //                 : classes.attach
                                        //         }
                                        //     >
                                        //         {vehicle.deviceAttachStatus ===
                                        //             2 && (
                                        //             <Typography>
                                        //                 {vehicle.registrationNo ? (
                                        //                     <FormattedMessage
                                        //                         {...messages.unassignVehicle}
                                        //                     />
                                        //                 ) : (
                                        //                     <FormattedMessage
                                        //                         {...messages.assignVehicle}
                                        //                     />
                                        //                 )}
                                        //             </Typography>
                                        //         )}
                                        //         {vehicle.deviceAttachStatus !==
                                        //             2 && (
                                        //             <Typography>
                                        //                 <FormattedMessage
                                        //                     {...messages.unavailableVehicle}
                                        //                 />
                                        //             </Typography>
                                        //         )}
                                        //     </Grid>
                                        // ),
                                        action: () => swipeRightAction(vehicle),
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
                                                    alt="Vehicle Avatar"
                                                    src={vehicleIcon}
                                                    onClick={() =>
                                                        goToVehicleDetailScreen(
                                                            vehicle,
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
                                message={'Are you sure to delete this Vehicle'}
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

VehiclePage.propTypes = {};
const withConnect = connect();

export default compose(withConnect)(injectIntl(VehiclePage));
