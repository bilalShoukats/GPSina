/**
 *
 * DriverPage
 *
 */

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
import driverIcon from '../../../assets/images/icons/driver.svg';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import {
    SwipeableList,
    SwipeableListItem,
} from '@sandstreamdev/react-swipeable-list';

export function DriverPage(props) {
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
    const goToDriverDetailScreen = driver => {
        props.history.push(SCREENS.DRIVERDETAIL, { driver: driver });
    };

    const handleAddDriver = () => {
        props.history.push(SCREENS.ADDDRIVER);
    };
    const swipeLeftAction = vehicle => {
        setSelectedItem(vehicle);
        setOpenDelete(true);
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

    useEffect(() => {
        getAllItems();
    }, [currentPage]);

    return (
        <div>
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
                <div>
                    {list.map(driver => (
                        <Grid className={classes.main}>
                            <SwipeableList threshold={0.25}>
                                <SwipeableListItem
                                    swipeLeft={{
                                        content: (
                                            <Grid className={classes.delete}>
                                                <Typography>
                                                    <FormattedMessage
                                                        {...messages.deleteDriver}
                                                    />
                                                </Typography>
                                                <Delete />
                                            </Grid>
                                        ),
                                        action: () => swipeLeftAction(driver),
                                    }}
                                    // swipeRight={{
                                    //     // content: (
                                    //     //     <Grid
                                    //     //         className={
                                    //     //             driver.deviceAttachStatus ===
                                    //     //             2
                                    //     //                 ? classes.assign
                                    //     //                 : classes.attach
                                    //     //         }
                                    //     //     >
                                    //     //         {driver.deviceAttachStatus ===
                                    //     //             2 && (
                                    //     //             <Typography>
                                    //     //                 {driver.registrationNo ? (
                                    //     //                     <FormattedMessage
                                    //     //                         {...messages.unassigndriver}
                                    //     //                     />
                                    //     //                 ) : (
                                    //     //                     <FormattedMessage
                                    //     //                         {...messages.assigndriver}
                                    //     //                     />
                                    //     //                 )}
                                    //     //             </Typography>
                                    //     //         )}
                                    //     //         {driver.deviceAttachStatus !==
                                    //     //             2 && (
                                    //     //             <Typography>
                                    //     //                 <FormattedMessage
                                    //     //                     {...messages.unavailabledriver}
                                    //     //                 />
                                    //     //             </Typography>
                                    //     //         )}
                                    //     //     </Grid>
                                    //     // ),
                                    //     action: () => swipeRightAction(driver),
                                    // }}
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
                                                    alt="driver Avatar"
                                                    src={driverIcon}
                                                    onClick={() =>
                                                        goToDriverDetailScreen(
                                                            driver,
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
                                                                    driver.driverName
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
                                                                    driver.driverID
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
                                message={'Are you sure to delete this driver'}
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

DriverPage.propTypes = {};

const withConnect = connect();

export default compose(withConnect)(injectIntl(DriverPage));
