import React from 'react';
import { Area, XAxis, Tooltip, ResponsiveContainer, AreaChart, YAxis, Legend } from 'recharts';
import { Grid } from '@material-ui/core'
const data = [
    { name: 'Jan', conversions: 8750, rate: 3000, exit: 8759, },
    { name: 'Feb', conversions: 2657, rate: 8752, exit: 6980, },
    { name: 'Mar', conversions: 6500, rate: 4500, exit: 2290, },
    { name: 'Apr', conversions: 4000, rate: 3000, exit: 2000, },
    { name: 'May', conversions: 3800, rate: 8500, exit: 6874, },
    { name: 'Jun', conversions: 6000, rate: 12000, exit: 3698, },
    { name: 'Jul', conversions: 11000, rate: 9875, exit: 9875, },
    { name: 'Aug', conversions: 5800, rate: 5421, exit: 8100, },
    { name: 'Sep', conversions: 2500, rate: 6800, exit: 4568, },
    { name: 'Oct', conversions: 5876, rate: 9875, exit: 2100, },
    { name: 'Nov', conversions: 3700, rate: 3698, exit: 5768, },
    { name: 'Dec', conversions: 9875, rate: 14785, exit: 6540, },
];

const GradientRechart = () => {
    return (
        <Grid className="responsiveRechart">
            <ResponsiveContainer>
                <AreaChart
                    data={data}
                >
                    <defs>
                        <linearGradient id="conversion" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="10%" stopColor="#6fac85" stopOpacity={0.65} />
                            <stop offset="90%" stopColor="#6fac85" stopOpacity={.25} />
                        </linearGradient>
                    </defs>
                    <defs>
                        <linearGradient id="rate" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="10%" stopColor="#8fd3f4" stopOpacity={0.75} />
                            <stop offset="90%" stopColor="#8fd3f4" stopOpacity={.25} />
                        </linearGradient>
                    </defs>
                    <XAxis stroke="#708093" dataKey="name" />
                    <YAxis stroke="#708093" />
                    <Legend stroke="#708093" />
                    <Tooltip cursor={{ strokeDasharray: '1 1' }} />
                    <Area type="monotone" dataKey="conversions" stroke="#6fac85" fillOpacity={.5} fill="url(#conversion)" />
                    <Area type="monotone" dataKey="rate" stroke="#8fd3f4" fillOpacity={.5} fill="url(#rate)" />
                </AreaChart>
            </ResponsiveContainer>
        </Grid>
    );
}

export default GradientRechart
