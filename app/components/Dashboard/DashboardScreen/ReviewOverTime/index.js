import React from 'react';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { Grid } from '@material-ui/core'
import Card from '../../../Card';

const data = [
    {
        name: 'Jan', Task: 500,
    },
    {
        name: 'Feb', Task: 300,
    },
    {
        name: 'Mar', Task: 200,
    },
    {
        name: 'Apr', Task: 278,
    },
    {
        name: 'May', Task: 189,
    },
    {
        name: 'Jun', Task: 239,
    },
    {
        name: 'Jul', Task: 420,
    },
    {
        name: 'Aug', Task: 320,
    },
    {
        name: 'Sep', Task: 480,
    },
    {
        name: 'Oct', Task: 349,
    },
    {
        name: 'Nov', Task: 490,
    },
    {
        name: 'Dec', Task: 150,
    },
];

const ReviewOverTime = () => {
    return (
        <Card title="Review Over Time">
            <Grid className="responsiveRechart">
                <ResponsiveContainer>
                    <BarChart
                        data={data}
                    >
                        <CartesianGrid vertical={false} stroke="#f9f9f9" strokeDasharray="0" />
                        <XAxis axisLine={false} tickLine={false} tickMargin={10} dataKey="name" tick={{ fill: '#878AA0', fontSize: '14px' }} />
                        <YAxis axisLine={false} tickLine={false} tickMargin={10} tick={{ fill: '#878AA0', fontSize: '14px' }} />
                        <Tooltip cursor={{ fill: '#f9f9f9' }} />
                        <Bar dataKey="Task" stackId="a" barSize={20} fill="#F1682C" />
                    </BarChart>
                </ResponsiveContainer>
            </Grid>
        </Card>
    )
}

export default ReviewOverTime