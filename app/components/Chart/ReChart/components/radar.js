import React from 'react';
import {
    Radar, RadarChart, PolarGrid, Legend,
    PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip
} from 'recharts';
import { Grid } from '@material-ui/core'
const data = [
    { subject: 'Total User', A: 120, B: 110, fullMark: 150, },
    { subject: 'Inactive User', A: 98, B: 130, fullMark: 150, },
    { subject: 'Suspend User', A: 86, B: 130, fullMark: 150, },
    { subject: 'Global User', A: 99, B: 100, fullMark: 150, },
    { subject: 'Country User', A: 85, B: 90, fullMark: 150, },
    { subject: 'Special User', A: 65, B: 85, fullMark: 130, },
];

const RadarRechart = () => {
    return (
        <Grid className="responsiveRechart">
            <ResponsiveContainer>
                <RadarChart data={data}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <Tooltip />
                    <PolarRadiusAxis angle={30} domain={[0, 150]} />
                    <Radar name="Wallet" dataKey="B" stroke="#8fd3f4" fill="#8fd3f4" fillOpacity={0.75} />
                    <Radar name="Deposit" dataKey="A" stroke="#6fac85" fill="#6fac85" fillOpacity={0.3} />
                    <Legend />
                </RadarChart>
            </ResponsiveContainer>
        </Grid>
    );
}

export default RadarRechart
