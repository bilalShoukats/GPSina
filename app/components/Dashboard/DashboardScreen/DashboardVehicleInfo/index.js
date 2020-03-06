import React, { Fragment, Component } from 'react';
import Grid from "@material-ui/core/Grid";
import './style.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SuperHOC } from '../../../../HOC';

class DashboardVehicleInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      vehicleName: "",
      driverName: "",
      registrationNo: ""
    }
  }

  componentDidMount = () => {
    this.setState({ vehicleName: "Honda Civic", driverName: "Ali Ahmed", registrationNo: "LER-6383" })
  }

  render() {
    return (
      <Grid className="vehicleDetailFeature">
        <Grid className="bsVehicleDetailItem">
          <Grid className="content">
            <p>{this.state.vehicleName}</p>
            <p>{this.state.driverName}</p>
            <p>{this.state.registrationNo}</p>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}


DashboardVehicleInfo.propTypes = {
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

export default SuperHOC((withConnect)(DashboardVehicleInfo));