import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SuperHOC } from '../../../HOC';
import 'sass/elements/sweet-alerts.scss';
import Button from '@material-ui/core/Button';
import { Grid, CircularProgress } from '@material-ui/core';
import ScrollArea from 'react-scrollbar'
import './style.scss'
import Map from './basic'
import SettingsModal from './SettingsModal';
import NotificationsModal from './NotificationsModal';
import AssignDriverModal from './AssignDriverModal';
import ConfirmModal from './ConfirmModal';
import Dialog from '@material-ui/core/Dialog';

import { Manager } from '../../../StorageManager/Storage';

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
      { "id": 1, "longitude": -95.473728, "latitude": 30.200987 },
      { "id": 2, "longitude": -95.473728, "latitude": 31.200987 },
      { "id": 3, "longitude": -95.473728, "latitude": 32.200987 },
      { "id": 4, "longitude": -95.473728, "latitude": 33.200987 }]
  }
  componentDidUpdate(prevProps) {
    if (this.props.timeout !== prevProps.timeout) {
      if (this.props.timeout === true) {
        this.setState({ loading: false })
      }
    }
  }
  componentDidMount = () => {
    this.getEmail()
    // setInterval(() => {
    //   this.move();
    // }, 500);
  }

  move = () => {
    let mapData = this.state.mapData;
    mapData.forEach(single => {
      single.longitude -= 0.002
    });
    this.setState({ mapData });
  }

  loadMoreHandler = () => {
    if (this.state.currentPage < this.state.totalPages) {
      this.setState({ currentPage: this.state.currentPage + 1 }, () => {
        console.log(this.state.currentPage);
        this.getAllMyCompanies();
      })
    }
  }

  getAllMyCompanies = () => {
    let body = {
      page: this.state.currentPage,
      companyEmail: "usman.malik@azure-i.com"
      // companyEmail:this.state.email
    }
    this.props.apiManager.makeCall('viewCars', body, res => {
      console.log('get cars - v', res)
      console.log('get cars - v', body)
      if (res.code === 1019) {
        this.setState({ companies: this.state.companies.concat(res.response), currentPage: res.currentPage, totalPages: res.totalPages, loading: false });
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
  getEmail = async () => {
    let user = await Manager.getItem('user', true);
    this.setState({ email: user.email }, () => this.getAllMyCompanies());
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
        onClose={this.state.loading}
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
    console.log('haider hassan', this.props)
    return (
      <Fragment>
        <h2 className="breadcumbTitle">Chat</h2>
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
                  <Grid key={index} className='itemContainer' onClick={() => this.props.history.push(`/vehicleMap/${item.carID}`)}>
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
            <Map
              data={this.state.mapData}
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
