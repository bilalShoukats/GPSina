/**
 *
 * PoiPage
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
import makeSelectPoiPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import Header from '../../components/Header';
import Pagination from '@material-ui/lab/Pagination';
import { useStyles } from './styles.js';
import { Grid, Typography } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router-dom';
import SCREENS from '../../constants/screen';
import ApiManager from '../../ApiManager/ApiManager';
import APIURLS from '../../ApiManager/apiUrl';
import POICOLORS from '../PoiDetailPage/poiColors';
import { Pages } from '@material-ui/icons';
import PoiList from '../../components/PoiList';
import ConfirmDialog from '../../components/confirmAlert';

export function PoiPage(props) {
    useInjectReducer({ key: 'poiPage', reducer });
    useInjectSaga({ key: 'poiPage', saga });

    const classes = useStyles(props);
    const history = useHistory();
    const [poiList, setPoiList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [openDelete, setOpenDelete] = useState(false);
    const [isDeleteModalShown, setIsDeleteModalShown] = useState(false);
    const [openAssign, setOpenAssign] = useState(false);
    const [isAssignModalShown, setIsAssignModalShown] = useState(false);
    const [poi, setPoi] = useState({});

    const confirmAssignOpen = poi => {
        setPoi(poi);
        setOpenAssign(true);
    };
    const handleOpenAssignModal = () => {
        setIsAssignModalShown(true);
    };
    const confirmAssignDialogClose = () => {
        setOpenAssign(false);
    };
    const confirmAssignAgree = () => {
        const body = {
            poId: poi.poId,
            zoneId: poi.zoneId,
        };
        setOpenAssign(false);
        if (poi.zoneId) {
            delete body.zoneId;
            const api = ApiManager.getInstance();
            console.log('Body Submitted for un-assign : ', body);
            api.send('POST', APIURLS.unAssignZoneToPoid, body)
                .then(res => {
                    console.log('Response for un-assign poi : ', res);
                    if (res.data.code === 6048) {
                        allPoi();
                    } else {
                        console.log('Bad Body un-assign');
                    }
                })
                .catch(error => {
                    console.log('Error for un-assign poi : ', error);
                });
            console.log('Call the un-assign api for this poi : ', poi);
        } else {
            history.push(SCREENS.ZONE, { poi: poi });
            console.log('Call the assign api for this poi : ', poi);
        }
    };
    const confirmDeleteOpen = poi => {
        setPoi(poi);
        setOpenDelete(true);
    };
    const handleOpenDeleteModal = () => {
        setIsDeleteModalShown(true);
    };
    const confirmDeleteDialogClose = () => {
        setOpenDelete(false);
    };
    const confirmDeleteAgree = () => {
        console.log('Call the delete api for this poi : ', poi);
        const body = {
            poId: poi.poId,
        };
        const api = ApiManager.getInstance();
        api.send('POST', APIURLS.deletePoi, body)
            .then(res => {
                console.log('Delete Poi response : ', res);
                if (res.data.code === 1016) {
                    setOpenDelete(false);
                    allPoi();
                } else {
                    console.log('Bad Body');
                }
            })
            .catch(error => {
                console.log('Delete poi error: ', error);
            });
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

    useEffect(() => {
        allPoi();
    }, [currentPage]);

    const allPoi = () => {
        const api = ApiManager.getInstance();
        api.send('GET', APIURLS.getAllPois, { page: currentPage })
            .then(res => {
                console.log('Get all Poi response : ', res);
                if (res.data.code === 1019) {
                    setPoiList(res.data.response);
                    setTotalPage(res.data.totalPages);
                }
            })
            .catch(error => {
                console.log('Get all Poi Errors : ', error);
            });
    };

    return (
        <div>
            <Helmet>
                <title>{props.intl.formatMessage({ ...messages.poi })}</title>
            </Helmet>
            <Header
                title={<FormattedMessage {...messages.poi} />}
                showAddPoiBtn
                onPressAddPoi={handleAddPoi}
                onPressZone={handleZone}
            />

            {poiList.map(poi => (
                <PoiList
                    poi={poi}
                    key={poi.id}
                    swipeLeftAction={confirmDeleteOpen}
                    onOpenDeleteModal={handleOpenDeleteModal}
                    swipeRightAction={confirmAssignOpen}
                    onOpenAssignModal={handleOpenAssignModal}
                />
            ))}
            <ConfirmDialog
                title={'Alert'}
                agreeText={'Ok'}
                open={openDelete}
                disagreeText={'Cancel'}
                agree={confirmDeleteAgree}
                disagree={confirmDeleteDialogClose}
                handleClose={confirmDeleteDialogClose}
                message={'Are you sure to delete this POI'}
            />
            <ConfirmDialog
                title={'Alert'}
                agreeText={'Ok'}
                open={openAssign}
                disagreeText={'Cancel'}
                agree={confirmAssignAgree}
                disagree={confirmAssignDialogClose}
                handleClose={confirmAssignDialogClose}
                message={
                    poi.zoneId
                        ? 'Un-assign zone for this POI?'
                        : 'Assign zone for this POI?'
                }
            />
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
    );
}

PoiPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    poiPage: makeSelectPoiPage(),
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

export default compose(withConnect)(injectIntl(PoiPage));
