import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SuperHOC } from '../../../HOC';
import 'sass/elements/sweet-alerts.scss';
import { Grid, CircularProgress } from '@material-ui/core';
import ScrollArea from 'react-scrollbar'
import './style.scss'
import SocketComponent from '../../../components/WebSocket';
import Dialog from '@material-ui/core/Dialog';
import { Manager } from '../../../StorageManager/Storage';
import Button from '@material-ui/core/Button';
// const searchingFor = search => drivers => drivers.companyName.toLowerCase().includes(search.toLowerCase()) || !search;
class ChatApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      currentPage: 1,
      totalPages: 0,
      itemsInPage: 10,
      routes: [],
      mapObject: new Map(),
      drivers: [],
      selectedIndex: 1,
      tripid: '',
      deviceID: '',
      viewLess: true,
    }
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
    this.props.apiManager.makeCall('getCarDriverDetails', body, res => {
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
  getAllRoutes = (item) => {
    console.log('routes show-', item)
    this.setState({ driverID: item.driverID, deviceID: item && item.AttachedCarInformation && item.AttachedCarInformation[0] ? item.AttachedCarInformation[0].deviceID : '' }, () => {
      let body = {
        deviceid: this.state.deviceID.toString()
      }
      this.props.apiManager.makeCall('driverTripStats', body, res => {
        console.log('routes show-', body)
        console.log('routes show-', res)
        if (res) {
          this.setState({ routes: this.state.routes.concat(res.response), });
        }
        else {
          this.setState({ loading: false });
          toast.error(res.id);
        }
      })
    })
  }

  getMyEmail = async () => {
    let user = await Manager.getItem('user', true);
    this.setState({ email: user.email, companyEmail: user.companyEmail, hash: user.hash }, () => this.getAllDrivers());
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
      <Fragment >
        <h2 className="breadcumbTitle">Route History</h2>
        <Grid className="chatApp">
          <Grid className="cchatAppLeft">
            <h5 className="headingText">Drivers List</h5>
            <ScrollArea
              speed={1}
              className="chatScrollBar"
              contentClassName='chatScrollBarContent'
              horizontal={false}
            >
              {this.state.drivers.length > 0 ? this.state.drivers.map((item, index) => {
                console.log('sate drivers-', item)
                return (
                  <Grid key={index} className={item.driverID === this.state.driverID ? 'selectedItemContainer' : 'itemContainer'} onClick={() => {
                    this.socketComponent.disconnectSocketServer();
                    this.getAllRoutes(item)
                  }}>
                    <Grid className='text'>
                      <h4>{item.driverName}</h4>
                    </Grid>
                  </Grid>
                )
              }) : ''}
              {
                (this.state.drivers[0]) ? (
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
          <Grid className="cchatAppRightt">
            <h5 className="headingText">Routes List</h5>
            <ScrollArea
              speed={1}
              className="chatScrollBar"
              contentClassName='chatScrollBarContent'
              horizontal={false}
            >
              {this.state.routes.length > 0 && this.state.routes[0] !== undefined ? this.state.routes.map((item, index) => {
                console.log('sate driversss-', item)
                return (
                  this.state.viewLess ?
                    index < 5 ?
                      <Grid key={index} className={item.tripid === this.state.tripid ? 'selectedItemContainer' : 'itemContainer'} onClick={() => {
                        this.socketComponent.disconnectSocketServer();
                        this.props.history.push(`RouteMap/${item.tripid}`)
                      }}>
                        <Grid className='text'>
                          <h4>{item.tripid}</h4>
                        </Grid>
                      </Grid>
                      : ''
                    :
                    <Grid key={index} className={item.tripid === this.state.tripid ? 'selectedItemContainer' : 'itemContainer'} onClick={() => {
                      this.socketComponent.disconnectSocketServer();
                      this.props.history.push(`RouteMap/${item.tripid}`)
                    }}>
                      <Grid className='text'>
                        <h4>{item.tripid}</h4>
                      </Grid>
                    </Grid>
                )
              }) : <Grid style={{ textAlign: 'center', marginTop: 10, marginBottom: 10, borderBottom: '1px solid black' }}>
                  <Grid className='text'>
                    <h4>Please Select Driver First</h4>
                  </Grid>
                </Grid>}
              {this.state.routes.length > 5 ? <h6 style={{ color: 'rgb(224, 106, 66)', cursor: 'pointer', textAlign: 'center' }} onClick={() => this.setState({ viewLess: !this.state.viewLess })}>{this.state.viewLess ? 'View More' : 'View Less'}</h6> : ''}
              {
                (this.state.drivers[0]) ? (
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
        </Grid>
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

