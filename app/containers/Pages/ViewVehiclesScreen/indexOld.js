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
import ConfirmModal from './ConfirmModal';
import SocketComponent from '../../../components/WebSocket';
import Dialog from '@material-ui/core/Dialog';
import { Manager } from '../../../StorageManager/Storage';
import { toast } from 'react-toastify';

// const searchingFor = search => companies => companies.companyName.toLowerCase().includes(search.toLowerCase()) || !search;

class ChatApp extends Component {
  state = {
    companyIdsSet: "",
    email: "",
    hash: "",
    companyEmail: "",
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
    mapObject: new Map()
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
        this.setState({ companies: this.state.companies.concat(res.response), currentPage: res.currentPage, totalPages: res.totalPages, loading: false }, () => {
          let companyIdSet = [];
          this.state.companies.map((item, index) => {
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

  handleInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  getMyEmail = async () => {
    let user = await Manager.getItem('user', true);
    this.setState({ email: user.email, companyEmail: user.companyEmail, hash: user.hash }, () => this.getAllMyVehicles());
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
    console.log('data of map', [...this.state.mapObject.values()])
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
              {this.state.companies.map((item, index) => {
                console.log('kasdlkj', item)
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
                      }} xl={6} className='btn bg-dark'>
                        <i className="icofont-ui-edit" />
                      </Button>
                      <Button disabled={item.deviceActive !== false ? false : true} onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        this.openNotificationsModal(item)
                      }} xl={6} className='btn bg-primary' >
                        <i className="icofont-notification" />
                      </Button>
                      <Button disabled={item.deviceActive !== false ? false : true} onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        this.openConfirmModal(item)
                      }} xl={6} className='btn bg-danger'>
                        <i className="icofont-ui-delete" />
                      </Button>
                      <Button disabled={item.deviceActive !== false ? false : true} onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }} disabled={true} xl={6} className='btn bg-secondary' >
                        <i className="icofont-jail" />
                      </Button>

                      <Button disabled={item.deviceActive !== false ? false : true} onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        this.openAssignDriverModal(item)
                      }} xl={6} className='btn bg-info' >
                        <i className="icofont-ui-user" />
                      </Button>
                    </Grid>
                  </Grid>
                )
              })}
              {
                (this.state.companies[0]) ? (
                  <Grid className="buttonGrid" style={{ marginTop: 20 }}>
                    {(this.state.currentPage < this.state.totalPages) ? (
                      <ul>
                        <li><Button className="btn bg-default btn-radius" onClick={this.loadMoreHandler}>Load More</Button></li>
                      </ul>
                    ) : (
                        <ul>
                          <li><div className="btn bg-default btn-radius">You have seen it all!</div></li>
                        </ul>
                      )}
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
        <NotificationsModal
          open={this.state.showNotificationsModal}
          close={() => this.setState({ showNotificationsModal: false })}
          carID={this.state.carID}
          {...this.props}
        />
        <ConfirmModal
          open={this.state.showConfirmModal}
          close={() => this.setState({ showConfirmModal: false })}
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