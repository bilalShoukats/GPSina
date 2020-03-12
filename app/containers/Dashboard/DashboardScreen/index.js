import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SuperHOC } from '../../../HOC';
import 'sass/elements/sweet-alerts.scss';
import Button from '@material-ui/core/Button';
import { Grid, CircularProgress } from '@material-ui/core';
import ScrollArea from 'react-scrollbar'
import './style.scss'
import GMap from './mapHead'
import SocketComponent from '../../../components/WebSocket';
import Dialog from '@material-ui/core/Dialog';
import { Manager } from '../../../StorageManager/Storage';

class DashboardScreen extends Component {
  state = {
    email: "",
    hash: "",
    companyEmail: "",
    companyVehicles: [],
    loading: false,
    mapObject: new Map(),
    devicesData: [],
    deviceId: 0,
    engineStatus: false,
    Lat: 12,
    Lng: 12,
    gpsSpeed: 12,
    obdSpeed: 12,
    carTemperature: 12,
    fuelReading: 12,
    rpm: 12,
  }

  vehicleDetails= [];

  componentDidUpdate(prevProps) {
    if (this.props.timeout !== prevProps.timeout) {
      if (this.props.timeout === true) {
        this.setState({ loading: false })
      }
    }
  }

  componentWillUnmount() {
    this.socketComponent.disconnectSocketServer();
  }

  recieveData = (deviceId, engineStatus, Lat, Lng, gpsSpeed, obdSpeed, carTemperature, fuelReading, rpm) => {
    console.log("Index", deviceId)
    let data = {
      deviceId, engineStatus, Lat, Lng, gpsSpeed, obdSpeed, carTemperature, fuelReading, rpm
    }
    this.mainMap(data, this.state.vehicleDetails);
  }

  componentDidMount = () => {
    this.socketComponent = new SocketComponent();
    Manager.getItemCallback('user', true, (user) => {
      console.log('User:', user)
      this.setState({ email: user.email, companyEmail: user.companyEmail, hash: user.hash });
      let body = {
        companyEmail: user.companyEmail
      }
      this.props.apiManager.makeCall('viewCars', body, (res) => {
        if (res.code === 1019) {
          this.state.vehicleDetails = res.response;
          let companyVehicleIDs = [];
          console.log("response", res)
          res.response.forEach((item) => {
            companyVehicleIDs.push(item.deviceID.toString());
          });
          this.socketComponent.connectSocketServer(this.state.hash, companyVehicleIDs, this.recieveData);
        } else {
          this.setState({ loading: false });
          toast.error(res.id);
        }
      });
    });

    // this.getMyEmail();
  }

  getAllMyVehicles = () => {
    let body = {
      companyEmail: this.state.companyEmail
    }
    this.props.apiManager.makeCall('viewCars', body, res => {
      if (res.code === 1019) {
        this.setState({ companyVehicles: this.state.companyVehicles.concat(res.response), loading: false }, () => {
          let companyVehicleIDs = [];
          this.state.companyVehicles.map((item, index) => {
            companyVehicleIDs.push("" + item.deviceID);
          });
          this.setState({ companyVehicleIDs }, () => {
            setTimeout(() => {

            }, 2000);
          });
        });
      }
      else {
        this.setState({ loading: false });
        toast.error(res.id);
      }
    }, false)
  }

  getMyEmail = async () => {

    //, () => this.getAllMyVehicles());
  }

  renderLoading = () => {
    return (
      <Dialog
        open={this.state.loading}
        // onClose={this.state.loading}
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
        <h2 className="breadcumbTitle">Dashboard</h2>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <GMap
              show={r => this.mainMap = r}
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