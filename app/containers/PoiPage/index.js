/**
 *
 * PoiPage
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
import { POICOLORS, MARKER, TYPE } from '../../constants/poi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEdit,
    faTrashAlt,
    faChevronRight,
    faBan,
    faGlobeAmericas,
} from '@fortawesome/free-solid-svg-icons';
import {
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
    Type,
} from 'react-swipeable-list';

export function PoiPage(props) {
    const classes = useStyles(props);
    const [list, setList] = useState([]);
    const [resMsg, setResMsg] = useState('');
    const [totalPage, setTotalPage] = useState(1);
    const [pageLoad, setPageLoad] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedItem, setSelectedItem] = useState({});
    const [message, setMessage] = useState('');
    const [deleteItem, setDeleteItem] = useState(false);
    const [assign, setAssign] = useState(false);
    const [unAssign, setUnAssign] = useState(false);

    const confirmAgree = () => {
        const api = ApiManager.getInstance();
        setOpenDialog(false);
        if (deleteItem) {
            setDeleteItem(false);
            const body = {
                poId: selectedItem.poId,
            };
            console.log('Delete Called');
            api.send('POST', APIURLS.deletePoi, body)
                .then(res => {
                    console.log('Body : ', body, 'Response Delete:', res);
                    if (res.data.code === 1016) {
                        getAllItems();
                    }
                })
                .catch(error => {});
        } else if (assign) {
            setAssign(false);
            console.log('Assigned Called');
            props.history.push(SCREENS.ZONE, { poi: selectedItem });
        } else if (unAssign) {
            setUnAssign(false);
            const body = { poId: selectedItem.poId };
            console.log('UnAssigned Called');
            api.send('POST', APIURLS.unAssignZoneToPoid, body)
                .then(res => {
                    console.log('Response for un-assign poi : ', res);
                    if (res.data.code === 6048) {
                        getAllItems();
                    } else {
                        console.log('Bad Body un-assign');
                    }
                })
                .catch(error => {
                    console.log('Error for un-assign poi : ', error);
                });
            //Call UnAssign Api
        }
    };

    const confirmClose = () => {
        setOpenDialog(false);
    };

    const handleZone = () => {
        console.log('handleAddZone');
        props.history.push(SCREENS.ZONE);
    };

    const handlePageClick = (event, value) => {
        console.log(value);
        setCurrentPage(value);
    };

    const handleAddPoi = () => {
        console.log('handleAddPoi');
        props.history.push(SCREENS.ADDPOI);
    };

    const getAllItems = () => {
        setPageLoad(true);
        const api = ApiManager.getInstance();
        api.send('GET', APIURLS.getAllPois, { page: currentPage })
            .then(res => {
                console.log('All poi Res: ', res);
                if (res.data.code === 1019) {
                    setPageLoad(false);
                    setList(res.data.response);
                    setTotalPage(res.data.totalPages);
                    if (!res.data.response) {
                        if (currentPage > 1) {
                            setCurrentPage(currentPage - 1);
                        } else {
                            setResMsg('NO POI');
                        }
                    }
                    // console.log(res);
                    // setList(res.data.response);
                    // setTotalPage(res.data.totalPages);
                } else {
                    setPageLoad(false);
                }
            })
            .catch(error => {
                setResMsg('NETWORK ERROR');
                setPageLoad(false);
            });
    };

    const handleDelete = poi => () => {
        console.log('[Handle DELETE]', poi);
        setOpenDialog(true);
        setSelectedItem(poi);
        setMessage('Do you want to delete this poi');
        setDeleteItem(true);
    };

    const handleAssign = poi => () => {
        console.log('[Handle ASSIGN]', poi);
        setSelectedItem(poi);
        setOpenDialog(true);
        if (poi.zoneId) {
            setMessage('Do you want to unAssigned the zone');
            setUnAssign(true);
        } else {
            setMessage('Do you want to Assigned the zone');
            setAssign(true);
        }
    };

    const goToPOIDetailScreen = poi => {
        console.log('Poi for details : ', poi);
        props.history.push(SCREENS.POIDETAIL, { poi: poi });
    };

    const trailingActions = poi => (
        <TrailingActions>
            <SwipeAction className={classes.delete} onClick={handleDelete(poi)}>
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
                onClick={() => goToPOIDetailScreen(poi)}
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
                className={classes.available}
                onClick={handleAssign(poi)}
            >
                <Grid className={classes.centered}>
                    <FontAwesomeIcon
                        className={classes.icon}
                        icon={poi.zoneId ? faBan : faGlobeAmericas}
                        size="1x"
                        title={poi.zoneId ? 'Un-Assign Zone' : 'Assign Zone'}
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
                        {props.intl.formatMessage({ ...messages.poi })}
                    </title>
                </Helmet>
                <Header
                    title={<FormattedMessage {...messages.poi} />}
                    showAddPoiBtn
                    onPressAddPoi={handleAddPoi}
                    onPressZone={handleZone}
                />
            </Grid>
            {list && !pageLoad && (
                <Grid>
                    {
                        <SwipeableList className={classes.main} type={Type.IOS}>
                            {list.map(poi => (
                                <SwipeableListItem
                                    key={poi.poiID}
                                    trailingActions={trailingActions(poi)}
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
                                                <FontAwesomeIcon
                                                    icon={
                                                        MARKER[
                                                            poi.markerShop - 1
                                                        ].icon
                                                    }
                                                    color={
                                                        POICOLORS[poi.color - 1]
                                                            .color
                                                    }
                                                    size="3x"
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
                                                                {'Name : '}
                                                                <Typography
                                                                    variant="body1"
                                                                    className={
                                                                        classes.description
                                                                    }
                                                                >
                                                                    {poi.name}
                                                                </Typography>
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <Typography
                                                                variant="body1"
                                                                className={
                                                                    classes.title
                                                                }
                                                            >
                                                                {'Type : '}
                                                                <Typography
                                                                    variant="body1"
                                                                    className={
                                                                        classes.description
                                                                    }
                                                                >
                                                                    {poi.type}
                                                                </Typography>
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <Typography
                                                                variant="body1"
                                                                className={
                                                                    classes.title
                                                                }
                                                            >
                                                                {'Zone : '}
                                                                <Typography
                                                                    variant="body1"
                                                                    className={
                                                                        classes.description
                                                                    }
                                                                >
                                                                    {poi.zoneId}
                                                                </Typography>
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <Typography
                                                                variant="body1"
                                                                className={
                                                                    classes.title
                                                                }
                                                            >
                                                                {'Address : '}
                                                                <Typography
                                                                    variant="body1"
                                                                    className={
                                                                        classes.description
                                                                    }
                                                                >
                                                                    {
                                                                        poi.address
                                                                    }
                                                                </Typography>
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

PoiPage.propTypes = {};

const withConnect = connect();

export default compose(withConnect)(injectIntl(PoiPage));
