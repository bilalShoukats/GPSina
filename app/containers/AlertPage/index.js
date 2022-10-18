/**
 *
 * AlertPage
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import APIURLS from '../../ApiManager/apiUrl';
import ApiManager from '../../ApiManager/ApiManager';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Grid, Typography } from '@material-ui/core';
import makeSelectAlertPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import Header from '../../components/Header';
import { useStyles } from './styles.js';

export function AlertPage(props) {
    const api = ApiManager.getInstance();
    const [list, setList] = useState([]);
    const [vehicle, setVehicle] = useState(props);
    const [pageLoad, setPageLoad] = useState(true);
    // const [totalPage, setTotalPage] = useState(1);
    // const [currentPage, setCurrentPage] = useState(1);
    const [resMsg, setResMsg] = useState('');
    useInjectReducer({ key: 'alertPage', reducer });
    useInjectSaga({ key: 'alertPage', saga });

    const classes = useStyles(props);


    const getAllItems = () => {
        api.send('GET', '/getAllDeviceAlerts', {
            // deviceId: "data",
            isRead: 0,
            page:1,
        })
            .then(res => {
                console.log('ALL DEVICES ALERTS', res);
            })
            .catch(error => {});
    };

    useEffect(() => {
        getAllItems();
    }, []);
    // const getAllItems = () => {
    //     api.send('POST', '/vehicleTravelHistoryDates', {
    //         deviceId: vehicle.deviceID,
    //         page: 1,
    //     })
    //         .then(res => {
    //             console.log('ALL DEVICES Dates', res);
    //         })
    //         .catch(error => {});
    // };
    // useEffect(() => {
    //     getAllItems();
    // }, []);

    return (
        <div>
            <Helmet>
                <title>Alert</title>
            </Helmet>
            <Header
                title={<FormattedMessage {...messages.alert} />}
                showClearBtn
            />
            <Grid className={classes.container}>
                <Typography variant="body1" align="center">
                    <FormattedMessage {...messages.noAlertFound} />
                </Typography>
            </Grid>
        </div>
    );
}

AlertPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    alertPage: makeSelectAlertPage(),
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

export default compose(withConnect)(AlertPage);
