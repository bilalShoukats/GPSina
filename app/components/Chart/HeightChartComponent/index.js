import React, {Fragment} from 'react';
import {injectIntl} from 'react-intl';
import messages from './messages';
import Card from 'components/Card/Loadable'
import {Grid} from '@material-ui/core'

// components 
import TimeSeries from 'components/Chart/HeightChartComponent/components/timeSeries'
import AreaRange from 'components/Chart/HeightChartComponent/components/areaRange'
import SplineChart from 'components/Chart/HeightChartComponent/components/spline'
import BarChart from 'components/Chart/HeightChartComponent/components/bar'
import PieChart3D from 'components/Chart/HeightChartComponent/components/3dpie'
import './style.scss'
import {Helmet} from "react-helmet";


const HeightChartComponent = () => {
  return (
    <Fragment>
      <h2 className="breadcumbTitle">HeightChart</h2>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card title="Time series">
            <TimeSeries/>
          </Card>
        </Grid>
        <Grid item xl={6} xs={12}>
          <Card title="Area Range">
            <AreaRange/>
          </Card>
        </Grid>
        <Grid item xl={6} xs={12}>
          <Card title="Spline with plot bands">
            <SplineChart/>
          </Card>
        </Grid>
        <Grid item xl={6} xs={12}>
          <Card title="Column Chart">
            <BarChart/>
          </Card>
        </Grid>
        <Grid item xl={6} xs={12}>
          <Card title="3D Pie Chart">
            <PieChart3D/>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default HeightChartComponent;
