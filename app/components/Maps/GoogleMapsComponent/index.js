import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {Helmet} from 'react-helmet';
import {FormattedMessage} from 'react-intl';
import {compose} from 'redux';
import Card from 'components/Card/Loadable'
import {Grid} from '@material-ui/core'
import BasicMap from './components/basic'
import messages from './messages';

const GoogleMapsComponent = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Google Maps</title>
      </Helmet>
      <h2 className="breadcumbTitle">Google Maps</h2>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card
            title="Basic Map">
            <BasicMap/>
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

export default compose(withConnect)(GoogleMapsComponent);



