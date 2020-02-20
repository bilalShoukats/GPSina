import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {Helmet} from 'react-helmet';
import {FormattedMessage} from 'react-intl';
import Card from 'components/Card/Loadable';
import {Alert, UncontrolledAlert} from 'reactstrap';
import {Grid} from '@material-ui/core';
import {compose} from 'redux';
import messages from './messages';

import 'sass/elements/alert.scss'

const Alerts = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Alerts</title>
        <meta name="description" content="Description of Alerts"/>
      </Helmet>
      <h2 className="breadcumbTitle">Alerts</h2>
      <Grid container spacing={3}>
        <Grid item lg={6} xs={12}>
          <Card
            title="Alerts Default"
          >
            <Alert className="bg-default">
              This is a default alert — check it out!
            </Alert>
            <Alert className="bg-primary">
              This is a primary alert — check it out!
            </Alert>
            <Alert className="bg-secondary">
              This is a secondary alert — check it out!
            </Alert>
            <Alert className="bg-success">
              This is a success alert — check it out!
            </Alert>
            <Alert className="bg-danger">
              This is a danger alert — check it out!
            </Alert>
            <Alert className="bg-warning">
              This is a warning alert — check it out!
            </Alert>
            <Alert className="bg-info">
              This is a info alert — check it out!
            </Alert>
            <Alert className="bg-light text-dark">
              This is a light alert — check it out!
            </Alert>
            <Alert className="bg-dark">
              This is a dark alert — check it out!
            </Alert>
          </Card>
        </Grid>
        <Grid item lg={6} xs={12}>
          <Card
            title="Alert With Link"
          >
            <Alert className="bg-default">
              This is a default <a href="#" className="alert-link">an example link</a>. alert — check it out!
            </Alert>
            <Alert className="bg-primary">
              This is a primary <a href="#" className="alert-link">an example link</a>. alert — check it out!
            </Alert>
            <Alert className="bg-secondary">
              This is a secondary <a href="#" className="alert-link">an example link</a>. alert — check it out!
            </Alert>
            <Alert className="bg-success">
              This is a success <a href="#" className="alert-link">an example link</a>. alert — check it out!
            </Alert>
            <Alert className="bg-danger">
              This is a danger <a href="#" className="alert-link">an example link</a>. alert — check it out!
            </Alert>
            <Alert className="bg-warning">
              This is a warning <a href="#" className="alert-link">an example link</a>. alert — check it out!
            </Alert>
            <Alert className="bg-info">
              This is a info <a href="#" className="alert-link">an example link</a>. alert — check it out!
            </Alert>
            <Alert className="bg-light text-dark">
              This is a light <a href="#" className="alert-link">an example link</a>. alert — check it out!
            </Alert>
            <Alert className="bg-dark">
              This is a dark <a href="#" className="alert-link">an example link</a>. alert — check it out!
            </Alert>
          </Card>
        </Grid>
        <Grid item lg={6} xs={12}>
          <Card
            title="Uncontrolled Alert"
          >
            <UncontrolledAlert color="primary" className="bg-primary">
              This is a primary alert — check it out!
            </UncontrolledAlert>
            <UncontrolledAlert color="secondary" className="bg-secondary">
              This is a secondary alert — check it out!
            </UncontrolledAlert>
            <UncontrolledAlert color="success" className="bg-success">
              This is a success alert — check it out!
            </UncontrolledAlert>
            <UncontrolledAlert color="danger" className="bg-danger">
              This is a danger alert — check it out!
            </UncontrolledAlert>
            <UncontrolledAlert color="warning" className="bg-warning">
              This is a warning alert — check it out!
            </UncontrolledAlert>
            <UncontrolledAlert color="info" className="bg-info">
              This is a info alert — check it out!
            </UncontrolledAlert>
            <UncontrolledAlert color="light" className="bg-light text-dark">
              This is a light alert — check it out!
            </UncontrolledAlert>
            <UncontrolledAlert color="dark" className="bg-dark">
              This is a dark alert — check it out!
            </UncontrolledAlert>
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

export default compose(withConnect)(Alerts);
