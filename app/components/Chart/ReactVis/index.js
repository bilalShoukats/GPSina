import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import Card from 'components/Card/Loadable'
import { Grid } from '@material-ui/core'
import VisBarChart from './components/Bar'
import LineSeries from './components/lineSerise'
import LineSeriesWithManyColors from './components/lineColor'
import LineSeriesChart from './components/line'
import messages from './messages';
import './style.scss'

const ReactVis = () => {
    return (
        <Fragment>
            <Helmet>
                <title>React Vis</title>
            </Helmet>
            <h2 className="breadcumbTitle">React Vis</h2>
            <Grid container spacing={3}>
                <Grid item lg={6} xs={12}>
                    <Card title="Bar Chart">
                        <VisBarChart />
                    </Card>
                </Grid>
                <Grid item lg={6} xs={12}>
                    <Card title="Line Series Chart">
                        <LineSeries />
                    </Card>
                </Grid>
                <Grid item lg={6} xs={12}>
                    <Card title="Line Series Color Chart">
                        <LineSeriesWithManyColors />
                    </Card>
                </Grid>
                <Grid item lg={6} xs={12}>
                    <Card title="Line Chart">
                        <LineSeriesChart />
                    </Card>
                </Grid>
            </Grid>
        </Fragment>
    );
}

ReactVis.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(
    null,
    mapDispatchToProps,
);

export default compose(withConnect)(ReactVis);
