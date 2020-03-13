import React, { Fragment, Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { toast } from 'react-toastify';
import DialogContent from '@material-ui/core/DialogContent';
import { SuperHOC } from '../../../HOC';
import './style.scss'
import { Grid, } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ScrollArea from 'react-scrollbar';
import Card from 'components/Card/Loadable'
import { Link } from 'react-router-dom';

class AssignDriver extends Component {
  state = {
    vibrateNotification: false,
    overSpeed: false,
    acc: false,
    showSettingsModal: false,
    deviceId: '',
    drivers: [],
    driverID: '',
    currentPage: 1
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
  assignCar = () => {
    let body = {
      registrationNo: this.props.registrationNo,
      driverID: this.state.driverID,
      routeID: "1234567891"
    }
    if (this.state.driverID !== '') {
      this.props.apiManager.makeCall('assignCar', body, res => {
        console.log('assign cars - view', res)
        console.log('assign cars - view', body)
        if (res.code === 104) {
          toast.success(res.id)
          this.props.close()
        }
        else {
          toast.error(res.id);
        }
      })
    }
    else {
      toast.error('Please Select Driver First');
    }
  }
  render() {
    console.log('state - sss', this.props)
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
                  Drivers List
                </h5>
                <ScrollArea
                  speed={1}
                  className="scrollbarArea"
                  contentClassName="scrollbarContent"
                  horizontal={false}
                >
                  <ul className="notificationItems">
                    {this.state.drivers && this.state.drivers[0] !== undefined && this.state.drivers.length > 0 ? this.state.drivers.map((item, i) => (
                      <li key={i}>
                        <Button className={this.state.driverID === item.driverID ? "selectedButtonClass" : "buttonClass"} onClick={() => this.setState({ driverID: item.driverID })}>
                          <i className="icon">
                            <svg
                              aria-hidden="true"
                              focusable="false"
                              data-prefix="fal"
                              data-icon="user"
                              role="img"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 448 512"
                              className="svg-inline--fa fa-user fa-w-14 fa-fw"
                            >
                              <path
                                fill="currentColor"
                                d="M313.6 304c-28.7 0-42.5 16-89.6 16-47.1 0-60.8-16-89.6-16C60.2 304 0 364.2 0 438.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-25.6c0-74.2-60.2-134.4-134.4-134.4zM400 464H48v-25.6c0-47.6 38.8-86.4 86.4-86.4 14.6 0 38.3 16 89.6 16 51.7 0 74.9-16 89.6-16 47.6 0 86.4 38.8 86.4 86.4V464zM224 288c79.5 0 144-64.5 144-144S303.5 0 224 0 80 64.5 80 144s64.5 144 144 144zm0-240c52.9 0 96 43.1 96 96s-43.1 96-96 96-96-43.1-96-96 43.1-96 96-96z" />
                            </svg>
                          </i>
                          {item.driverName ? item.driverName : ''}
                          <span>{item.driverID}</span>
                        </Button>
                      </li>
                    )) : <Card title="No Drivers Found!">
                        <p className="subText">Don't have any Drivers? <Link to="/addDriver">Add Drivers</Link></p>
                      </Card>}
                  </ul>
                </ScrollArea>
                {
                  (this.state.drivers[0]) ? (
                    <Grid className="buttonGrid" style={{ marginTop: 20 }}>
                      {(this.state.currentPage < this.state.totalPages) ? (
                        <ul>
                          <li><Button className="btn bg-default btn-radius" style={{ textAlign: 'center' }} onClick={this.loadMoreHandler}>Load More</Button></li>
                        </ul>
                      ) : (
                          <ul>
                            <li><div className="btn bg-default btn-radius" style={{ textAlign: 'center' }}>You have seen it all!</div></li>
                          </ul>
                        )}
                    </Grid>) : null
                }
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
      </Fragment>
    )
  }
}
export default SuperHOC(AssignDriver)
