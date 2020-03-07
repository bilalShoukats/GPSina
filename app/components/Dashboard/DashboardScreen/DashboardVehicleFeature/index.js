import React, { Fragment, Component } from 'react';
import Grid from "@material-ui/core/Grid";
import './style.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SuperHOC } from '../../../../HOC';

class DashboardVehicleFeature extends Component {

  constructor(props) {
    super(props);
    this.state = {
      vehicleFeatures: [
        { key: "Temperature", value: "23 C" },
        { key: "Engine Status", value: "On" },
        { key: "Speed", value: "47 Km/h" },
        { key: "Vehicle Trips", value: "12" }
      ],
    }
  }

  componentDidMount = () => {

  }

  render() {
    return (
      <Grid className="vehicleDetailFeature">

        <Grid className="bsVehicleDetailItem">
          <Grid className="icon">
            <i className="fa fa-thermometer-half"></i>
          </Grid>
          <Grid className="content">
            <h2>{this.state.vehicleFeatures[0].value}</h2>
            <p>{this.state.vehicleFeatures[0].key}</p>
          </Grid>
        </Grid>

        <Grid className="bsVehicleDetailItem">
          <Grid className="icon">
            <i className="fa fa-power-off"></i>
          </Grid>
          <Grid className="content">
            <h2>{this.state.vehicleFeatures[1].value}</h2>
            <p>{this.state.vehicleFeatures[1].key}</p>
          </Grid>
        </Grid>

        <Grid className="bsVehicleDetailItem">
          <Grid className="icon">
            <i className="fa fa-tachometer"></i>
          </Grid>
          <Grid className="content">
            <h2>{this.state.vehicleFeatures[2].value}</h2>
            <p>{this.state.vehicleFeatures[2].key}</p>
          </Grid>
        </Grid>

        <Grid className="bsVehicleDetailItem">
          <Grid className="icon">
            <i className="fa fa-car"></i>
          </Grid>
          <Grid className="content">
            <h2>{this.state.vehicleFeatures[3].value}</h2>
            <p>{this.state.vehicleFeatures[3].key}</p>
          </Grid>
        </Grid>

      </Grid>
    )
  }
}


DashboardVehicleFeature.propTypes = {
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

export default SuperHOC((withConnect)(DashboardVehicleFeature));
