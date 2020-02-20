import React from 'react';
import { Tooltip, Area, ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Legend, Scatter, ComposedChart, Bar, Line } from 'recharts';
import { Grid } from '@material-ui/core'
const data = [
    { name: 'Jan', sale: 590, order: 800, user: 1400, active: 590, },
    { name: 'Feb', sale: 868, order: 967, user: 1506, active: 868, },
    { name: 'Mar', sale: 1397, order: 1098, user: 989, active: 1397, },
    { name: 'Apr', sale: 1480, order: 1200, user: 1228, active: 1480, },
    { name: 'May', sale: 1520, order: 1108, user: 1100, active: 1520, },
    { name: 'Jun', sale: 1400, order: 680, user: 1700, active: 1400, },
    { name: 'Jul', sale: 590, order: 800, user: 1400, active: 590, },
    { name: 'Aug', sale: 868, order: 967, user: 1506, active: 868, },
    { name: 'Sep', sale: 1397, order: 1098, user: 989, active: 1397, },
    { name: 'Oct', sale: 1480, order: 1200, user: 1228, active: 1480, },
    { name: 'Nov', sale: 1520, order: 1108, user: 1100, active: 1520, },
    { name: 'Dec', sale: 1400, order: 680, user: 1700, active: 1400, },
];

const ComposedRechart = () => {
    return (
        <Grid className="responsiveRechart">
            <ResponsiveContainer>
                <ComposedChart
                    data={data}
                >
                    <CartesianGrid stroke="#fafafa" />
                    <XAxis stroke="#708093" dataKey="name" />
                    <YAxis stroke="#708093" />
                    <Tooltip cursor={{ strokeDasharray: '1 1' }} />
                    <Legend />
                    <Area type="monotone" dataKey="user" fill="#8fd3f4" stroke="#8fd3f4" />
                    <Bar dataKey="order" barSize={20} fill="#6fac85" />
                    <Line type="monotone" dataKey="sale" stroke="#ff5e62" />
                    <Scatter dataKey="active" fill="#ff9966" />
                </ComposedChart>
            </ResponsiveContainer>
        </Grid>
    );
}

export default ComposedRechart
