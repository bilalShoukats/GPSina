import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {Helmet} from 'react-helmet';
import {FormattedMessage} from 'react-intl';
import {compose} from 'redux';
import Card from 'components/Card/Loadable'
import {Grid} from '@material-ui/core'
import messages from './messages';

// components 
import BasicVectorMap from 'components/Maps/VectorMapComponents/components/basic'
import NormalVectorMap from 'components/Maps/VectorMapComponents/components/lonDemo'

const VectorMapComponents = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Vector Map</title>
      </Helmet>
      <h2 className="breadcumbTitle">Vector Map </h2>
      <Grid container spacing={3}>
        <Grid item xl={6} xs={12}>
          <Card
            title="Basic Vector Map">
            <BasicVectorMap/>
          </Card>
        </Grid>
        <Grid item xl={6} xs={12}>
          <Card
            title="Vector Map">
            <NormalVectorMap/>
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

export default compose(withConnect)(VectorMapComponents);
