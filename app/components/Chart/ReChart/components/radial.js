import React from 'react';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer, Tooltip, } from 'recharts';
import { Grid } from '@material-ui/core'
const data = [
    { name: 'Total User', user: 2540, fill: '#6fac85', },
    { name: 'Active user', user: 1570, fill: '#8fd3f4', },
    { name: 'Deleted User', user: 1050, fill: '#ff9966', },
    { name: 'Inactive User', user: 560, fill: '#ff7175', },
];

const RadialRechart = () => {
    return (
        <Grid className="responsiveRechart">
            <ResponsiveContainer>
                <RadialBarChart
                    innerRadius={10}
                    barSize={10}
                    data={data}
                >
                    <RadialBar
                        minAngle={12}
                        label={{ position: 'insideStart', fill: '#fff ' }}
                        background
                        dataKey="user"
                    />
                    <Tooltip cursor={{ strokeDasharray: '.0001 .0001' }} />
                    <Legend
                        iconSize={10}
                        verticalAlign="bottom"
                    />
                </RadialBarChart>
            </ResponsiveContainer>
        </Grid>
    );
}

export default RadialRechart
