import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import messages from './messages';
import Card from 'components/Card/Loadable'
import SimpleSelect from './components/basic'
import NativeSelects from './components/native'
import MultipleSelect from './components/multi'
import IntegrationReactSelect from './components/search'
import { Grid } from '@material-ui/core'
import './style.scss'

const SelectForm = () => {
    return (
        <Fragment>
            <Helmet>
                <title>Select</title>
            </Helmet>
            <h2 className="breadcumbTitle">Select Input</h2>
            <Grid container spacing={3}>
                <Grid item lg={6} xs={12}>
                    <Card
                        title="Basic Select"
                    >
                        <SimpleSelect />
                    </Card>
                </Grid>
                <Grid item lg={6} xs={12}>
                    <Card
                        title="Native Select"
                    >
                        <NativeSelects />
                    </Card>
                </Grid>
                <Grid item lg={6} xs={12}>
                    <Card
                        title="Multi Select"
                    >
                        <MultipleSelect />
                    </Card>
                </Grid>
                <Grid item lg={6} xs={12}>
                    <Card
                        title="Multi Select"
                    >
                        <IntegrationReactSelect />
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

export default compose(withConnect)(SelectForm);
