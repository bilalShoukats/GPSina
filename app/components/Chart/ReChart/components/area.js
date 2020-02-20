import React from 'react';
import { Tooltip, Area, ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Legend } from 'recharts';
import { Grid } from '@material-ui/core'
const data = [
    { name: 'Jan', uv: 2000, pv: 3000, amt: 2400, },
    { name: 'Feb', uv: 4800, pv: 3800, amt: 2210, },
    { name: 'Mar', uv: 6500, pv: 4500, amt: 2290, },
    { name: 'Apr', uv: 4000, pv: 3000, amt: 2000, },
    { name: 'May', uv: 3800, pv: 5000, amt: 2181, },
    { name: 'Jun', uv: 6000, pv: 2500, amt: 2500, },
    { name: 'Jul', uv: 3000, pv: 2000, amt: 2100, },
    { name: 'Aug', uv: 5800, pv: 1800, amt: 8100, },
    { name: 'Sep', uv: 2500, pv: 6800, amt: 2100, },
    { name: 'Oct', uv: 2200, pv: 1200, amt: 2100, },
    { name: 'Nov', uv: 3700, pv: 1000, amt: 2100, },
    { name: 'Dec', uv: 1500, pv: 5000, amt: 2100, },
];

const AreaRechart = () => {
    return (
        <Grid className="responsiveRechart">
            <ResponsiveContainer>
                <AreaChart
                    data={data}
                >
                    <CartesianGrid stroke="#fafafa" />
                    <XAxis stroke="#708093" dataKey="name" />
                    <YAxis stroke="#708093" />
                    <Legend stroke="#708093" />
                    <Tooltip cursor={{ strokeDasharray: '1 1' }} />
                    <Area type="monotone" dataKey="uv" stroke="#8fd3f4" fill="#8fd3f4" />
                    <Area type="monotone" dataKey="pv" stroke="#8fd3f4" fill="#8fd3f4" />
                </AreaChart>
            </ResponsiveContainer>
        </Grid>
    );
}

export default AreaRechart
