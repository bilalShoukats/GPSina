import React, { Fragment, Component } from 'react';
import Grid from "@material-ui/core/Grid";
import './style.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SuperHOC } from '../../../../HOC';

class DashboardVehicleEngineInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      engineStatus: "",
      carTemperature: "",
      rpm: ""
    }
  }

  componentDidMount = () => {
    this.setState({ engineStatus: "OK", carTemperature: "89", rpm: "14.2" })
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.data) {
      nextProps.data.forEach((item) => {
        if (item.deviceId == nextProps.selectedDeviceId) {
          this.setState({ carTemperature: Math.floor(item.carTemperature), engineStatus: item.engineStatus, rpm: Math.floor(item.rpm) });
        }
      })
    }
  }

  render() {
    return (
      <Grid className="vehicleDetailFeature">
        <Grid className="bsVehicleDetailItem">
          <Grid className="content">
            <label style={{ color: "#FFFFFF"}}>Engine</label>
            <p>Status: {this.state.engineStatus ? "On" : "Off"}</p>
            <p>Temperature: {this.state.carTemperature}</p>
            <p>RPM: {this.state.rpm}</p>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}


DashboardVehicleEngineInfo.propTypes = {
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

export default SuperHOC((withConnect)(DashboardVehicleEngineInfo));