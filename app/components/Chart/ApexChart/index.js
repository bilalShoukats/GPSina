import React, {Fragment} from 'react';
import {injectIntl} from 'react-intl';
import messages from './messages';
import {Grid} from '@material-ui/core'
import Card from 'components/Card/Loadable';
import './style.scss'


// components 
import ApexRadialChart from 'components/Chart/ApexChart/components/radial'
import ApexPieChart from 'components/Chart/ApexChart/components/pie'
import ApexRadarlChart from 'components/Chart/ApexChart/components/radar'
import ApexLineChart from 'components/Chart/ApexChart/components/line'
import ApexAreaChart from 'components/Chart/ApexChart/components/area'
import ApexCandleStikeChart from 'components/Chart/ApexChart/components/candle'
import ApexBubbleChart from 'components/Chart/ApexChart/components/bubble'
import Apex3DBubbleChart from 'components/Chart/ApexChart/components/3dBubble'
import {Helmet} from "react-helmet";

const ApexChart = () => {
  return (
    <Fragment>
      <h2 className="breadcumbTitle">ApexChart</h2>
      <Grid container spacing={3}>
        <Grid item xl={4} lg={6} xs={12}>
          <Card title="Radial Chart">
            <ApexRadialChart/>
          </Card>
        </Grid>
        <Grid item xl={4} lg={6} xs={12}>
          <Card title="Pie Chart">
            <ApexPieChart/>
          </Card>
        </Grid>
        <Grid item xl={4} xs={12}>
          <Card title="Radar Chart">
            <ApexRadarlChart/>
          </Card>
        </Grid>
        <Grid item xl={6} xs={12}>
          <Card title="Line Chart">
            <ApexLineChart/>
          </Card>
        </Grid>
        <Grid item xl={6} xs={12}>
          <Card title="Line Chart">
            <ApexAreaChart/>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card title="Candle Stike Chart">
            <ApexCandleStikeChart/>
          </Card>
        </Grid>
        <Grid item xl={6} xs={12}>
          <Card title="Bubble Chart">
            <ApexBubbleChart/>
          </Card>
        </Grid>
        <Grid item xl={6} xs={12}>
          <Card title="3D Bubble Chart">
            <Apex3DBubbleChart/>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default ApexChart;
