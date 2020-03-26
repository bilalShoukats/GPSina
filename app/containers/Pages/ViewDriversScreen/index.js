import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { SuperHOC } from '../../../HOC';
import { Grid, TextField, Button, InputAdornment, CircularProgress } from '@material-ui/core'
import Card from 'components/Card/Loadable'
import './style.scss'
import { toast } from 'react-toastify';
import 'sass/elements/sweet-alerts.scss';
import { Link } from 'react-router-dom';
import ScrollArea from 'react-scrollbar';
import ConfirmModal from './ConfirmModal';
import AssignDriverModal from './AssignDriverModal'
import ConfirmUnAssignModal from './ConfirmUnAssignModal'
import NotificationsModal from './NotificationsModal'
import Dialog from '@material-ui/core/Dialog';
import DriverCard from './DriverCard'

// const searchingFor = search => companies => companies.companyName.toLowerCase().includes(search.toLowerCase()) || !search;

class ViewDriversScreen extends Component {

  state = {
    search: "",
    driverId: '',
    value: 0,
    companies: [],
    drivers: [],
    unAssignCars: [],
    routes: [],
    loading: true,
    showAlert: false,
    currentPage: 1,
    totalPages: 0,
    itemsInPage: 10,
    showConfirmModal: false,
    showAssignDriverModal: false,
    showConfirmUnAssignModal: false,
    showNotificationsModal: false
  }

  componentDidMount = () => {
    this.getAllDrivers();
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

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  openConfirmModal = (item) => {
    this.setState({ carID: item.carID, showConfirmModal: true })
  }
  openConfirmUnAssignModal = (item) => {
    this.setState({ registrationNo: item.registrationNo, showConfirmUnAssignModal: true })
  }
  openAssignDriverModal = (item) => {
    console.log('assign cars - viewww', this)
    this.setState({ driverId: item.driverID, registrationNo: item.registrationNo, showAssignDriverModal: true }, () => this.getUnAssignedCar())
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
  close = () => {
    this.setState({ showConfirmUnAssignModal: false, showAssignDriverModal: false, routes: [], unAssignCars: [] }, () => this.getAllDrivers())
  }
  getUnAssignedCar = () => {
    let body = {
      companyEmail: this.props.user.companyEmail,
      page: 1,
    }
    this.props.apiManager.makeCall('getUnAssignedCar', body, res => {
      console.log('View cars - llll', res)
      console.log('View cars - llll', body)
      if (res) {
        if (res.response) {
          this.setState({ unAssignCars: this.state.unAssignCars.concat(res.response), loading: false }, () => this.getAllRoutes());
        }
        else {
          this.setState({ unAssignCars: [] }, () => this.getAllRoutes())
        }
      }
      else {
        this.setState({ loading: false });
        toast.error(res.id);
      }
    })
  }
  getAllRoutes = () => {
    let body = {
      page: 1,
      companyEmail: this.props.user.companyEmail
    }
    this.props.apiManager.makeCall('viewRoute', body, res => {
      console.log('routes show-', res)
      if (res) {
        this.setState({ routes: this.state.routes.concat(res.response), });
      }
      else {
        this.setState({ loading: false });
        toast.error(res.id);
      }
    })
  }
  render() {
    let searchingFor = null;
    if (this.state.drivers.length > 0) {
      searchingFor = search => drivers => drivers.driverName.toLowerCase().includes(search.toLowerCase()) || !search;
    }
    return (
      < Fragment >
        <h2 className="breadcumbTitle">Your Drivers</h2>
        <Grid className="viewCompaniesApp">
          {(this.state.drivers[0] !== undefined && this.state.drivers.length > 0) ? (
            <Grid className="viewCompaniesLeft">
              <TextField
                fullWidth
                classes={{
                  root: 'searchUsers',
                }}
                value={this.state.search}
                name="search"
                onChange={this.changeHandler}
                placeholder="Search Drivers"
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
                    {this.state.drivers.filter(searchingFor(this.state.search)).map((item, i) => {
                      console.log('nadeem', item)
                      var enc = window.btoa(item.driverEmail);
                      return (
                        <DriverCard key={i}
                          item={item}
                          openNotificationsModal={() => this.openNotificationsModal(item)}
                          assignCarToDriver={() => this.openAssignDriverModal(item)}
                          editDriver={() => this.props.history.push(`/editDriver/${item.driverID}`)}
                          openConfirmModal={() => this.openConfirmModal(item)}
                          openConfirmUnAssignModal={() => this.openConfirmUnAssignModal(item)}
                        />
                      )
                    }
                    )}
                  </li>
                </ul>
              </ScrollArea>
            </Grid>
          ) : (
              <Card title="No Driver Found!">
                <p className="subText">Don't have any Drivers? <Link to="/addDriver">Add Driver</Link></p>
              </Card>
            )}
        </Grid>
        {
          (this.state.drivers.length > 0) ? (
            <Grid className="buttonGrid">
              {(this.state.currentPage < this.state.totalPages) ? (
                <ul>
                  <li><Button className="btn bg-default btn-radius" onClick={this.loadMoreHandler}>Load More</Button></li>
                </ul>
              ) : null}
            </Grid>) : null
        }
        <ConfirmModal
          open={this.state.showConfirmModal}
          close={() => this.setState({ showConfirmModal: false })}
          getAllDrivers={() => this.getAllDrivers()}
        />
        <AssignDriverModal
          open={this.state.showAssignDriverModal}
          close={this.close}
          registrationNo={this.state.registrationNo}
          driverID={this.state.driverId}
          getAllDrivers={() => this.getAllDrivers()}
          drivers={this.state.unAssignCars}
          routes={this.state.routes}
          getUnAssignedCar={() => this.getUnAssignedCar}
        />
        <ConfirmUnAssignModal
          open={this.state.showConfirmUnAssignModal}
          close={this.close}
          registrationNo={this.state.registrationNo}
          getAllDrivers={() => this.getAllDrivers()}
        />
        <NotificationsModal
          open={this.state.showNotificationsModal}
          close={() => this.setState({ showNotificationsModal: false })}
          driverID={this.state.driverId}
        />
        {this.renderLoading()}
      </Fragment >
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
export default SuperHOC((withConnect)(ViewDriversScreen));
