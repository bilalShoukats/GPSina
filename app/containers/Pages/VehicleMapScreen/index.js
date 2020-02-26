import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SuperHOC } from '../../../HOC';
import 'sass/elements/sweet-alerts.scss';
import { Grid } from '@material-ui/core'
import './style.scss'
import Map from './basic'

// const searchingFor = search => companies => companies.companyName.toLowerCase().includes(search.toLowerCase()) || !search;

class ChatApp extends Component {
  state = {
    email: "",
    value: 0,
    companies: [],
    loading: true,
    vibrateNotification: false,
    overSpeed: false,
    acc: false,
    currentPage: 1,
    totalPages: 0,
    itemsInPage: 10,
    showSettingsModal: false,
    showNotificationsModal: false,
    showAssignDriverModal: false,
    showConfirmModal: false,
    carID: '',
    registrationNo: '',
    mapData: [
      { "id": 1, "longitude": -95, "latitude": 29.5 },
    ],
    mapInitialData: [
      { "id": 1, "longitude": -95, "latitude": 29.5 },
    ]
  
  }

  componentDidMount = () => {
    // setInterval(() => {
    //   this.move();
    // }, 500);
  }



  loadMoreHandler = () => {
    if (this.state.currentPage < this.state.totalPages) {
      this.setState({ currentPage: this.state.currentPage + 1 }, () => {
        console.log(this.state.currentPage);
        this.getAllMyCompanies();
      })
    }
  }
  move = () => {
    let mapData = this.state.mapData;
    mapData.forEach(single => {
      single.latitude += 0.0001
    });
    this.setState({ mapData });
  }

  handleInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };
  addRouteApi = (data) => {
    console.log("request to add route: ", data);

  }
  render() {

    return (
      <Fragment>
        <h2 className="breadcumbTitle">MAP</h2>
        <Grid className="chatApp">
          <Grid style={{ width: '100%', height: '100%' }}>
            <Map
              data={this.state.mapData}
              initialData={this.state.mapInitialData}
            />
          </Grid>
        </Grid>
      </Fragment >
    )
  }
}

ChatApp.propTypes = {
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

export default SuperHOC((withConnect)(ChatApp));
