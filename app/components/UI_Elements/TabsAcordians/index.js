import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Helmet} from 'react-helmet';
import {FormattedMessage} from 'react-intl';
import {compose} from 'redux';
import Card from 'components/Card/Loadable'
import messages from './messages';
import SimpleTabs from './components/sympleTab'
import WrapperLabelsTab from './components/wrapperLabelsTab'
import DisabledTab from './components/disabledTab'
import SwipableTab from './components/swipableTab'
import SympleAcordians from './components/sympleAcordians'
import CustomizedExpansionPanels from './components/customAcordian'
import {Grid} from '@material-ui/core';
import './style.scss'

const TabsAcordians = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Tabs Acordians</title>
      </Helmet>
      <h2 className="breadcumbTitle">Tabs</h2>
      <Grid container spacing={3}>
        <Grid item xl={6} xs={12}>
          <Card
            title="Simple Tabs"
          >
            <SimpleTabs/>
          </Card>
        </Grid>
        <Grid item xl={6} xs={12}>
          <Card
            title="Wrapped Labels"
          >
            <WrapperLabelsTab/>
          </Card>
        </Grid>
        <Grid item xl={6} xs={12}>
          <Card
            title="Disabled Tab "
          >
            <DisabledTab/>
          </Card>
        </Grid>
        <Grid item xl={6} xs={12}>
          <Card
            title="Swipable Tab "
          >
            <SwipableTab/>
          </Card>
        </Grid>
        <Grid item xl={6} xs={12}>
          <Card
            title="Symple Acordians "
          >
            <SympleAcordians/>
          </Card>
        </Grid>
        <Grid item xl={6} xs={12}>
          <Card
            title="Custom Acordians "
          >
            <CustomizedExpansionPanels/>
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

export default compose(withConnect)(TabsAcordians);
