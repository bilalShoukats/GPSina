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
import {
    faBuilding,
    faChevronRight,
    faFlag,
    faHome,
    faIndustry,
    faMapMarkerAlt,
    faStreetView,
} from '@fortawesome/free-solid-svg-icons';
import SCREENS from '../../constants/screen';
import ApiManager from '../../ApiManager/ApiManager';
import APIURLS from '../../ApiManager/apiUrl';
import POICOLORS from '../PoiDetailPage/poiColors';
import { Pages } from '@material-ui/icons';

export function PoiPage(props) {
    useInjectReducer({ key: 'poiPage', reducer });
    useInjectSaga({ key: 'poiPage', saga });

    const classes = useStyles(props);
    const [poiList, setPoiList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    const goToPOIDetailScreen = poi => {
        props.history.push(SCREENS.POIDETAIL, { poi: poi });
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
    const handleIcon = icon => {
        switch (icon) {
            case 1:
                return faBuilding;

            case 2:
                return faHome;

            case 3:
                return faMapMarkerAlt;

            case 4:
                return faIndustry;

            case 5:
                return faFlag;

            case 6:
                return faStreetView;

            default:
                return faBuilding;
        }
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

            <Grid container className={classes.main}>
                {poiList.map(poi => (
                    <Grid
                        container
                        direction="row"
                        alignItems="center"
                        className={classes.container}
                        onClick={() => goToPOIDetailScreen(poi)}
                    >
                        <Grid item xs={2} md={1} className={classes.avatar}>
                            <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <FontAwesomeIcon
                                    icon={handleIcon(poi.markerShop)}
                                    color={POICOLORS[poi.color]}
                                    // style={{ }}
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
                                    <Grid container direction="column">
                                        <Grid item>
                                            <Typography
                                                variant="body1"
                                                className={classes.title}
                                            >
                                                {props.intl.formatMessage({
                                                    ...messages.name,
                                                }) + ': '}
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
                                                className={classes.title}
                                            >
                                                {props.intl.formatMessage({
                                                    ...messages.type,
                                                }) + ': '}
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
                                                className={classes.title}
                                            >
                                                {props.intl.formatMessage({
                                                    ...messages.zone,
                                                }) + ': '}
                                                <Typography
                                                    variant="body1"
                                                    className={
                                                        classes.description
                                                    }
                                                >
                                                    {poi.zone}
                                                </Typography>
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography
                                                variant="body1"
                                                className={classes.title}
                                            >
                                                {props.intl.formatMessage({
                                                    ...messages.address,
                                                }) + ': '}
                                                <Typography
                                                    variant="body1"
                                                    className={
                                                        classes.description
                                                    }
                                                >
                                                    {poi.address}
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
                ))}
                {totalPage > 0 && (
                    <Grid className={classes.container}>
                        {/* <ReactPaginate
                            previousLabel={'← Previous'}
                            nextLabel={'Next →'}
                            pageCount={totalPage}
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={10}
                            containerClassName={'pagination'}
                            previousLinkClassName={'pagination__link'}
                            nextLinkClassName={'pagination__link'}
                            disabledClassName={'pagination__link--disabled'}
                            activeClassName={'pagination__link--active'}
                        /> */}
                        <Pagination
                            count={totalPage}
                            color="primary"
                            page={currentPage}
                            onChange={handlePageClick}
                        />
                    </Grid>
                )}
            </Grid>
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
