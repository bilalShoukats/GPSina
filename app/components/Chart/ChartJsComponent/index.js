import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import Card from 'components/Card/Loadable'
import { Grid } from '@material-ui/core'
import messages from './messages';
import LineChart from './components/lineChart'
import BarChart from './components/barchart'
import SpaideChart from './components/spaider'
import PieChart from './components/pie'
import './style.scss'

const ChartJsComponent = () => {
    return (
        <Fragment>
            <Helmet>
                <title>Chart Js</title>
                <meta name="description" content="Description of ChartJsComponent" />
            </Helmet>
            <h2 className="breadcumbTitle">Chart Js</h2>
            <Grid container spacing={3}>
                <Grid item lg={6} xs={12}>
                    <Card title="Pie Chart">
                        <PieChart />
                    </Card>
                </Grid>
                <Grid item lg={6} xs={12}>
                    <Card title="Line Chart">
                        <LineChart />
                    </Card>
                </Grid>

                <Grid item lg={6} xs={12}>
                    <Card title="Bar Chart">
                        <BarChart />
                    </Card>
                </Grid>
                <Grid item lg={6} xs={12}>
                    <Card title="Spaider Chart">
                        <SpaideChart />
                    </Card>
                </Grid>

            </Grid>
        </Fragment>
    );
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(
    null,
    mapDispatchToProps,
);

export default compose(withConnect)(ChartJsComponent);
