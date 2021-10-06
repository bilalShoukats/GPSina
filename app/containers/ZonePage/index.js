/**
 *
 * ZonePage
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectZonePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import Header from '../../components/Header';
import { useStyles } from './styles.js';
// import { zoneList } from '../../constants/dummy';
import { Grid, Typography } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ConfirmDialog from '../../components/confirmAlert';
import {
    faBuilding,
    faChevronRight,
    faEdit,
    faFlag,
    faHome,
    faIndustry,
    faInfo,
    faInfoCircle,
    faMapMarkerAlt,
    faStreetView,
    faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import SCREENS from '../../constants/screen';
import ApiManager from '../../ApiManager/ApiManager';
import APIURLS from '../../ApiManager/apiUrl';

export function ZonePage(props) {
    useInjectReducer({ key: 'zonePage', reducer });
    useInjectSaga({ key: 'zonePage', saga });

    const classes = useStyles(props);
    const [poi, setPoi] = useState({});
    const [zone, setZone] = useState();
    const [zoneList, setZoneList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [openDelete, setOpenDelete] = useState(false);
    const [isDeleteModalShown, setIsDeleteModalShown] = useState(false);

    const handlePageClick = (event, value) => {
        console.log(value);
        setCurrentPage(value);
    };

    const confirmDeleteDialogClose = () => {
        setOpenDelete(false);
    };

    const confirmDeleteAgree = () => {
        const api = ApiManager.getInstance();
        api.send('POST', APIURLS.deleteZone, { zoneId: zone.zoneId })
            .then(res => {
                console.log('Delete Zone Resonse : ', res);
                if (res.data.code === 1016) {
                    setOpenDelete(false);
                    console.log('Successfully Deleted...');
                    allZone();
                }
            })
            .catch(error => {
                console.log('Delete Zone Errors : ', error);
            });
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
        const api = ApiManager.getInstance();
        api.send('GET', APIURLS.getAllZones, { page: currentPage })
            .then(res => {
                console.log('Get all Zone : ', res);
                if (res.data.code === 1019) {
                    setZoneList(res.data.response);
                    setTotalPage(res.data.totalPages);
                }
            })
            .catch(error => {
                console.log('Get all zone Errors : ', error);
            });
    };

    const deleteZone = zone => {
        setZone(zone);
        setOpenDelete(true);
        console.log('zone : ', zone);
    };

    const selectZoneforPOI = zone => {
        console.log('Poi zone: ', poi);
        if (poi.poId) {
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
                        props.history.goBack();
                        console.log('Successfully assign zone to poi');
                    } else {
                        console.log('Bad Body for assign zone');
                    }
                })
                .catch(error => {
                    console.log('Error for assign poi: ', error);
                });
        } else {
            console.log('Nothing');
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
        <div>
            <Helmet>
                <title>{props.intl.formatMessage({ ...messages.zone })}</title>
            </Helmet>
            <Header
                title={<FormattedMessage {...messages.zone} />}
                showAddBtn
                onPressAdd={handleAddZone}
            />

            <Grid container className={classes.main}>
                {zoneList.map(zone => (
                    <Grid
                        container
                        direction="row"
                        alignItems="center"
                        className={classes.container}
                    >
                        <Grid
                            item
                            xs={12}
                            alignItems="center"
                            className={classes.content}
                            onClick={() => selectZoneforPOI(zone)}
                        >
                            <Grid
                                container
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Grid item>
                                    <Typography
                                        variant="body1"
                                        className={classes.title}
                                    >
                                        {zone.name}
                                    </Typography>
                                </Grid>
                                {!poi.poId && (
                                    <Grid item>
                                        <FontAwesomeIcon
                                            icon={faEdit}
                                            className={classes.detailIcon}
                                            onClick={() =>
                                                goToAreaDetailScreen(zone)
                                            }
                                            size="1x"
                                        />
                                        <FontAwesomeIcon
                                            icon={faTrashAlt}
                                            className={classes.deleteIcon}
                                            onClick={() => deleteZone(zone)}
                                            size="1x"
                                        />
                                    </Grid>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                ))}
            </Grid>
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
            <ConfirmDialog
                title={'Alert'}
                agreeText={'Ok'}
                open={openDelete}
                disagreeText={'Cancel'}
                agree={confirmDeleteAgree}
                disagree={confirmDeleteDialogClose}
                handleClose={confirmDeleteDialogClose}
                message={'Are you sure to delete this Zone'}
            />
        </div>
    );
}

ZonePage.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    zonePage: makeSelectZonePage(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(ZonePage));
