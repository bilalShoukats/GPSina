import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { SuperHOC } from '../../../HOC';
import { Grid, TextField, Button, CircularProgress, InputAdornment } from '@material-ui/core'
import Card from 'components/Card/Loadable'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import './style.scss'
import { toast } from 'react-toastify';
import 'sass/elements/sweet-alerts.scss';
import { Link } from 'react-router-dom';
import ScrollArea from 'react-scrollbar';
import ConfirmModal from './ConfirmModal';
import NotificationsModal from './NotificationsModal'
import Switch from '@material-ui/core/Switch';
import UserCard from './UserCard'
// images

class ViewUsersScreen extends Component {

  state = {
    search: "",
    value: 0,
    users: [],
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
    switches: []

  }

  componentDidMount = () => {
    this.getAllUsers();
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
        this.getAllUsers();
      })
    }
  }

  getAllUsers = () => {
    let body = {
      companyEmail: this.props.user.companyEmail,
    }
    this.props.apiManager.makeCall(`viewCompanyUserDetails`, body, res => {
      console.log('alssssl', res.response)
      if (res.code === 1019) {
        this.setState({ users: this.state.users.concat(res.response), currentPage: res.currentPage, totalPages: res.totalPages, loading: false });
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
    this.props.apiManager.makeCall('viewCars', body, res => {
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
  assignVehicle = () => {
    let body = {
      companyEmail: this.props.user.companyEmail,
      email: this.state.userEmail,
      vehicleIDs: this.state.switches
    }
    console.log('carssss', body)
    this.props.apiManager.makeCall('assignVehicleToEmployee', body, res => {
      console.log('carssss', res)
      if (res.code === 1014) {
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

  handleSwitchChange = (item) => (event) => {
    if (event.target.checked === true) {
      var newStateArray = this.state.switches.slice();
      newStateArray.push(item);
      this.setState({ switches: newStateArray }, () => console.log('bawa array dkha', this.state.switches)
      );
    }
    else {
      var result = arrayRemove(this.state.switches, item);
      this.setState({ switches: result }, () => console.log('bawa array dkha', this.state.switches)
      );
    }
    function arrayRemove(arr, value) {
      return arr.filter(function (ele) {
        return ele !== value;
      });
    }
  };

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
                  Assign Car
                </h5>
                <ScrollArea
                  speed={1}
                  className="scrollbarArea"
                  contentClassName="scrollbarContent"
                  horizontal={false}
                >
                  <ul className="notificationItems">
                    {this.state.cars.map((item, i) => {
                      console.log('bawaa', item)
                      return (
                        <Card key={i}>
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
                          <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 10 }}>
                            <Switch
                              checked={this.state[item.carModel]}
                              onChange={this.handleSwitchChange(item.registrationNo)}
                              value={item.carModel}
                              classes={{
                                root: 'switchDefault',
                                switchBase: 'switchBase',
                                thumb: 'switchThumb',
                                track: 'switchTrack',
                                checked: 'switchChecked'
                              }}
                            />
                          </div>
                        </Card>
                      )
                    })}
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
              <Button style={{ padding: '5px 20px' }} className="bg-success" onClick={this.assignVehicle}>
                Assign
              </Button>
            </Grid>
          </div>
        </Dialog>
      </Fragment>
    )
  }

  render() {
    let searchingFor = null;

    if (this.state.users.length > 0) {
      searchingFor = search => users => users.firstName.toLowerCase().includes(search.toLowerCase()) || !search;
    }

    return (
      <Fragment>
        <h2 className="breadcumbTitle">Your Users</h2>
        <Grid className="viewCompaniesApp">
          {(this.state.users[0]) ? (
            <Grid className="viewCompaniesLeft">
              <TextField
                fullWidth
                classes={{
                  root: 'searchUsers',
                }}
                value={this.state.search}
                name="search"
                onChange={this.changeHandler}
                placeholder="Search Users"
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
                    {this.state.users.filter(searchingFor(this.state.search)).map((item, i) => {
                      var enc = window.btoa(item.email);
                      console.log('user ', item)
                      return (
                        <UserCard
                          key={i}
                          item={item}
                          openNotificationsModal={() => this.openNotificationsModal(item)}
                          editUser={() => this.props.history.push(`/editUser/${enc}`)}
                          openConfirmModal={() => this.openConfirmModal(item)}
                          assignCar={() => this.setState({ showCarAssignModal: true, userEmail: item.email })}
                        />
                      )
                    }
                    )}
                  </li>
                </ul>
              </ScrollArea>
            </Grid>
          ) : (
              <Card title="No Company Found!">
                <p className="subText">Don't have any Users? <Link to="/addUser">Create User</Link></p>
              </Card>
            )}
        </Grid>
        {(this.state.users[0]) ? (
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
export default SuperHOC((withConnect)(ViewUsersScreen));
