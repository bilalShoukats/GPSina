import React, { Fragment, Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { toast } from 'react-toastify';
import DialogContent from '@material-ui/core/DialogContent';
import { SuperHOC } from '../../../HOC';
import './style.scss'
import { Grid, } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ScrollArea from 'react-scrollbar';

class AssignDriver extends Component {
  state = {
    vibrateNotification: false,
    overSpeed: false,
    acc: false,
    showSettingsModal: false,
    deviceId: '',
    drivers: [],
    carID: '',
    routeID: '',
    routes: [],
    registrationNo: ''
  }
  handleInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };
  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.checked });
  };
  validationFunction(e) {
    const re = /[0-9]+/g;
    if (!re.test(e.key)) {
      e.preventDefault();
    }
  }
  componentDidMount() {
    this.getUnAssignedCar();
  }
  loadMoreHandler = () => {
    if (this.state.currentPage < this.state.totalPages) {
      this.setState({ currentPage: this.state.currentPage + 1 }, () => {
        console.log(this.state.currentPage);
        this.getUnAssignedCar();
      })
    }
  }
  getUnAssignDrivers = () => {
    let body = {
      page: 1,
      companyEmail: this.props.user.companyEmail
      // companyEmail:this.state.email
    }
    this.props.apiManager.makeCall('viewDrivers', body, res => {
      if (res) {
        this.setState({ drivers: this.state.drivers.concat(res.response), currentPage: res.currentPage, totalPages: res.totalPages, loading: false });
      }
      else {
        this.setState({ loading: false });
        toast.error(res.id);
      }
    })
  }

  getUnAssignedCar = () => {
    let body = {
      companyEmail: this.props.user.companyEmail,
      page: 1,
      // companyEmail:this.state.email
    }
    this.props.apiManager.makeCall('getUnAssignedCar', body, res => {
      console.log('View cars - llll', res)
      console.log('View cars - llll', body)
      if (res) {
        this.setState({ drivers: this.state.drivers.concat(res.response), currentPage: res.currentPage, totalPages: res.totalPages, loading: false }, () => this.getAllRoutes());
      }
      else {
        this.setState({ loading: false }, () => this.getAllRoutes());
        toast.error(res.id);
      }
    })
  }
  getAllRoutes = () => {
    let body = {
      page: 1,
      companyEmail: this.props.user.companyEmail
      // companyEmail:this.state.email
    }
    this.props.apiManager.makeCall('viewRoute', body, res => {
      console.log('routes show-', res)
      if (res) {
        this.setState({ routes: this.state.routes.concat(res.response), currentPage: res.currentPage, totalPages: res.totalPages, loading: false });
      }
      else {
        this.setState({ loading: false });
        toast.error(res.id);
      }
    })
  }
  assignCar = () => {
    let body = {
      registrationNo: this.state.registrationNo,
      driverID: this.props.driverID,
      routeID: this.state.routeID
    }
    if (this.state.registrationNo !== '') {
      if (this.state.routeID !== '') {
        this.props.apiManager.makeCall('assignCar', body, res => {
          console.log('assign cars - view', res)
          console.log('assign cars - view', body)
          if (res) {
            toast.success(res.id)
            this.props.close()
            this.getUnAssignDrivers()
          }
          else {
            toast.error(res.id);
          }
        })
      }
      else {
        toast.error('Please Select Route First');
      }
    }
    else {
      toast.error('Please Select Vehicle First');
    }
  }
  render() {
    console.log('view drivers', this.state.drivers)
    return (
      <Fragment>
        <Dialog
          open={this.props.open}
          onClose={this.props.close}
          className="modalWrapper"
        >
          <div className="modalHead">
            <DialogContent style={{ padding: 0 }}>
              <div className="notificationList">
                <h5>
                  Assign Vehicle
                </h5>

                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                  <div className="notificationList" style={{ textAlign: 'center' }}>
                    Vehicles
                    <ScrollArea
                      speed={1}
                      className="scrollbarArea"
                      contentClassName="scrollbarContent"
                      horizontal={false}
                    >
                      <ul className="notificationItems" style={{ borderRight: '1px solid black' }}>
                        {this.state.drivers[0] !== null && this.state.drivers.length > 0 && this.state.drivers.map((item, i) => (
                          < li key={i} >
                            <Button className={this.state.carID === item.carID ? "selectedButtonClass" : "buttonClass"} onClick={() => this.setState({ carID: item.carID, registrationNo: item.registrationNo })}>
                              <i className="icon">
                                <svg
                                  aria-hidden="true"
                                  focusable="false"
                                  data-prefix="fal"
                                  data-icon="car"
                                  role="img"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 512 512"
                                  className="svg-inline--fa fa-car fa-w-14 fa-fw"
                                >
                                  <path
                                    fill="currentColor"
                                    d="M499.99 176h-59.87l-16.64-41.6C406.38 91.63 365.57 64 319.5 64h-127c-46.06 0-86.88 27.63-103.99 70.4L71.87 176H12.01C4.2 176-1.53 183.34.37 190.91l6 24C7.7 220.25 12.5 224 18.01 224h20.07C24.65 235.73 16 252.78 16 272v48c0 16.12 6.16 30.67 16 41.93V416c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32v-32h256v32c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32v-54.07c9.84-11.25 16-25.8 16-41.93v-48c0-19.22-8.65-36.27-22.07-48H494c5.51 0 10.31-3.75 11.64-9.09l6-24c1.89-7.57-3.84-14.91-11.65-14.91zm-352.06-17.83c7.29-18.22 24.94-30.17 44.57-30.17h127c19.63 0 37.28 11.95 44.57 30.17L384 208H128l19.93-49.83zM96 319.8c-19.2 0-32-12.76-32-31.9S76.8 256 96 256s48 28.71 48 47.85-28.8 15.95-48 15.95zm320 0c-19.2 0-48 3.19-48-15.95S396.8 256 416 256s32 12.76 32 31.9-12.8 31.9-32 31.9z" />
                                </svg>
                              </i>
                              {item && item.carOwnerName ? item.carOwnerName : ''}
                              <span>{item && item.registrationNo ? item.registrationNo : ''}</span>
                            </Button>
                          </li>
                        ))}
                      </ul>
                      {
                        (this.state.drivers[0]) ? (
                          <Grid className="buttonGrid" style={{ marginTop: 20 }}>
                            {(this.state.currentPage < this.state.totalPages) ? (
                              <ul>
                                <li><Button className="btn bg-default btn-radius" style={{ textAlign: 'center' }} onClick={this.loadMoreHandler}>Load More</Button></li>
                              </ul>
                            ) : (
                                <ul>
                                  <li><div className="btn bg-default btn-radius" style={{ textAlign: 'center', cursor: 'initial' }}>You have seen it all!</div></li>
                                </ul>
                              )}
                          </Grid>) : <h4 style={{ marginTop: '40px' }}>No Vehicle Found</h4>
                      }
                    </ScrollArea>
                  </div>
                  <div className="notificationList" style={{ textAlign: 'center' }}>
                    Routes
                    <ScrollArea
                      speed={1}
                      className="scrollbarArea"
                      contentClassName="scrollbarContent"
                      horizontal={false}
                    >
                      <ul className="notificationItems" style={{ borderLeft: '1px solid black' }}>
                        {this.state.routes.map((item, i) => (
                          <li key={i}>
                            <Button className={this.state.routeID === item.routeID ? "selectedButtonClass" : "buttonClass"} onClick={() => this.setState({ routeID: item.routeID })}>
                              <i className="icon">
                                <svg
                                  aria-hidden="true"
                                  focusable="false"
                                  data-prefix="fas"
                                  data-icon="road"
                                  role="img"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 576 512"
                                  className="svg-inline--fa fa-road fa-w-14 fa-fw"
                                >
                                  <path
                                    fill="currentColor"
                                    d="M573.19 402.67l-139.79-320C428.43 71.29 417.6 64 405.68 64h-97.59l2.45 23.16c.5 4.72-3.21 8.84-7.96 8.84h-29.16c-4.75 0-8.46-4.12-7.96-8.84L267.91 64h-97.59c-11.93 0-22.76 7.29-27.73 18.67L2.8 402.67C-6.45 423.86 8.31 448 30.54 448h196.84l10.31-97.68c.86-8.14 7.72-14.32 15.91-14.32h68.8c8.19 0 15.05 6.18 15.91 14.32L348.62 448h196.84c22.23 0 36.99-24.14 27.73-45.33zM260.4 135.16a8 8 0 0 1 7.96-7.16h39.29c4.09 0 7.53 3.09 7.96 7.16l4.6 43.58c.75 7.09-4.81 13.26-11.93 13.26h-40.54c-7.13 0-12.68-6.17-11.93-13.26l4.59-43.58zM315.64 304h-55.29c-9.5 0-16.91-8.23-15.91-17.68l5.07-48c.86-8.14 7.72-14.32 15.91-14.32h45.15c8.19 0 15.05 6.18 15.91 14.32l5.07 48c1 9.45-6.41 17.68-15.91 17.68z" />
                                </svg>
                              </i>
                              {item.routeName ? item.routeName : ''}
                              <span>{item.routeID}</span>
                            </Button>
                          </li>
                        ))}
                      </ul>
                      {
                        (this.state.drivers[0]) ? (
                          <Grid className="buttonGrid" style={{ marginTop: 20 }}>
                            {(this.state.currentPage < this.state.totalPages) ? (
                              <ul>
                                <li><Button className="btn bg-default btn-radius" style={{ textAlign: 'center' }} onClick={this.loadMoreHandler}>Load More</Button></li>
                              </ul>
                            ) : (
                                <ul>
                                  <li><div className="btn bg-default btn-radius" style={{ textAlign: 'center', cursor: 'initial' }}>You have seen it all!</div></li>
                                </ul>
                              )}
                          </Grid>) : null
                      }
                    </ScrollArea>
                  </div>
                </div>

              </div>
            </DialogContent>
            <Grid className="modalFooter">
              <Button style={{ padding: '5px 20px' }} className="bg-warning" onClick={this.props.close}>
                Cancel
              </Button>
              <Button style={{ padding: '5px 20px' }} className="bg-success" onClick={this.assignCar}>
                Assign
              </Button>
            </Grid>
          </div>
        </Dialog>
      </Fragment >
    )
  }
}
export default SuperHOC(AssignDriver)
