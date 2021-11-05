/**
 *
 * ZonePage
 *
 */

import './styles.css';
import { compose } from 'redux';
import messages from './messages';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { useStyles } from './styles.js';
import { Sentry } from 'react-activity';
import 'react-activity/dist/Sentry.css';
import Header from '../../components/Header';
import SCREENS from '../../constants/screen';
import 'react-swipeable-list/dist/styles.css';
import APIURLS from '../../ApiManager/apiUrl';
import React, { useEffect, useState } from 'react';
import UserAvatar from '../../components/UserAvatar';
import { Grid, Typography } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import ApiManager from '../../ApiManager/ApiManager';
import ConfirmDialog from '../../components/confirmAlert';
import { FormattedMessage, injectIntl } from 'react-intl';
import zoneIcon from '../../../assets/images/icons/zone.svg';
import ConfirmMessage from '../../components/ConfirmDialouge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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

export function ZonePage(props) {
    const classes = useStyles(props);
    const [poi, setPoi] = useState('');
    const [list, setList] = useState([]);
    const [resMsg, setResMsg] = useState('');
    const [message, setMessage] = useState('');
    const [totalPage, setTotalPage] = useState(1);
    const [pageLoad, setPageLoad] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [openDialog, setOpenDialog] = useState(false);
    const [deleteItem, setDeleteItem] = useState(false);
    const [selectedItem, setSelectedItem] = useState({});
    const [openResponse, setOpenResponse] = useState(false);

    const handleDelete = zone => () => {
        setOpenDialog(true);
        setSelectedItem(zone);
        setMessage('Do you want to delete this zone');
        setDeleteItem(true);
    };

    const trailingActions = zone => (
        <TrailingActions>
            <SwipeAction
                className={classes.delete}
                onClick={handleDelete(zone)}
            >
                <Grid className={classes.centered}>
                    <FontAwesomeIcon
                        className={classes.icon}
                        icon={faTrashAlt}
                        size="1x"
                    />
                </Grid>
            </SwipeAction>
            <SwipeAction
                className={classes.assign}
                onClick={() => goToAreaDetailScreen(zone)}
            >
                <Grid className={classes.centered}>
                    <FontAwesomeIcon
                        className={classes.icon}
                        icon={faEdit}
                        size="1x"
                    />
                </Grid>
            </SwipeAction>
        </TrailingActions>
    );

    const handlePageClick = (event, value) => {
        console.log(value);
        setCurrentPage(value);
    };

    const confirmAgree = () => {
        const api = ApiManager.getInstance();
        setOpenDialog(false);
        if (deleteItem) {
            setDeleteItem(false);
            const body = {
                zoneId: selectedItem.zoneId,
            };
            console.log('Delete Called');
            api.send('POST', APIURLS.deleteZone, body)
                .then(res => {
                    console.log('Body : ', body, 'Response Delete Zone :', res);
                    setOpenResponse(true);
                    if (res.data.code === 1016) {
                        setResMsg('Delete Zone Successfully');
                        allZone();
                    }
                })
                .catch(error => {
                    setOpenResponse(true);
                    setResMsg(error.message);
                });
        }
    };

    const confirmClose = () => {
        setOpenDialog(false);
        setOpenResponse(false);
    };

    const goToAreaDetailScreen = area => {
        console.log('goToAreaDetailScreen');
        props.history.push(SCREENS.ZONEDETAIL, { area: area });
    };

    const handleAddZone = () => {
        console.log('handleAddZone');
        props.history.push(SCREENS.ADDZONE);
    };

    const allZone = () => {
        setPageLoad(true);
        const api = ApiManager.getInstance();
        api.send('GET', APIURLS.getAllZones, { page: currentPage })
            .then(res => {
                console.log('Get all Zone : ', res);
                if (res.data.code === 1019) {
                    setPageLoad(false);
                    setList(res.data.response);
                    setTotalPage(res.data.totalPages);
                    if (!res.data.response) {
                        if (currentPage > 1) {
                            setCurrentPage(currentPage - 1);
                        } else {
                            setResMsg('NO ZONE');
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
                setOpenResponse(true);
            });
    };

    const selectZoneforPOI = zone => {
        if (poi.poId) {
            console.log('Poi zone: ', poi);
            const body = {
                poId: poi.poId,
                zoneId: zone.zoneId,
            };
            console.log('body for assign poi : ', body);
            const api = ApiManager.getInstance();
            api.send('POST', APIURLS.assignZoneToPoi, body)
                .then(res => {
                    console.log('response for assign poi : ', res);
                    if (res.data.code === 6047) {
                        setResMsg('Zone Assigned');
                        setOpenResponse(true);
                        props.history.goBack();
                    } else {
                        setResMsg(res.data.id);
                        setOpenResponse(true);
                    }
                })
                .catch(error => {
                    setResMsg(res.data.id);
                    setOpenResponse(true);
                });
        }
    };

    useEffect(() => {
        console.log('Detail useEffect POI : ', props.location.state);
        if (props.location.state) {
            setPoi(props.location.state.poi);
        }
        console.log('prop poi : ', poi);
    }, []);

    useEffect(() => {
        allZone();
    }, [currentPage]);

    return (
        <Grid>
            <Grid>
                <Helmet>
                    <title>
                        {props.intl.formatMessage({ ...messages.zone })}
                    </title>
                </Helmet>
                <Header
                    title={<FormattedMessage {...messages.zone} />}
                    showAddBtn
                    onPressAdd={handleAddZone}
                />
            </Grid>
            {list && !pageLoad && (
                <Grid>
                    {
                        <SwipeableList className={classes.main} type={Type.IOS}>
                            {list.map(zone => (
                                <SwipeableListItem
                                    key={zone.zoneId}
                                    trailingActions={trailingActions(zone)}
                                    blockSwipe={poi}
                                >
                                    <Grid
                                        container
                                        direction="row"
                                        alignItems="center"
                                        className={classes.container}
                                        onClick={() => {
                                            selectZoneforPOI(zone);
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
                                                    alt="Zone Avatar"
                                                    src={zoneIcon}
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
                                                                {zone.name}
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                {!poi.poId && (
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

ZonePage.propTypes = {};

const withConnect = connect();

export default compose(withConnect)(injectIntl(ZonePage));
