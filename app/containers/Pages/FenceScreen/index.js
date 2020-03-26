import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { SuperHOC } from '../../../HOC';
import { Grid } from '@material-ui/core'
import CustomButton from './Button'
import Card from 'components/Card/Loadable'
import './style.scss'
import 'sass/elements/sweet-alerts.scss';
import AddFenceModal from './AddFenceModal';
import FenceMap from '../../../components/Maps/GoogleMapsComponent/components/fence';

class FenceScreen extends Component {

  state = {
    disabled: true,
    mapRoutes: {},
  }

  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Add Fence</title>
        </Helmet>
        <h2 className="breadcumbTitle">Add Fence</h2>
        <Grid container spacing={3}>
          <Grid item xl={9} lg={8} xs={12}>
            <Card
              title="Add Fence"
              className="addCompany">
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FenceMap
                    ref={r => this.fenceMap = r}
                    enableResetButton={() => this.resetFenceButton.makeEnable()}
                    enableAddFenceButton={(data) => {
                      this.addFenceButton.makeEnable(data)
                    }}
                    disableResetButton={() => {
                      this.resetFenceButton.makeDisable()
                      this.addFenceButton.makeDisable()
                    }}
                  />
                </Grid>
                <Grid container spacing={4}>
                  <Grid item md={3} xs={12}>
                  </Grid>
                  <Grid item md={6} xs={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <CustomButton text={'Add Fence'} ref={r => this.addFenceButton = r} onClick={(data) => { this.addFenceModal.showModal(data) }} />
                    <CustomButton text={'Reset Fence'} ref={r => this.resetFenceButton = r} onClick={() => { this.fenceMap.innerProps.resetFence() }} />
                  </Grid>
                  <Grid item md={3} xs={12}>
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
        <AddFenceModal
          {...this.props}
          ref={r => this.addFenceModal = r}
        />
      </Fragment >
    );
  }
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

export default SuperHOC((withConnect)(FenceScreen));