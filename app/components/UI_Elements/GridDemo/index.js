import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import Card from 'components/Card/Loadable'
import { compose } from 'redux';
import { Grid, } from '@material-ui/core'
import messages from './messages';
import './style.scss'

const GridDemo = () => {
    return (
        <Fragment>
            <Helmet>
                <title>Grid</title>
                <meta name="description" content="Description of GridDemo" />
            </Helmet>
            <h2 className="breadcumbTitle">Grids</h2>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Card
                        title="Basic grid"
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Grid className="gridStyle">xs=12</Grid>
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <Grid className="gridStyle">xs=6</Grid>
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <Grid className="gridStyle">xs=6</Grid>
                            </Grid>
                            <Grid item sm={3} xs={12}>
                                <Grid className="gridStyle">xs=3</Grid>
                            </Grid>
                            <Grid item sm={3} xs={12}>
                                <Grid className="gridStyle">xs=3</Grid>
                            </Grid>
                            <Grid item sm={3} xs={12}>
                                <Grid className="gridStyle">xs=3</Grid>
                            </Grid>
                            <Grid item sm={3} xs={12}>
                                <Grid className="gridStyle">xs=3</Grid>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card
                        title="Grid with breakpoints"
                    >
                        <Grid container spacing={2}>

                            <Grid item xs={12}>
                                <Grid className="gridStyle">xs=12</Grid>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Grid className="gridStyle">xs=12 sm=6</Grid>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Grid className="gridStyle">xs=12 sm=6</Grid>
                            </Grid>
                            <Grid item xs={6} md={4} sm={3}>
                                <Grid className="gridStyle">xs=6 md=4 sm=3</Grid>
                            </Grid>
                            <Grid item xs={6} md={4} sm={3}>
                                <Grid className="gridStyle">xs=6 md=4 sm=3</Grid>
                            </Grid>
                            <Grid item xs={6} md={4} sm={3}>
                                <Grid className="gridStyle">xs=6 md=4 sm=3</Grid>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <Grid className="gridStyle">xs=6 sm=3</Grid>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <Grid className="gridStyle">xs=6 sm=3</Grid>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <Grid className="gridStyle">xs=6 sm=3</Grid>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <Grid className="gridStyle">xs=6 sm=3</Grid>
                            </Grid>
                        </Grid>
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

export default compose(withConnect)(GridDemo);
