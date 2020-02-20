import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import Card from 'components/Card/Loadable'
import { Grid } from '@material-ui/core'
import BarRechart from './components/bar'
import LineRechart from './components/line'
import AreaRechart from './components/area'
import ComposedRechart from './components/composed'
import ScatterRechart from './components/scatter'
import PieRechart from './components/pie'
import RadarRechart from './components/radar'
import RadialRechart from './components/radial'
import GradientRechart from './components/gradient.js'
import './style.scss'
const ReChart = () => {
    return (
        <Fragment>
            <Helmet>
                <title>ReChart</title>
            </Helmet>
            <h2 className="breadcumbTitle">ReChart</h2>
            <Grid container spacing={2}>
                <Grid item lg={6} xs={12}>
                    <Card
                        title="Bar Chart With Custom Tooltip">
                        <BarRechart />
                    </Card>
                </Grid>
                <Grid item lg={6} xs={12}>
                    <Card
                        title="Line Chart">
                        <LineRechart />
                    </Card>
                </Grid>
                <Grid item lg={6} xs={12}>
                    <Card
                        title="Area Chart">
                        <AreaRechart />
                    </Card>
                </Grid>
                <Grid item lg={6} xs={12}>
                    <Card
                        title="Composed Chart">
                        <ComposedRechart />
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card
                        title="Gradient Chart Demo">
                        <GradientRechart />
                    </Card>
                </Grid>
                <Grid item lg={6} xs={12}>
                    <Card
                        title="Scatter Chart">
                        <ScatterRechart />
                    </Card>
                </Grid>
                <Grid item lg={6} xs={12}>
                    <Card
                        title="Pie Chart">
                        <PieRechart />
                    </Card>
                </Grid>
                <Grid item lg={6} xs={12}>
                    <Card
                        title="Radar Chart">
                        <RadarRechart />
                    </Card>
                </Grid>
                <Grid item lg={6} xs={12}>
                    <Card
                        title="Radial Chart">
                        <RadialRechart />
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

export default compose(withConnect)(ReChart);
