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
    const [poiList, setPoiList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [openDelete, setOpenDelete] = useState(false);
    const [isDeleteModalShown, setIsDeleteModalShown] = useState(false);
    const [openAssign, setOpenAssign] = useState(false);
    const [isAssignModalShown, setIsAssignModalShown] = useState(false);

    const confirmAssignOpen = () => {
        setOpenAssign(true);
    };

    const handleOpenAssignModal = () => {
        setIsAssignModalShown(true);
    };
    const confirmAssignDialogClose = () => {
        setOpenAssign(false);
    };

    const confirmAssignAgree = id => {
        console.log('Call the Assign api for this id : ', id);
    };

    const confirmDeleteOpen = () => {
        setOpenDelete(true);
    };

    const handleOpenDeleteModal = () => {
        setIsDeleteModalShown(true);
    };
    const confirmDeleteDialogClose = () => {
        setOpenDelete(false);
    };

    const confirmDeleteAgree = id => {
        console.log('Call the delete api for this id : ', id);
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
                agree={() => confirmDeleteAgree()}
                disagree={confirmDeleteDialogClose}
                handleClose={confirmDeleteDialogClose}
                message={'Are you sure to delete this POI'}
            />
            <ConfirmDialog
                title={'Alert'}
                agreeText={'Ok'}
                open={openAssign}
                disagreeText={'Cancel'}
                agree={() => confirmAssignAgree()}
                disagree={confirmAssignDialogClose}
                handleClose={confirmAssignDialogClose}
                message={'Are you sure to Assign  Zone this POI'}
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
