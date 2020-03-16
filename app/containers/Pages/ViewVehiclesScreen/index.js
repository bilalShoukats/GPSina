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
import SettingsModal from './SettingsModal';
import NotificationsModal from './NotificationsModal';
import AssignDriverModal from './AssignDriverModal';
import AttachDeviceModal from './AttachDeviceModal';
import ConfirmModal from './ConfirmModal';
import SocketComponent from '../../../components/WebSocket';
import Dialog from '@material-ui/core/Dialog';
import { Manager } from '../../../StorageManager/Storage';
import { toast } from 'react-toastify';

// const searchingFor = search => vehicles => vehicles.companyName.toLowerCase().includes(search.toLowerCase()) || !search;

class ChatApp extends Component {
  state = {
    companyIdsSet: "",
    email: "",
    hash: "",
    companyEmail: "",
    value: 0,
    vehicles: [],
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
    showAttahDeviceModal: false,
    mapObject: new Map(),
    showAttachDeviceModal:false
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
        this.getAllMyVehicles();
      })
    }
  }

  getAllMyVehicles = () => {
    let body = {
      page: this.state.currentPage,
      companyEmail: this.state.companyEmail
    }
    this.props.apiManager.makeCall('getPendingCarsActive', body, res => {
      console.log('get cars - v', res)
      console.log('get cars - v', body)
      if (res.code === 1019) {
        this.setState({ vehicles: this.state.vehicles.concat(res.response), currentPage: res.currentPage, totalPages: res.totalPages, loading: false }, () => {
          let companyIdSet = [];
          this.state.vehicles.map((item, index) => {
            companyIdSet.push("" + item.deviceID);
          });
          this.setState({ companyIdSet }, () => {
            this.socketComponent.connectSocketServer(this.state.hash, this.state.companyIdSet, this.recieveData);
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
    let user = await Manager.getItem('user', true);
    this.setState({ email: user.email, companyEmail: user.companyEmail, hash: user.hash }, () => this.getAllMyVehicles());
  }

  openSettingsModal = (item) => {
    this.setState({ carID: item.carID, showSettingsModal: true })
  }
  openConfirmModal = (item) => {
    this.setState({ carID: item.carID, registrationNo: item.registrationNo, showConfirmModal: true })
  }
  openNotificationsModal = (item) => {
    this.setState({ carID: item.carID, showNotificationsModal: true })
  }
  openAssignDriverModal = (item) => {
    this.setState({ carID: item.carID, registrationNo: item.registrationNo, showAssignDriverModal: true })
  }
  openAttachDeviceModal = (item) => {
    this.setState({ registrationNo: item.registrationNo, showAttachDeviceModal: true })
  }

  close = () => {
    this.setState({ showConfirmModal: false, showNotificationsModal: false, showAttachDeviceModal: false, showAssignDriverModal: false, showSettingsModal: false, vehicles: [] }, () => this.getAllMyVehicles())
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
        <h2 className="breadcumbTitle">Your Vehicles</h2>
        <Grid className="chatAppp">
          <Grid className="chatAppLeftt">
            <ScrollArea
              speed={1}
              className="chatScrollBarr"
              contentClassName='chatScrollBarContentt'
              horizontal={false}
            >
              {this.state.vehicles.map((item, index) => {
                return (
                  <Grid key={index} className='itemContainerr'
                    style={{ background: item.deviceActive !== false ? '' : 'rgba(211,211,215,.9)' }}
                    onClick={() => {
                      if (item.deviceActive !== false) {
                        this.socketComponent.disconnectSocketServer()
                        this.props.history.push(`/vehicleMap/${item.deviceID}`)
                      }
                      else toast.error('Car is in pending status')
                    }}>
                    <Grid style={{ display: 'flex', width: '100%', justifyContent: 'space-between', padding: '10px 20px 0px 20px', }}>
                      <h4>{item.carOwnerName}</h4>
                      <p style={{ color: 'red' }}>{item.deviceActive !== false ? "" : 'Pending'}</p>
                      <p>{item.registrationNo}</p>
                    </Grid>
                    <Grid style={{ display: 'flex', width: '100%', justifyContent: 'space-around', marginTop: 'auto' }}>
                      <Button disabled={item.deviceActive !== false ? false : true} onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        this.openSettingsModal(item)
                      }} xl={6} className='btn bg-dark tooltipWrap topTooltip'>
                        <i className="icofont-ui-edit" />
                        <span className="tooltip">Edit Vehicle</span>
                      </Button>
                      <Button disabled={item.deviceActive !== false ? false : true} onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        this.openNotificationsModal(item)
                      }} xl={6} className='btn bg-primary tooltipWrap topTooltip' >
                        <i className="icofont-notification" />
                        <span className="tooltip">Notifications</span>
                      </Button>
                      <Button disabled={item.deviceActive !== false ? false : true} onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        this.openConfirmModal(item)
                      }} xl={6} className='btn bg-danger tooltipWrap topTooltip'>
                        <i className="icofont-ui-delete" />
                        <span className="tooltip">Delete</span>
                      </Button>
                      <Button disabled={item.deviceActive !== false ? false : true} onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        this.openAttachDeviceModal(item)
                      }} xl={6} className='btn bg-secondary tooltipWrap topTooltip' >
                        <i className="icofont-thunder-light" />
                        <span className="tooltip">Attach Device</span>
                      </Button>
                      <Button disabled={item.deviceActive !== false ? false : true} onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        this.openAssignDriverModal(item)
                      }} xl={6} className='btn bg-info tooltipWrap topTooltip' >
                        <i className="icofont-ui-user" />
                        <span className="tooltip">Assign Driver</span>
                      </Button>
                    </Grid>
                  </Grid>
                )
              })}
              {
                (this.state.vehicles[0]) ? (
                  <Grid className="buttonGrid" style={{ marginTop: 20 }}>
                    {(this.state.currentPage < this.state.totalPages) ? (
                      <ul>
                        <li><Button className="btn bg-default btn-radius" onClick={this.loadMoreHandler}>Load More</Button></li>
                      </ul>
                    ) : null}
                  </Grid>) : null
              }
            </ScrollArea>
          </Grid>
          <Grid className="chatAppRightt">
            <GMap
              data={[...this.state.mapObject.values()]}
            />
          </Grid>
        </Grid>
        <SettingsModal
          open={this.state.showSettingsModal}
          close={() => this.setState({ showSettingsModal: false })}
          carID={this.state.carID}
          {...this.props}
        />
        <AssignDriverModal
          open={this.state.showAssignDriverModal}
          close={() => this.setState({ showAssignDriverModal: false })}
          carID={this.state.carID}
          registrationNo={this.state.registrationNo}
          history={this.props.history}
          {...this.props}
        />
        <AttachDeviceModal
          open={this.state.showAttachDeviceModal}
          close={() => this.setState({ showAttachDeviceModal: false })}
          registrationNo={this.state.registrationNo}
          {...this.props}
        />
        <NotificationsModal
          open={this.state.showNotificationsModal}
          close={() => this.setState({ showNotificationsModal: false })}
          carID={this.state.carID}
          {...this.props}
        />
        <ConfirmModal
          open={this.state.showConfirmModal}
          close={this.close}
          registrationNo={this.state.registrationNo}
          history={this.props.history}
          getAllMyVehicles={this.getAllMyVehicles}
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
