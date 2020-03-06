import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SuperHOC } from '../../../HOC';
import 'sass/elements/sweet-alerts.scss';
import { Grid } from '@material-ui/core'
import './style.scss'
import GMap from './basic'
import SocketComponent from '../../../components/WebSocket';
import { Manager } from '../../../StorageManager/Storage';
// const searchingFor = search => companies => companies.companyName.toLowerCase().includes(search.toLowerCase()) || !search;

class ChatApp extends Component {
  state = {
    email: "",
    value: 0,
    hash: "",
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
    deviceId: 0,
    mapObject: new Map(),
    mapii: [[123, 123, 18.558908, -68.389916]]
  }

  recieveData = (deviceId, engineStatus, Lat, Lng) => {
    let mapObject = this.state.mapObject;
    mapObject.set(
      deviceId,
      [deviceId, engineStatus, Lat[0], Lng[0]]
    );
    this.setState({ mapObject }, () => {
      console.log('MapData: ', this.state.mapObject);
    });
  }

  getMyUserData = async () => {
    let user = await Manager.getItem('user', true);
    this.setState({ hash: user.hash }, () => {
      this.socketComponent = new SocketComponent();
      this.socketComponent.connectSocketServer(this.state.hash, ["" + this.state.deviceId], this.recieveData);
    });
  }

  componentDidMount = () => {
    this.getMyUserData();
    this.setState({ deviceId: this.props.match.params.registrationNo });
    // this.socketComponent.connectSocketServer(this.state.hash, this.state.companyIdSet);
    // setInterval(() => {
    //   this.move();
    // }, 5000);
  }

  componentWillUnmount = () => {
    this.socketComponent.disconnectSocketServer();
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
    let mapii = this.state.mapii;
    mapii.forEach(single => {
      single[2] += 0.001
    });
    this.setState({ mapii });
  }

  handleInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  addRouteApi = (data) => {
    console.log("request to add route: ", data);
  }

  render() {
    console.log('data of mapppp', this.state.mapObject)
    return (
      <Fragment>
        <h2 className="breadcumbTitle">Device Map</h2>
        <Grid className="chatApp">
          <Grid style={{ width: '100%', height: '100%' }}>
            <GMap
              // data={[...this.state.mapObject]}
              data={this.state.mapii}
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
