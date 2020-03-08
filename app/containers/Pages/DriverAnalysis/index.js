import React, { Component, Fragment } from 'react'
import 'sass/elements/sweet-alerts.scss';
import { Grid } from '@material-ui/core';
import ScrollArea from 'react-scrollbar'
import Chart from "./Chart";
import Map from "./basic";
import data from 'utils/json/range.json'
import { SuperHOC } from '../../../HOC';
import { response } from './data2'
import './style.scss'

class index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      drivers: [],
      slectedDriver: '',
      carDeviceId: null,
      graphData: [],
      accX: [],
      accY: []
    }
  }



  selectDriver = (id) => {
    this.setState({ slectedDriver: id })
  }



  componentDidMount() {
    this.getCarDriverDetails()
    //this.harshSwerving()
    if (this.state.carDeviceId !== null) {
      this.harshAcceleration()
      this.harshBraking()
      this.harshSwerving()
    }
    let harshData = [];
    response.map((item) => {
      let newObject = [];
      newObject[0] = item.accX;
      newObject[1] = item.accY;
      harshData.push(newObject);
    });
    this.setState({ graphData: harshData });
    // console.log("test: ", test);
    // this.setState({ accX: response.map(item => item.accX), accY: response.map(item => item.accY) })
  }


  getCarDriverDetails = () => {
    let body = {
      companyEmail: this.props.user.companyEmail,
    }
    this.props.apiManager.makeCall('getCarDriverDetails', body, res => {
      console.log('get drivers', res)
      if (res.code === 1019) {
        this.setState({ drivers: res.response, slectedDriver: res.response[0]._id, carDeviceId: res.response[0].AttachedCarInformation[0].deviceID });
      }
      else {
        // this.setState({ loading: false });
        // toast.error(res.id);
      }
    })
  }

  harshAcceleration = () => {
    let body = {
      deviceid: this.state.carDeviceId,
    }
    this.props.apiManager.makeCall('harshAccelerationTimeBase', body, res => {
      console.log('acceleration', res)
      // if (res.code === 1019) {
      //   this.setState({ cars: res.response, loading: false });
      // }
      // else {
      //   this.setState({ loading: false });
      //   toast.error(res.id);
      // }
    })
  }

  harshBraking = () => {
    let body = {
      deviceid: this.state.carDeviceId,
    }
    this.props.apiManager.makeCall('harshBrakingTimeBase', body, res => {
      console.log('braking', res)
      // if (res.code === 1019) {
      //   this.setState({ cars: res.response, loading: false });
      // }
      // else {
      //   this.setState({ loading: false });
      //   toast.error(res.id);
      // }
    })
  }

  harshSwerving = () => {
    const { AttachedCarInformation } = this.state.drivers
    if (AttachedCarInformation) {
      let body = {
        deviceid: this.state.carDeviceId,
      }
      this.props.apiManager.makeCall('harshSwervingTimeBase', body, res => {
        console.log('swerving', res)
        // if (res.code === 1019) {
        //   this.setState({ cars: res.response, loading: false });
        // }
        // else {
        //   this.setState({ loading: false });
        //   toast.error(res.id);
        // }
      })
    }
  }

  renderDriver = () => {
    return (
      this.state.drivers.map((item, index) => {
        return (
          <div
            //className='driver-list'
            key={index}
            style={{
              marginTop: 15,
              marginBottom: 15,
              marginLeft: 30,
              marginRight: 30,
              paddingTop: 5,
              paddingBottom: 5,
              borderBottom: '1px solid rgb(245,246,250)'
            }}
            onClick={(e) => {
              e.preventDefault()
              this.selectDriver(item._id)
            }}
          >
            <h5 style={{ textAlign: 'center', fontSize: this.state.slectedDriver === item._id ? 18 : 14, color: 'black', }}>{item.driverName}</h5>
          </div>
        )
      })
    )
  }

  render() {
    console.log('x', this.state.accX)
    return (
      <Fragment>
        <h2 className="breadcumbTitle">Driving Analysis</h2>
        <Grid className="chatApp">
          <Grid className="chatAppLeft-driving">
            <ScrollArea
              speed={1}
              className="chatScrollBar"
              contentClassName='chatScrollBarContent'
              horizontal={false}
            >
              {this.renderDriver()}
            </ScrollArea>
          </Grid>
          <Grid className="chatAppRight">
            <div style={{ height: 200, display: 'flex', flexDirection: 'row', marginBottom: 5, overflowX: 'scroll' }}>
              <div style={{ height: 200, width: 300, marginRight: 5 }}>
                <Chart
                  type='area'
                  name='harsh acceleration'
                  yName='acc'
                  data={this.state.graphData}
                // data={data}
                />
              </div>
              <div style={{ height: '100%', width: 300, marginRight: 5 }}>
                <Chart
                  type='area'
                  name='harsh swerving'
                  yName='swer'
                  data={this.state.graphData}
                />
              </div>
              <div style={{ height: '100%', width: 300, marginRight: 5 }}>
                <Chart
                  type='area'
                  name='harsh braking'
                  yName='brake'
                  data={this.state.graphData}
                />
              </div>
            </div>
            <div style={{ width: '100%' }}>
              <Map />
            </div>
          </Grid>
        </Grid>
      </Fragment>
    )
  }
}

export default SuperHOC(index)