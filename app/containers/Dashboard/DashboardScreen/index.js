import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SuperHOC } from '../../../HOC';
import 'sass/elements/sweet-alerts.scss';
import Button from '@material-ui/core/Button';
import { Grid, CircularProgress } from '@material-ui/core';
import ScrollArea from 'react-scrollbar'
import './style.scss'
import GMap from './basic'
import SocketComponent from 'components/WebSocket';
import Dialog from '@material-ui/core/Dialog';
import { Manager } from '../../../StorageManager/Storage';
import DashboardVehicleFeature from 'components/Dashboard/DashboardScreen/DashboardVehicleFeature';
import DashboardVehiclePieChart from 'components/Dashboard/DashboardScreen/DashboardVehiclePieChart';

class DashboardScreen extends Component {

  constructor(props) {
    super(props);
  }

  state = {
    email: "",
    hash: "",
    companyEmail: "",
    loading: false,
    vehiclesData: [],
    deviceIds: [],
    mapObject: new Map(),
  }

  componentDidUpdate(prevProps) {
    if (this.props.timeout !== prevProps.timeout) {
      if (this.props.timeout === true) {
        this.setState({ loading: false })
      }
    }
  }

  componentWillUnmount = () => {
    //this.socketComponent.disconnectSocketServer();
  }

  componentDidMount = () => {
    this.getMyEmail();
  }

  getMyEmail = async () => {
    let user = await Manager.getItem('user', true);
    this.setState({ email: user.email, companyEmail: user.companyEmail, hash: user.hash }, () => this.getAllMyVehicles());
  }

  recieveData = (deviceId, engineStatus, Lat, Lng, gpsSpeed, obdSpeed, carTemprature, fuelReading, rpm) => {
    let mapObject = this.state.mapObject;
    mapObject.set(
      deviceId,
      [deviceId, engineStatus, Lat, Lng, gpsSpeed, obdSpeed, carTemprature, fuelReading, rpm]
    );
    this.setState({ mapObject }, () => {
      // console.log('MapData: ', this.state.mapObject);
    });
  }

  getAllMyVehicles = () => {
    let body = {
      companyEmail: this.state.companyEmail
    }
    this.props.apiManager.makeCall('viewCars', body, res => {
      // console.log("all my vehicles: ", res);
      if (res.code === 1019) {
        this.setState({ vehiclesData: res.response, loading: false }, () => {
          let devices = [];
          this.state.vehiclesData.map((item) => {
            devices.push("" + item.deviceID);
          });
          this.setState({ deviceIds: devices }, () => {
            this.socketComponent = new SocketComponent();
            //this.socketComponent.connectSocketServer(this.state.hash, this.state.deviceIds, this.recieveData);
          });
        });
      }
      else {
        this.setState({ loading: false });
        toast.error(res.id);
      }
    }, false)
  }

  renderLoading = () => {
    return (
      <Dialog
        open={this.state.loading}
        PaperProps={{
          style: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
            padding: 10
          },
        }}>
        <CircularProgress className="text-dark" />
      </Dialog>
    )
  }

  render() {
    return (
      <Fragment>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <GMap
              data={[...this.state.mapObject]}
            />
          </Grid>
        </Grid>
        {this.renderLoading()}
      </Fragment >
    )
  }
}

DashboardScreen.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default SuperHOC((withConnect)(DashboardScreen));