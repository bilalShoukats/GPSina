import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { SuperHOC } from '../../../HOC';
import { Grid, TextField, Button, CircularProgress, InputAdornment } from '@material-ui/core'
import Card from 'components/Card/Loadable'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import './style.scss'
import { ToastContainer, toast } from 'react-toastify';
import 'sass/elements/sweet-alerts.scss';
import { Link } from 'react-router-dom';
import ScrollArea from 'react-scrollbar';
import ConfirmModal from './ConfirmModal';
import NotificationsModal from './NotificationsModal'
import Switch from '@material-ui/core/Switch';
import UserCard from './UserCard'
// images
import profile from 'images/team/img1.jpg'

class ViewDevicessScreen extends Component {

  state = {
    search: "",
    value: 0,
    devices: [],
    cars: [],
    loading: true,
    showAlert: false,
    currentPage: 1,
    totalPages: 0,
    itemsInPage: 10,
    carID: '',
    showConfirmModal: false,
    showNotificationsModal: false,
    showCarAssignModal: false,
    registrationNo: '',
    assignCar: false,
    carModel: '',
    softwareVer: ''

  }


  handleChange = (event, newValue) => {
    this.setState({
      value: newValue
    })
  }

  componentDidMount = () => {
    this.getAllDevices();
    this.getCars()
  }
  componentDidUpdate(prevProps) {
    if (this.props.timeout !== prevProps.timeout) {
      if (this.props.timeout === true) {
        this.setState({ loading: false })
      }
    }
  }

  loadMoreHandler = () => {
    if (this.state.currentPage < this.state.totalPages) {
      this.setState({ currentPage: this.state.currentPage + 1 }, () => {
        console.log(this.state.currentPage);
        this.getAllDevices();
      })
    }
  }


  getAllDevices = () => {
    console.log('alssssl', this.props.user.companyEmail)
    let body = {
      companyEmail: this.props.user.companyEmail
    }
    this.props.apiManager.makeCall('getAllCompanyDevices', body, res => {
      console.log('alssssl', body)
      console.log('alssssl', res)
      if (res.code === 1019) {
        this.setState({ devices: this.state.devices.concat(res.response), currentPage: res.currentPage, totalPages: res.totalPages, loading: false });
      }
      else {
        this.setState({ loading: false });
        toast.error(res.id);
      }
    })
  }

  getCars = () => {
    let body = {
      companyEmail: this.props.user.companyEmail,
    }
    this.props.apiManager.makeCall('getPendingCarsActive', body, res => {
      console.log('cars', res)
      if (res.code === 1019) {
        this.setState({ cars: res.response, loading: false });
      }
      else {
        this.setState({ loading: false });
        toast.error(res.id);
      }
    })
  }
  attachDevice = () => {
    let body = {
      // companyEmail: this.props.user.companyEmail,
      deviceID: this.state.deviceID,
      registrationNo: this.state.registrationNo,
      softwareVer: this.state.softwareVer
    }
    console.log('carssss', body)
    this.props.apiManager.makeCall('attachDevice', body, res => {
      console.log('carssss', res)
      if (res.code === 5024) {
        toast.success(res.id)
      }
      else {
        toast.error(res.id)
        this.setState({ loading: false });
      }
    })
  }

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  openConfirmModal = (item) => {
    console.log('kasldkalskdj', item)
    this.setState({ carID: item.carID, showConfirmModal: true })
  }
  openNotificationsModal = (item) => {
    this.setState({ carID: item.carID, showNotificationsModal: true })
  }

  renderLoading = () => {
    return (
      <Dialog
        open={this.state.loading}
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


  renderAssignCarModal = () => {
    return (
      <Fragment>
        <Dialog
          open={this.state.showCarAssignModal}
          onClose={() => this.setState({ showCarAssignModal: false })}
          className="modalWrapper"
        >
          <div className="modalHead">
            <DialogContent style={{ padding: 0 }}>
              <div className="notificationList">
                <h5>
                  Attach Device
                </h5>
                <ScrollArea
                  speed={1}
                  className="scrollbarArea"
                  contentClassName="scrollbarContent"
                  horizontal={false}
                >
                  <ul className="notificationItems">
                    {this.state.cars.length > 0 ? this.state.cars.map((item, i) => {
                      if (item.deviceActive !== false) return false
                      // console.log('bawaa', this.state.cars)
                      return (
                        <Card key={i} >
                          <div className={this.state.registrationNo === item.registrationNo ? "selectedItem" : "item"} onClick={() => this.setState({ registrationNo: item.registrationNo })}>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                              <h4>
                                Car Model:
                          </h4>
                              <h4>
                                {item.carModel}
                              </h4>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingTop: 5 }}>
                              <h4>
                                Car Owner Name:
                          </h4>
                              <h4>
                                {item.carOwnerName}
                              </h4>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingTop: 5 }}>
                              <h4>
                                Car Color:
                          </h4>
                              <h4>
                                {item.color}
                              </h4>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingTop: 5 }}>
                              <h4>
                                Car Registration No:
                          </h4>
                              <h4>
                                {item.registrationNo}
                              </h4>
                            </div>
                          </div>
                        </Card>
                      )
                    }) :
                      <h2>No Vehicle Found</h2>
                    }
                  </ul>
                </ScrollArea>
              </div>
            </DialogContent>
            <Grid className="modalFooter">
              <Button
                style={{ padding: '5px 20px' }}
                className="bg-warning"
                onClick={() => this.setState({ showCarAssignModal: false })}
              >
                Cancel
              </Button>
              <Button style={{ padding: '5px 20px' }} className="bg-success" onClick={this.attachDevice}>
                Attach
              </Button>
            </Grid>
          </div>
        </Dialog>
      </Fragment>
    )
  }

  render() {
    let searchingFor = null;

    if (this.state.devices.length > 0) {
      searchingFor = search => devices => devices.companyEmail.toLowerCase().includes(search.toLowerCase()) || !search;
    }

    return (
      <Fragment>
        <h2 className="breadcumbTitle">Your Devices</h2>
        <Grid className="viewCompaniesApp">
          {(this.state.devices[0]) ? (
            <Grid className="viewCompaniesLeft">
              <TextField
                fullWidth
                classes={{
                  root: 'searchUsers',
                }}
                value={this.state.search}
                name="search"
                onChange={this.changeHandler}
                placeholder="Search Devices"
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      className="searchCompaniesIcon"
                      position="end">
                      <i className="fa fa-search"></i>
                    </InputAdornment>
                  ),
                }}
              />
              <ScrollArea
                speed={.5}
                className="companiesScrollBar"
                contentClassName='companiesScrollBarContent'
                horizontal={false}
              >
                <ul className="forumItems" style={{ margin: 10 }}>
                  <li className="companiesList" >
                    {this.state.devices.filter(searchingFor(this.state.search)).map((item, i) => {
                      console.log('lokokl', item)
                      var enc = window.btoa(item.email);
                      return (
                        <UserCard
                          key={i}
                          item={item}
                          // openNotificationsModal={() => this.openNotificationsModal(item)}
                          // editUser={() => this.props.history.push(`/editUser/${enc}`)}
                          openConfirmModal={() => this.openConfirmModal(item)}
                          assignCar={() => this.setState({ showCarAssignModal: true, userEmail: item.email, deviceID: item.deviceID, softwareVer: item.softwareVer })}
                        />
                      )
                    }
                    )}
                  </li>
                </ul>
              </ScrollArea>
            </Grid>
          ) : (
              <Card title="No Device Found!">
                <p className="subText">Don't have any Device? <Link to="/addDevice">Add Device</Link></p>
              </Card>
            )}
        </Grid>
        {(this.state.devices[0]) ? (
          <Grid className="buttonGrid">
            {(this.state.currentPage < this.state.totalPages) ? (
              <ul>
                <li><Button className="btn bg-default btn-radius" onClick={this.loadMoreHandler}>Load More</Button></li>
              </ul>
            ) : null}
          </Grid>) : null}
        <ConfirmModal
          open={this.state.showConfirmModal}
          close={() => this.setState({ showConfirmModal: false })}
          {...this.props}
          registrationNo={this.state.registrationNo}
        // history={this.props.history}
        />
        <NotificationsModal
          open={this.state.showNotificationsModal}
          close={() => this.setState({ showNotificationsModal: false })}
          carID={this.state.carID}
          {...this.props}
        />
        {this.renderLoading()}
        {this.renderAssignCarModal()}
      </Fragment>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);
export default SuperHOC((withConnect)(ViewDevicessScreen));
