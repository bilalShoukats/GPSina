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
      healthCheck: "",
      vehicleTemperature: "",
      vehicleVoltage: ""
    }
  }

  componentDidMount = () => {
    this.setState({ healthCheck: "OK", vehicleTemperature: "89", vehicleVoltage: "14.2" })
  }

  render() {
    return (
      <Grid className="vehicleDetailFeature">
        <Grid className="bsVehicleDetailItem">
          <Grid className="content">
            <label>Engine</label>
            <p>Health Check: {this.state.healthCheck}</p>
            <p>Temperature: {this.state.vehicleTemperature} C</p>
            <p>Voltage: {this.state.vehicleVoltage} V</p>
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