import React, {useState} from 'react';
import {AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area, ResponsiveContainer, Legend} from 'recharts';
import Card from "../../../Card";

import './style.scss';
import Grid from "@material-ui/core/Grid";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";

const data1 = [
  {
    "name": "Sat",
    "workload": 4500,
  },
  {
    "name": "Sun",
    "workload": 4000,
  },
  {
    "name": "Mon",
    "workload": 8385,
  },
  {
    "name": "Mon",
    "workload": 4000,
  },
  {
    "name": "Mon",
    "workload": 4500,
  },
];

const data2 = [
  {
    "name": "Sat",
    "workload": 500,
  },
  {
    "name": "Sun",
    "workload": 400,
  },
  {
    "name": "Mon",
    "workload": 838,
  },
  {
    "name": "Mon",
    "workload": 400,
  },
  {
    "name": "Mon",
    "workload": 400,
  },
];

const CustomTooltip = ({active, payload, label}) => {
  if (active) {
    return (
      <div className="custom-tooltip">
        <h4 className="label">${payload[0].value}</h4>
      </div>
    );
  }
  return null;
};

const InVestment = () => {
  const [tab, setTab] = useState(1);
  return (
    <Card
      title="Investment"
      className="p-0"
    >
      <Grid className="invesmentWrapper">
        <Grid className="invesmentInner">
          {tab === 1 ? <ResponsiveContainer>
            <AreaChart data={data1} margin={{top: 0, right: 0, left: 0, bottom: 0}}>
              <defs>
                <linearGradient id="colorWorkload" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#BD20D3" stopOpacity={0.5}/>
                  <stop offset="80%" stopColor="#BD20D3" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid horizontal={false} vertical={false} stroke="#f1f1f1"/>
              <Tooltip content={<CustomTooltip/>}/>
              <Area position={{x: 400, y: 0}} type="natural" name="workload" dataKey="workload" strokeWidth={3}
                    stroke="#BD20D3" fillOpacity={1}
                    fill="url(#colorWorkload)"/>
            </AreaChart>
          </ResponsiveContainer> : ''}
          {tab === 2 ? <ResponsiveContainer>
            <AreaChart data={data2} margin={{top: 0, right: 0, left: 0, bottom: 0}}>
              <defs>
                <linearGradient id="colorWorkload" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#BD20D3" stopOpacity={0.5}/>
                  <stop offset="80%" stopColor="#BD20D3" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid horizontal={false} vertical={false} stroke="#f1f1f1"/>
              <Tooltip content={<CustomTooltip/>}/>
              <Area position={{x: 400, y: 0}} type="natural" name="workload" dataKey="workload" strokeWidth={3}
                    stroke="#BD20D3" fillOpacity={1}
                    fill="url(#colorWorkload)"/>
            </AreaChart>
          </ResponsiveContainer> : ''}
        </Grid>
        <Grid className="switchInvestChart">
          <ButtonGroup fullWidth size="large">
            <Button className={tab === 1 && 'active'} onClick={() => setTab(1)} disableFocusRipple
                    fullWidth>Weekly</Button>
            <Button className={tab === 2 && 'active'} onClick={() => setTab(2)} disableFocusRipple
                    fullWidth>Monthly</Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    </Card>
  )
};

export default InVestment;
