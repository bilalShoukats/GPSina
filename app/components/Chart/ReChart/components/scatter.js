import React from 'react';
import { Tooltip, ResponsiveContainer, ScatterChart, CartesianGrid, XAxis, YAxis, Legend, ZAxis, Scatter } from 'recharts';
import { Grid } from '@material-ui/core'

const data01 = [{ sale: 10, order: 30 }, { sale: 30, order: 200 }, { sale: 45, order: 100 }, { sale: 50, order: 400 }, { sale: 70, order: 150 }, { sale: 100, order: 250 }];
const data02 = [{ sale: 30, order: 20 }, { sale: 50, order: 180 }, { sale: 75, order: 240 }, { sale: 100, order: 100 }, { sale: 120, order: 190 }];

const ScatterRechart = () => {
    return (
        <Grid className="responsiveRechart">
            <ResponsiveContainer>
                <ScatterChart
                >
                    <CartesianGrid stroke="#fafafa" />
                    <XAxis type="number" stroke="#708093" dataKey="sale" name="Total" unit=" Sale" />
                    <YAxis type="number" stroke="#708093" dataKey="order" name="Total" unit=" Order" />
                    <Legend stroke="#708093" />
                    <ZAxis type="number" stroke="#708093" range={[100]} />
                    <Tooltip stroke="#708093" cursor={{ strokeDasharray: '1 1' }} />
                    <Scatter name="Company 1" data={data01} fill="#6fac85" line shape="cross" />
                    <Scatter name="Company 2" data={data02} fill="#8fd3f4" line shape="diamond" />
                </ScatterChart>
            </ResponsiveContainer>
        </Grid>
    );
}

export default ScatterRechart
