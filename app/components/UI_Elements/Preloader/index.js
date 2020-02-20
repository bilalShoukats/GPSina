import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import messages from './messages';
import Card from 'components/Card/Loadable'
import CircularIntegration from './components/interactive'
import LinearIndeterminate from './components/Indeterminate'
import { Grid, CircularProgress } from '@material-ui/core';
import './style.scss'


const Preloader = () => {
    return (
        <Fragment>
            <Helmet>
                <title>Preloader</title>
                <meta name="description" content="Description of Preloader" />
            </Helmet>
            <h2 className="breadcumbTitle">Preloaders</h2>
            <Grid container spacing={3}>
                <Grid item lg={6} xs={12}>
                    <Card
                        title="Circular Indeterminate"
                    >
                        <CircularProgress className="mr-10 text-default" />
                        <CircularProgress className="mr-10 text-success" />
                        <CircularProgress className="mr-10 text-primary" />
                        <CircularProgress className="mr-10 text-secondary" />
                        <CircularProgress className="mr-10 text-danger" />
                        <CircularProgress className="mr-10 text-warning" />
                        <CircularProgress className="mr-10 text-info" />
                        <CircularProgress className="mr-10 text-light" />
                        <CircularProgress className="text-dark" />
                    </Card>
                </Grid>
                <Grid item lg={6} xs={12}>
                    <Card
                        title="Interactive Integration"
                    >
                        <CircularIntegration />
                    </Card>
                </Grid>
                <Grid item lg={6} xs={12}>
                    <Card
                        title="Interactive Integration"
                    >
                        <LinearIndeterminate />
                    </Card>
                </Grid>
            </Grid>
        </Fragment >
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

export default compose(withConnect)(Preloader);
