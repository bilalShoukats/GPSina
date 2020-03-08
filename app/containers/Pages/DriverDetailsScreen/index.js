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
import ConfirmModal from './ConfirmModal';
import SocketComponent from '../../../components/WebSocket';
import Dialog from '@material-ui/core/Dialog';
import { Manager } from '../../../StorageManager/Storage';
import BarChart from './barchart'
import Bar from './bar'
import DistanceDriven from './distanceDriven'
import WeeklyProfile from './weeklyProfile'
import { response } from './data'
import { hoursDriven } from './hoursDriven'
// const searchingFor = search => drivers => drivers.companyName.toLowerCase().includes(search.toLowerCase()) || !search;
class ChatApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyIdsSet: "",
      email: "",
      hash: "",
      companyEmail: "",
      value: 0,
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
      mapObject: new Map(),
      drivers: [],
      selectedIndex: 1,
      dailyProfileData: [],
      hoursDrivenData: [],
      weeklyProfileData: [],
      distanceDrivenData: [],
    }
  }

  barItems = [];

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
    let harshData = [];
    let hoursGraphData = [];
    response.map((item) => {
      let newObject = [];
      newObject[0] = item.accX;
      newObject[1] = item.accY;
      harshData.push(newObject);
    });
    hoursDriven.map((item) => {
      let newObject = [];
      newObject[0] = item.accX;
      newObject[1] = item.accY;
      hoursGraphData.push(newObject);
    });
    this.setState({ dailyProfileData: harshData, hoursDrivenData: hoursGraphData }, () => {
      console.log("hours driven data: ", this.state.hoursDrivenData);
      this.barItems = [{
        class: <BarChart data={this.state.dailyProfileData}
        />, key: 0
      }, { class: <Bar data={this.state.hoursDrivenData} />, key: 1 }, { class: <WeeklyProfile />, key: 2 }, { class: <DistanceDriven />, key: 3 }, { class: <GMap data={[...this.state.mapObject.values()]} />, key: 4 }]
    });
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
    this.props.apiManager.makeCall('viewDrivers', body, res => {
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
        <h2 className="breadcumbTitle">Fleet Utilization</h2>
        <Grid className="chatApp">
          <Grid className="chatAppLeft">
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
                    this.setState({ driverID: item.driverID })
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
          <Grid className="cchatAppRight">
            <Grid style={{ display: 'flex', flex: 1, flexDirection: 'row', marginBottom: '15px', overflowY: 'hidden', overflowX: 'scroll', backgroundColor: 'white' }}>
              {this.barItems.map((item, index) => {
                console.log('bawaaaaa-', item)
                return (
                  <Grid style={{ display: 'flex', flex: 1, height: '160px', padding: 5, cursor: 'pointer', boxShadow: '2px 3px 2px #d0d0d0', minWidth: '200px', margin: 5 }} key={item.key}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      this.setState({ selectedIndex: item.key })
                    }}
                  >
                    {item.class}
                  </Grid>
                )
              })}
            </Grid>
            <Grid style={{ height: '430px' }}>
              {
                this.barItems.length > 0 && this.barItems[this.state.selectedIndex].class
              }
            </Grid>
            {/* <GMap
              data={[...this.state.mapObject.values()]}
            /> */}
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

