import React, { Component, Fragment } from 'react'
import 'sass/elements/sweet-alerts.scss';
import { Grid } from '@material-ui/core';
import ScrollArea from 'react-scrollbar'
import Chart from "./Chart";
import Map from "./basic";
import data from 'utils/json/range.json'

import './style.scss'

export default class index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      drivers: [
        { id: 1, name: 'nadeem khan' },
        { id: 2, name: 'usama khan' },
        { id: 3, name: 'jawad bhai' },
        { id: 4, name: 'haider hassan' },
      ],
      slectedDriver: 1
    }
  }



  selectDriver = (id) => {
    this.setState({ slectedDriver: id })
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
              this.selectDriver(item.id)
            }}
          >
            <h5 style={{ textAlign: 'center', fontSize: this.state.slectedDriver === item.id ? 18 : 14, color: 'black', }}>{item.name}</h5>
          </div>
        )
      })
    )
  }

  render() {
    return (
      <Fragment>
        <h2 className="breadcumbTitle">Driving Analysis</h2>
        <Grid className="chatApp">
          <Grid className="chatAppLeft">
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
            <div style={{ height: 200, display: 'flex', flexDirection: 'row', marginBottom: 5, marginRight: 5, marginLeft: 5 }}>
              <div style={{ height: 200, width: '50%', marginRight: 5 }}>
                <Chart
                  type='area'
                  name='harsh acceleration'
                  data={data}
                />
              </div>
              <div style={{ height: '100%', width: '25%', marginRight: 5 }}>
                <Chart
                  type='area'
                  name='harsh swerving'
                  data={data}
                />
              </div>
              <div style={{ height: '100%', width: '25%', marginRight: 5 }}>
                <Chart
                  type='area'
                  name='harsh braking'
                  data={data}
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
