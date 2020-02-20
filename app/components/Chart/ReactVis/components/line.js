import React from 'react';
import {
    HorizontalGridLines, LineSeries, VerticalGridLines, XAxis, FlexibleWidthXYPlot, YAxis,
} from 'react-vis';

const LineSeriesChart = ({ t }) => (
    <FlexibleWidthXYPlot height={250}>
        <HorizontalGridLines />
        <VerticalGridLines />
        <XAxis />
        <YAxis />
        <LineSeries
            className="reactVisSvgLine"
            curve="curveMonotoneX"
            data={[
                { x: 1, y: 3 },
                { x: 2, y: 5 },
                { x: 3, y: 15 },
                { x: 4, y: 12 },
            ]}
            color="#70bbfd"
        />
        <LineSeries
            className="reactVisSvgLine"
            curve="curveMonotoneX"
            data={[
                { x: 1, y: 10 },
                { x: 2, y: 4 },
                { x: 3, y: 2 },
                { x: 4, y: 15 },
            ]}
            color="#c88ffa"
        />
        <LineSeries
            className="reactVisSvgLine"
            curve="curveMonotoneX"
            data={[
                { x: 1, y: 7 },
                { x: 2, y: 11 },
                { x: 3, y: 9 },
                { x: 4, y: 2 },
            ]}
            color="#f6da6e"
        />
    </FlexibleWidthXYPlot>
);
export default LineSeriesChart;
