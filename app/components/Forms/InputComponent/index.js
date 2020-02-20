import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {Helmet} from 'react-helmet';
import {FormattedMessage} from 'react-intl';
import {compose} from 'redux';
import messages from './messages';
import {Grid} from '@material-ui/core'
import Card from 'components/Card/Loadable'
import TextFields from './components/basic'
import OutlinedTextFields from './components/outline'
import FilledTextFields from './components/filled'
import InputValidation from './components/validation'
import './style.scss'

const InputComponent = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Form</title>
        <meta name="description" content="Description of InputComponent"/>
      </Helmet>
      <h2 className="breadcumbTitle">Input Field</h2>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card title="basic Input">
            <TextFields/>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card title="Outline Input">
            <OutlinedTextFields/>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card title="Filled Input">
            <FilledTextFields/>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card title="Validation Input">
            <InputValidation/>
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

export default compose(withConnect)(InputComponent);
