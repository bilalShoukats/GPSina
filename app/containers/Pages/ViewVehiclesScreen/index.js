import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SuperHOC } from '../../../HOC';
import 'sass/elements/sweet-alerts.scss';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core'
import ScrollArea from 'react-scrollbar'
import './style.scss'
import GMap from './basic'
import SettingsModal from './SettingsModal';
import NotificationsModal from './NotificationsModal';
import AssignDriverModal from './AssignDriverModal';
import ConfirmModal from './ConfirmModal';
import SocketComponent from '../../../components/WebSocket';
import { Manager } from '../../../StorageManager/Storage';

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

  componentDidMount = () => {
    this.socketComponent = new SocketComponent(this.recieveData);
    this.getMyEmail();
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
    this.props.apiManager.makeCall('viewCars', body, res => {
      console.log('get cars - v', res)
      console.log('get cars - v', body)
      if (res.code === 1019) {
        this.setState({ companies: this.state.companies.concat(res.response), currentPage: res.currentPage, totalPages: res.totalPages, loading: false }, () => {
          let companyIdSet = [];
          this.state.companies.map((item, index) => {
            companyIdSet.push("" + item.deviceID);
          });
          this.setState({ companyIdSet }, () => {
            this.socketComponent.connectSocketServer(this.state.hash, this.state.companyIdSet);
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
  render() {
    console.log("Vehicle Render: ", [...this.state.mapObject.values()]);
    console.log("Companies Data: ",this.state.companies);
    return (
      <Fragment>
        <h2 className="breadcumbTitle">Your Vehicles</h2>
        <Grid className="chatApp">
          <Grid className="chatAppLeft">
            <ScrollArea
              speed={1}
              className="chatScrollBar"
              contentClassName='chatScrollBarContent'
              horizontal={false}
            >
              {this.state.companies.map((item, index) => {
                return (
                  <Grid key={index} className='itemContainer' onClick={() => {
                    this.socketComponent.disconnectSocketServer();
                    this.props.history.push(`/vehicleMap/${item.deviceID}`)
                  }}>
                    <Grid style={{ display: 'flex', width: '100%', justifyContent: 'space-between', padding: '10px 20px 0px 20px', }}>
                      <h4>{item.carOwnerName}</h4>
                      <p>{item.registrationNo}</p>
                    </Grid>
                    <Grid style={{ display: 'flex', width: '100%', justifyContent: 'space-around', marginTop: 'auto' }}>
                      <Button onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        this.openSettingsModal(item)
                      }} xl={6} className='btn bg-dark'>
                        <i className="icofont-ui-settings" />
                      </Button>
                      <Button onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        this.openNotificationsModal(item)
                      }} xl={6} className='btn bg-primary' >
                        <i className="icofont-notification" />
                      </Button>
                      <Button onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        this.openConfirmModal(item)
                      }} xl={6} className='btn bg-danger'>
                        <i className="icofont-ui-delete" />
                      </Button>
                      <Button onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }} disabled={true} xl={6} className='btn bg-secondary' >
                        <i className="icofont-jail" />
                      </Button>
                      <Button onClick={(e) => {
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
          <Grid className="chatAppRight">
            <GMap
              data={[...this.state.mapObject.values()]}
            />
          </Grid>
        </Grid>
        <SettingsModal
          open={this.state.showSettingsModal}
          close={() => this.setState({ showSettingsModal: false })}
          carID={this.state.carID}
        />
        <AssignDriverModal
          open={this.state.showAssignDriverModal}
          close={() => this.setState({ showAssignDriverModal: false })}
          carID={this.state.carID}
          registrationNo={this.state.registrationNo}
          history={this.props.history}
        />
        <NotificationsModal
          open={this.state.showNotificationsModal}
          close={() => this.setState({ showNotificationsModal: false })}
          carID={this.state.carID}
        />
        <ConfirmModal
          open={this.state.showConfirmModal}
          close={() => this.setState({ showConfirmModal: false })}
          registrationNo={this.state.registrationNo}
          history={this.props.history}
        />
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
