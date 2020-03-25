import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SuperHOC } from '../../../HOC';
import 'sass/elements/sweet-alerts.scss';
import { Grid, CircularProgress } from '@material-ui/core';
import './style.scss'
import GMap from './mapHead'
import SocketComponent from '../../../components/WebSocket';
import Dialog from '@material-ui/core/Dialog';
import { Manager } from '../../../StorageManager/Storage';
import { toast } from 'react-toastify';

class DashboardScreen extends Component {
  state = {
    loading: true,
    devicesData: [],
  }

  vehicleDetails = [];

  /**
        * Checking timeout of the api request and removing loader on timeout request.
        */
  componentDidUpdate(prevProps) {
    if (this.props.timeout !== prevProps.timeout) {
      if (this.props.timeout === true) {
        this.setState({ loading: false })
      }
    }
  }

  /**
        * Removing websocket connection on screen change.
        */
  componentWillUnmount() {
    this.socketComponent.disconnectSocketServer();
  }

  /**
        * Call back function of websocket to receive vehicle data, passing prop to dashboard map HOC.
        * @param deviceId number.
        * @param engineStatus status of engine false or true.
        * @param Lat lattitude of the vehicle.
        * @param Lng longtitude of the vehicle.
        * @param gpsSpeed gps speed of the vehicle.
        * @param obdSpeed obd speed of the vehicle.
        * @param carTemperature car temperature of the vehicle.
        * @param fuelReading fuel reading of the vehicle.
        * @param rpm rpm of the vehicle.
        */
  recieveData = (deviceId, engineStatus, Lat, Lng, gpsSpeed, obdSpeed, carTemperature, fuelReading, rpm) => {
    console.log("Index", deviceId)
    let data = {
      deviceId, engineStatus, Lat, Lng, gpsSpeed, obdSpeed, carTemperature, fuelReading, rpm
    }
    try{
      this.mainMap(data, this.state.vehicleDetails);
    }
    catch (e)
    {
      console.log("dashboard screen render not called yet");
    }
  }

  /**
        * fetching user data and calling api to get all vehicles data and passing vehicle Ids to websocket.
        */
  componentDidMount = () => {
    console.log('userrr',this.props.user)
    this.socketComponent = new SocketComponent();
    Manager.getItemCallback('user', true, (user) => {
      let body = {
        companyEmail: user.companyEmail
      }
      this.props.apiManager.makeCall('viewCars', body, (res) => {
        this.setState({ loading: false });
        if (res.code === 1019) {
          this.state.vehicleDetails = res.response;
          let companyVehicleIDs = [];
          res.response.forEach((item) => {
            companyVehicleIDs.push(item.deviceID.toString());
          });
          this.socketComponent.connectSocketServer(user.hash, companyVehicleIDs, this.recieveData);
        } else {
          toast.error(res.id);
        }
      });
    });
  }

  /**
        * rendering loader before calling vehicle api
        */
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

  /**
        * rendering all the screen components
        */
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