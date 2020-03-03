import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import makeSelectAddRouteScreen from './selectors';
import { SuperHOC } from '../../../HOC';
import { Grid, Button } from '@material-ui/core'
import CustomButton from './Button'
import Card from 'components/Card/Loadable'
import './style.scss'
import 'sass/elements/sweet-alerts.scss';
import AddRouteModal from './AddRouteModal';
import BasicMap from '../../../components/Maps/GoogleMapsComponent/components/basic';

class AddRouteScreen extends Component {

  state = {
    disabled: true,
    mapRoutes: {},
  }

  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Add Route</title>
        </Helmet>
        <h2 className="breadcumbTitle">Add Route</h2>
        <Grid container spacing={3}>
          <Grid item xl={9} lg={8} xs={12}>
            <Card
              title="Add Route"
              className="addCompany">
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <BasicMap
                    ref={r => this.basicMap = r}
                    enableResetButton={() => this.resetMarkerButton.makeEnable()}
                    enableAddRouteButton={(data) => {
                      this.addRouteButton.makeEnable(data)
                    }}
                    disableResetButton={() => {
                      this.resetMarkerButton.makeDisable()
                      this.addRouteButton.makeDisable()
                    }}
                  />
                </Grid>
                <Grid container spacing={4}>
                  <Grid item md={3} xs={12}>
                  </Grid>
                  <Grid item md={6} xs={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <CustomButton text={'Add Route'} ref={r => this.addRouteButton = r} onClick={(data) => { this.addRouteModal.showModal(data) }} />
                    <CustomButton text={'Reset Route'} ref={r => this.resetMarkerButton = r} onClick={() => { this.basicMap.innerProps.resetMarkers() }} />
                  </Grid>
                  <Grid item md={3} xs={12}>
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
        <AddRouteModal
          {...this.props}
          ref={r => this.addRouteModal = r}
        />
      </Fragment >
    );
  }
}

// const mapStateToProps = createStructuredSelector({
//   addRouteScreen: makeSelectAddRouteScreen(),
// });

// function mapDispatchToProps(dispatch) {
//   return {
//     dispatch,
//   };
// }

// const withConnect = connect(
//   mapStateToProps,
//   mapDispatchToProps,
// );

// export default compose(withConnect)(AddRouteScreen);

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default SuperHOC((withConnect)(AddRouteScreen));
