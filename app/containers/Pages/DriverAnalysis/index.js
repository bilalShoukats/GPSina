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
      accY: [],
      breakData: [],
      harshSwerData: [],
      harshAccData: [],
      mapData: []
    }
  }



  selectDriver = (id) => {
    this.setState({ slectedDriver: id._id }, () => {
      this.getGraphsData(id.AttachedCarInformation[0].deviceID)
    })
  }



  componentDidMount() {
    this.getCarDriverDetails()
    //this.harshSwerving()
    if (this.state.carDeviceId !== null) {
      this.harshAcceleration()
      this.harshBraking()
      this.harshSwerving()
    }
    let harshSwerData = [];
    response.map((item) => {
      let newObject = [];
      newObject[0] = item.accX;
      newObject[1] = item.accY;
      harshSwerData.push(newObject);
    });
    this.setState({ graphData: harshSwerData });
    // this.setState({ accX: response.map(item => item.accX), accY: response.map(item => item.accY) })
  }
  getGraphsData = (id) => {
    this.harshBraking(id)
    this.harshAcceleration(id)
    this.harshSwerving(id);
  }


  getCarDriverDetails = () => {
    let body = {
      companyEmail: this.props.user.companyEmail,
    }
    this.props.apiManager.makeCall('getCarDriverDetails', body, res => {
      if (res.code === 1019) {
        this.setState({ drivers: res.response,  carDeviceId: res.response[0].AttachedCarInformation[0].deviceID });
      }
      else {
        // this.setState({ loading: false });
        // toast.error(res.id);
      }
    })
  }

  harshAcceleration = (id) => {
    let body = {
      deviceid: this.state.carDeviceId.toString(),
    }
    this.props.apiManager.makeCall('harshAccerlationTimeBase', body, res => {
      console.log('harshAccelerationTimeBase', body)
      console.log('harshAccelerationTimeBase', res)
      if (res) {
        for (let index = 0; index < 31; index++) {
          this.state.harshAccData[index] = [];
          var newArray = this.state.harshAccData[index]
          newArray[0] = index
          newArray[1] = 0
        }
        res.response.map((item, index) => {
          let date = new Date(item.time).getDate()
          if (this.state.harshAccData[date][0] === date) {
            let i = this.state.harshAccData[date][1]
            this.state.harshAccData[date][1] = i + 1
          }
          else {
          }
        })
        this.setState({ harshAccData: this.state.harshAccData, }, () => {
          this.state.mapData[0] = (res.response)
        })
      }
    })
  }

  harshBraking = (id) => {
    let body = {
      deviceid: this.state.carDeviceId.toString(),
    }
    this.props.apiManager.makeCall('harshBreakingTimeBase', body, res => {
      console.log('harshBreakingTimeBase', res)
      if (res) {
        for (let index = 0; index < 31; index++) {
          this.state.breakData[index] = [];
          var newArray = this.state.breakData[index]
          newArray[0] = index
          newArray[1] = 0
        }
        res.response.map((item, index) => {
          let date = new Date(item.time).getDate()
          if (this.state.breakData[date][0] === date) {
            let i = this.state.breakData[date][1]
            this.state.breakData[date][1] = i + 1
          }
          else {
          }
        })
        this.setState({ breakData: this.state.breakData, }, () => {
          this.state.mapData[1] = (res.response)
        })
      }
    })
  }

  harshSwerving = (id) => {
    let body = {
      deviceid: this.state.carDeviceId.toString(),
    }
    this.props.apiManager.makeCall('harshSwervingTimeBase', body, res => {
      console.log('harshSwervingTimeBase', res)
      if (res) {
        for (let index = 0; index < 31; index++) {
          this.state.harshSwerData[index] = [];
          var newArray = this.state.harshSwerData[index]
          newArray[0] = index
          newArray[1] = 0
        }
        res.response.map((item, index) => {
          let date = new Date(item.startTime).getDate()
          if (this.state.harshSwerData[date][0] === date) {
            let i = this.state.harshSwerData[date][1]
            this.state.harshSwerData[date][1] = i + 1
          }
          else {
          }
        })
        this.setState({ harshSwerData: this.state.harshSwerData, }, () => {
          // this.state.mapData[1] = (res.response)
        })
      }
    })
  }

  renderDriver = () => {
    return (
      this.state.drivers.map((item, index) => {
        console.log('kijoiahi', item._id)
        console.log('kijoiahi', this.state.slectedDriver)
        return (
          <div
            //className='driver-list'
            key={index}
            className={item._id === this.state.slectedDriver ? 'selectedItemContainer' : 'itemContainer'}
            onClick={(e) => {
              e.preventDefault()
              this.selectDriver(item)
            }}
          >
            <h5 >{item.driverName}</h5>
          </div>
        )
      })
    )
  }

  render() {
    console.log('brakingg', this.state.breakData)
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
                  data={this.state.harshAccData}
                // data={data}
                />
              </div>
              <div style={{ height: '100%', width: 300, marginRight: 5 }}>
                <Chart
                  type='area'
                  name='harsh swerving'
                  yName='swer'
                  data={this.state.harshSwerData}
                />
              </div>
              <div style={{ height: '100%', width: 300, marginRight: 5 }}>
                <Chart
                  type='area'
                  name='harsh braking'
                  yName='brake'
                  data={this.state.breakData}
                />
              </div>
            </div>
            <div style={{ width: '100%' }}>
              <Map
                data={this.state.mapData}
              />
            </div>
          </Grid>
        </Grid>
      </Fragment>
    )
  }
}

export default SuperHOC(index)