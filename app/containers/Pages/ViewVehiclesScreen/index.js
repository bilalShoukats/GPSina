import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SuperHOC } from '../../../HOC';
import 'sass/elements/sweet-alerts.scss';
import { Grid, TextField, Button, CircularProgress, InputAdornment } from '@material-ui/core'
import ScrollArea from 'react-scrollbar'
import './style.scss'
import Card from 'components/Card/Loadable'
import Dialog from '@material-ui/core/Dialog';
import { Manager } from '../../../StorageManager/Storage';
import { toast } from 'react-toastify';
import VehicleCard from './VehicleCard';
import { Link } from 'react-router-dom';
import SettingsModal from './SettingsModal';
import NotificationsModal from './NotificationsModal';
import AssignDriverModal from './AssignDriverModal';
import ConfirmModal from './ConfirmModal';

class ViewVehiclesScreen extends Component {
  state = {
    value: 0,
    vehicles: [],
    loading: true,
    vibrateNotification: false,
    currentPage: 1,
    totalPages: 0,
    itemsInPage: 10,
    showSettingsModal: false,
    showNotificationsModal: false,
    showAssignDriverModal: false,
    showConfirmModal: false,
    carID: '',
    search: "",
    registrationNo: '',
  }

  componentDidUpdate(prevProps) {
    if (this.props.timeout !== prevProps.timeout) {
      if (this.props.timeout === true) {
        this.setState({ loading: false })
      }
    }
  }

  componentDidMount = () => {
    this.getAllMyVehicles();
  }

  getAllMyVehicles = () => {
    Manager.getItemCallback('user', true, (user) => {
      let body = {
        page: this.state.currentPage,
        companyEmail: user.companyEmail
      }
      this.props.apiManager.makeCall('getPendingCarsActive', body, (res) => {
        this.setState({ loading: false });
        if (res.code === 1019) {
          this.setState({ vehicles: this.state.vehicles.concat(res.response), currentPage: res.currentPage, totalPages: res.totalPages, loading: false });
        } else {
          this.setState({ loading: false });
          toast.error(res.id);
        }
      });
    });
  }

  loadMoreHandler = () => {
    if (this.state.currentPage < this.state.totalPages) {
      this.setState({ currentPage: this.state.currentPage + 1 }, () => {
        this.getAllMyVehicles();
      })
    }
  }

  handleInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  openVehicleSettings = (item) => {
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

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
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

  render() {
    let searchingFor = null;

    if (this.state.vehicles.length > 0) {
      searchingFor = search => vehicles => vehicles.registrationNo.toLowerCase().includes(search.toLowerCase()) || !search;
    }
    return (
      <Fragment>
        <h2 className="breadcumbTitle">Your Vehicles</h2>
        <Grid className="viewVehiclesApp">
          {(this.state.vehicles[0]) ? (
            <Grid className="viewVehiclesLeft">
              <TextField
                fullWidth
                classes={{
                  root: 'searchVehicles',
                }}
                value={this.state.search}
                name="search"
                onChange={this.changeHandler}
                placeholder="Search Vehicle"
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      className="searchVehiclesIcon"
                      position="end">
                      <i className="fa fa-search"></i>
                    </InputAdornment>
                  ),
                }}
              />
              <ScrollArea
                speed={.5}
                className="vehiclesScrollBar"
                contentClassName='vehiclesScrollBarContent'
                horizontal={false}
              >
                <ul className="forumItems" style={{ margin: 10 }}>
                  <li className="vehiclesList" >
                    {
                      this.state.vehicles.filter(searchingFor(this.state.search)).map((item, i) => {
                        var enc = window.btoa(item.registrationNo);
                        return (
                          <VehicleCard
                            key={i}
                            item={item}
                            openNotificationsModal={() => this.openNotificationsModal(item)}
                            editVehicle={() => this.props.history.push(`/editVehicle/${enc}`)}
                            openVehicleSettings={() => this.openVehicleSettings(item)}
                            openConfirmModal={() => this.openConfirmModal(item)}
                            openAssignDriverModal={() => this.openAssignDriverModal(item)}
                            // openVehicleHistoryModal={() => this.openVehicleHistoryModal(item)}
                          />
                        )
                      }
                      )}
                  </li>
                </ul>
              </ScrollArea>
            </Grid>
          ) : (
              <Card title="No Vehicle Found!">
                <p className="subText">Don't have any Vehicle? <Link to="/addVehicle">Create Vehicle</Link></p>
              </Card>
            )}
        </Grid>
        {(this.state.vehicles[0]) ? (
          <Grid className="buttonGrid">
            {(this.state.currentPage < this.state.totalPages) ? (
              <ul>
                <li><Button className="btn bg-default btn-radius" onClick={this.loadMoreHandler}>Load More</Button></li>
              </ul>
            ) : (
                <ul>
                </ul>
              )}
          </Grid>) : null}
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
          getAllMyVehicles={this.getAllMyVehicles}
          {...this.props}
        />
        {this.renderLoading()}
      </Fragment >
    )
  }
}

ViewVehiclesScreen.propTypes = {
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

export default SuperHOC((withConnect)(ViewVehiclesScreen));