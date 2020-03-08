import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SuperHOC } from '../../../HOC';
import 'sass/elements/sweet-alerts.scss';
import { Grid, CircularProgress } from '@material-ui/core';
import ScrollArea from 'react-scrollbar'
import './style.scss'
import ConfirmModal from './ConfirmModal';
import SocketComponent from '../../../components/WebSocket';
import Dialog from '@material-ui/core/Dialog';
import { Manager } from '../../../StorageManager/Storage';
import Button from '@material-ui/core/Button';
// const searchingFor = search => drivers => drivers.companyName.toLowerCase().includes(search.toLowerCase()) || !search;
class ChatApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      currentPage: 1,
      totalPages: 0,
      itemsInPage: 10,
      routes: [],
      carID: '',
      registrationNo: '',
      mapObject: new Map(),
      drivers: [],
      selectedIndex: 1,
      tripid: '',
      deviceID: '',
      viewLess: true,
    }
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

  componentDidUpdate(prevProps) {
    if (this.props.timeout !== prevProps.timeout) {
      if (this.props.timeout === true) {
        this.setState({ loading: false })
      }
    }
  }

  componentDidMount = () => {
    this.socketComponent = new SocketComponent();
    this.getMyEmail();
  }

  componentWillUnmount = () => {
    this.socketComponent.disconnectSocketServer();
  }

  loadMoreHandler = () => {
    if (this.state.currentPage < this.state.totalPages) {
      this.setState({ currentPage: this.state.currentPage + 1 }, () => {
        console.log(this.state.currentPage);
        this.getAllDrivers();
      })
    }
  }
  getAllDrivers = () => {
    let body = {
      page: this.state.currentPage,
      companyEmail: this.props.user.companyEmail
      // companyEmail:this.state.email
    }
    this.props.apiManager.makeCall('getCarDriverDetails', body, res => {
      console.log('View Drivers - ', res)
      if (res) {
        this.setState({ drivers: [] }, () => {
          this.setState({ drivers: this.state.drivers.concat(res.response), currentPage: res.currentPage, totalPages: res.totalPages, loading: false });
        })
      }
      else {
        this.setState({ loading: false });
        toast.error(res.id);
      }
    })
  }
  getAllRoutes = (item) => {
    console.log('routes show-', item)
    this.setState({ driverID: item.driverID, deviceID: item && item.AttachedCarInformation && item.AttachedCarInformation[0] ? item.AttachedCarInformation[0].deviceID : '' }, () => {
      let body = {
        // page: 1,
        // companyEmail: this.props.user.companyEmail,
        deviceid: this.state.deviceID.toString()
        // companyEmail:this.state.email
      }
      this.props.apiManager.makeCall('driverTripStats', body, res => {
        console.log('routes show-', body)
        console.log('routes show-', res)
        if (res) {
          this.setState({ routes: this.state.routes.concat(res.response), });
        }
        else {
          this.setState({ loading: false });
          toast.error(res.id);
        }
      })
    })
  }

  handleInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  getMyEmail = async () => {
    let user = await Manager.getItem('user', true);
    this.setState({ email: user.email, companyEmail: user.companyEmail, hash: user.hash }, () => this.getAllDrivers());
  }

  openSettingsModal = (item) => {
    this.setState({ carID: item.carID, showSettingsModal: true })
  }
  openConfirmModal = (item) => {
    this.setState({ carID: item.carID, showConfirmModal: true })
  }
  openNotificationsModal = (item) => {
    this.setState({ carID: item.carID, showNotificationsModal: true })
  }
  openAssignDriverModal = (item) => {
    this.setState({ carID: item.carID, registrationNo: item.registrationNo, showAssignDriverModal: true })
  }
  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.checked });
  };
  addRouteApi = (data) => {
    console.log("request to add route: ", data);

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
    console.log('bawaa item', this.state.selectedIndex)
    return (
      <Fragment >
        <h2 className="breadcumbTitle">Routes History</h2>
        <Grid className="chatApp">
          <Grid className="cchatAppLeft">
            <h5 className="headingText">Drivers List</h5>
            <ScrollArea
              speed={1}
              className="chatScrollBar"
              contentClassName='chatScrollBarContent'
              horizontal={false}
            >
              {this.state.drivers.length > 0 ? this.state.drivers.map((item, index) => {
                console.log('sate drivers-', item)
                return (
                  <Grid key={index} className={item.driverID === this.state.driverID ? 'selectedItemContainer' : 'itemContainer'} onClick={() => {
                    this.socketComponent.disconnectSocketServer();
                    this.getAllRoutes(item)
                  }}>
                    <Grid className='text'>
                      <h4>{item.driverName}</h4>
                      {/* <p>{item.driverEmail}</p> */}
                    </Grid>
                  </Grid>
                )
              }) : ''}
              {
                (this.state.drivers[0]) ? (
                  <Grid className="buttonGrid" style={{ marginTop: 20 }}>
                    {(this.state.currentPage < this.state.totalPages) ? (
                      <ul>
                        <li><Button className="btn bg-default btn-radius" onClick={this.loadMoreHandler}>Load More</Button></li>
                      </ul>
                    ) : (
                        <ul>
                          <li><div className="btn bg-default btn-radius" style={{ textAlign: 'center' }}>You have seen it all!</div></li>
                        </ul>
                      )}
                  </Grid>) : null
              }
            </ScrollArea>
          </Grid>
          <Grid className="cchatAppRightt">
            <h5 className="headingText">Routes List</h5>
            <ScrollArea
              speed={1}
              className="chatScrollBar"
              contentClassName='chatScrollBarContent'
              horizontal={false}
            >
              {this.state.routes.length > 0 && this.state.routes[0] !== undefined ? this.state.routes.map((item, index) => {
                console.log('sate driversss-', item)
                return (
                  this.state.viewLess ?
                    index < 5 ?
                      <Grid key={index} className={item.tripid === this.state.tripid ? 'selectedItemContainer' : 'itemContainer'} onClick={() => {
                        this.socketComponent.disconnectSocketServer();
                        this.setState({ tripid: item.tripid })
                      }}>
                        <Grid className='text'>
                          <h4>{item.tripid}</h4>
                          {/* <p>{item.driverEmail}</p> */}
                        </Grid>
                      </Grid>
                      : ''
                    :
                    <Grid key={index} className={item.tripid === this.state.tripid ? 'selectedItemContainer' : 'itemContainer'} onClick={() => {
                      this.socketComponent.disconnectSocketServer();
                      this.setState({ tripid: item.tripid })
                    }}>
                      <Grid className='text'>
                        <h4>{item.tripid}</h4>
                        {/* <p>{item.driverEmail}</p> */}
                      </Grid>
                    </Grid>
                )
              }) : ''}
              {this.state.routes.length > 5 ? <h6 style={{ color: 'rgb(224, 106, 66)', cursor: 'pointer', textAlign: 'center' }} onClick={() => this.setState({ viewLess: !this.state.viewLess })}>{this.state.viewLess ? 'View More' : 'View Less'}</h6> : ''}
              {
                (this.state.drivers[0]) ? (
                  <Grid className="buttonGrid" style={{ marginTop: 20 }}>
                    {(this.state.currentPage < this.state.totalPages) ? (
                      <ul>
                        <li><Button className="btn bg-default btn-radius" onClick={this.loadMoreHandler}>Load More</Button></li>
                      </ul>
                    ) : (
                        <ul>
                          <li><div className="btn bg-default btn-radius" style={{ textAlign: 'center' }}>You have seen it all!</div></li>
                        </ul>
                      )}
                  </Grid>) : null
              }
            </ScrollArea>
          </Grid>
          <Grid className="modalFooter">
            <Button style={{ padding: '10px 25px', }} disabled={this.state.tripid !== '' ? false : true} className="btn bg-default" onClick={() => this.props.history.push(`RouteMap/${this.state.tripid}`)}>
              See Route
              </Button>
          </Grid>
        </Grid>
        <ConfirmModal
          open={this.state.showConfirmModal}
          close={() => this.setState({ showConfirmModal: false })}
          registrationNo={this.state.registrationNo}
          history={this.props.history}
          getAllMyVehicles={this.getAllDrivers}
          {...this.props}
        />
        {this.renderLoading()}
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

