import React from 'react';
import {
    HorizontalGridLines,
    VerticalBarSeries,
    VerticalGridLines,
    XAxis,
    FlexibleWidthXYPlot,
    YAxis,
} from 'react-vis';

const VisBarChart = () => (
    <FlexibleWidthXYPlot
        xType="ordinal"
        height={250}
        xDistance={100}
    >
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis />
        <YAxis />
        <VerticalBarSeries
            data={[
                { x: 'Jan', y: 160 },
                { x: 'Feb', y: 154 },
                { x: 'Mar', y: 178 },
                { x: 'Apr', y: 250 },
                { x: 'May', y: 145 },
                { x: 'Jun', y: 145 },
                { x: 'Jul', y: 754 },
                { x: 'Aug', y: 875 },
                { x: 'Sep', y: 895 },
                { x: 'Oct', y: 521 },
                { x: 'Nov', y: 365 },
                { x: 'Dec', y: 368 },
            ]}
            color="#ff9966"
        />

        <VerticalBarSeries
            data={[
                { x: 'Jan', y: 160 },
                { x: 'Feb', y: 154 },
                { x: 'Mar', y: 178 },
                { x: 'Apr', y: 250 },
                { x: 'May', y: 145 },
                { x: 'Jun', y: 145 },
                { x: 'Jul', y: 754 },
                { x: 'Aug', y: 875 },
                { x: 'Sep', y: 895 },
                { x: 'Oct', y: 521 },
                { x: 'Nov', y: 365 },
                { x: 'Dec', y: 368 },
            ]}
            color="#343a40"
        />
    </FlexibleWidthXYPlot>
);


export default VisBarChart;
