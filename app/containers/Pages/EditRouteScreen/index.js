import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import makeSelectEditRouteScreen from './selectors';
import { SuperHOC } from '../../../HOC';
import { Grid, Button } from '@material-ui/core'
import CustomButton from './Button'
import Card from 'components/Card/Loadable'
import './style.scss'
import 'sass/elements/sweet-alerts.scss';
import EditRouteModal from './EditRouteModal';
import EditRouteMap from './basic';

class EditRouteScreen extends Component {

  state = {
    disabled: true,
    mapRoutes: {},
    dataLoaded: false,
  }

  componentDidMount = () => {
    console.log(this.props.match.params.item);
    this.getRoute();
  }

  getRoute = () => {
    let body = {
      routeID: this.props.match.params.item,
      companyEmail: this.props.user.companyEmail
    }
    console.log("response view body: ", body);
    this.props.apiManager.makeCall('viewRouteDetail', body, res => {
      if (res.code === 5056) {
        this.setState({ dataLoaded: true, mapRoutes: res.response.addresses });
      }
      else {
        // this.setState({ loading: false });
        toast.error(res.id);
      }
    })
  }

  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Edit Route</title>
        </Helmet>
        <h2 className="breadcumbTitle">Edit Route</h2>
        <Grid container spacing={3}>
          <Grid item xl={9} lg={8} xs={12}>
            <Card
              title="Edit Route"
              className="addCompany">
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  {this.state.dataLoaded ? (
                    <EditRouteMap
                      ref={r => this.editRouteMap = r}
                      addresses={this.state.mapRoutes}
                      enableResetButton={() => this.resetMarkerButton.makeEnable()}
                      enableeditRouteButton={(data) => {
                        this.editRouteButton.makeEnable(data)
                      }}
                      disableResetButton={() => {
                        this.resetMarkerButton.makeDisable()
                        this.editRouteButton.makeDisable()
                      }}
                    />
                  ) : null}
                </Grid>
                <Grid container spacing={4}>
                  <Grid item md={3} xs={12}>
                  </Grid>
                  <Grid item md={6} xs={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <CustomButton text={'Edit Route'} ref={r => this.editRouteButton = r} onClick={(data) => { this.editRouteModal.showModal(data) }} />
                    <CustomButton text={'Reset Route'} ref={r => this.resetMarkerButton = r} onClick={() => { this.editRouteMap.innerProps.resetMarkers() }} />
                  </Grid>
                  <Grid item md={3} xs={12}>
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
        <EditRouteModal
          {...this.props}
          ref={r => this.editRouteModal = r}
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

export default SuperHOC((withConnect)(EditRouteScreen));