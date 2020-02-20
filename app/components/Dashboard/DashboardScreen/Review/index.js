import React from 'react';
import Card from "../../../Card";
import { Grid } from '@material-ui/core'

import './style.scss';

const systems = [
    {
        name: '5 Star',
        value: '47'
    },
    {
        name: '4 Star',
        value: '67'
    },
    {
        name: '3 Star',
        value: '29'
    },
    {
        name: '2 Star',
        value: '12'
    },
    {
        name: '1 Star',
        value: '3'
    },
]

const Review = () => {
    return (
        <Card title="Reviews">
            <Grid className="progressbarList">
                {systems.map((item, i) => {
                    return (
                        <Grid key={i} className="pBarItem">
                            <p>{item.name}</p>
                            <Grid className="pBarArea">
                                <span className="pbar" style={{ width: `${item.value}%` }}></span>
                                <span className="pText">{item.value}%</span>
                            </Grid>
                        </Grid>
                    )
                })}
            </Grid>
        </Card>
    )
}
export default Review;