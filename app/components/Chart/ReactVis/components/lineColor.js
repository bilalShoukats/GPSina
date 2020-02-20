import React from 'react';
import {
    HorizontalGridLines, LineSeries, VerticalGridLines, XAxis, FlexibleWidthXYPlot, YAxis,
} from 'react-vis';

const data = [];

for (let i = 0; i < 20; i += 1) {
    const series = [];
    for (let j = 0; j < 100; j += 1) {
        series.push({ x: j, y: ((i / 10) + 1) * Math.sin((Math.PI * (i + j)) / 50) });
    }
    data.push({
        color: i, key: i, data: series, opacity: 0.8,
    });
}

const LineSeriesWithManyColors = () => (
    <FlexibleWidthXYPlot
        height={250}
        colorType="linear"
        colorDomain={[4, 8, 4, 8]}
        colorRange={['#6fac85', '#8fd3f4', '#ff5e62', '#ff9966']}
    >
        <HorizontalGridLines />
        <VerticalGridLines />
        <XAxis />
        <YAxis />
        {data.map(props => <LineSeries className="reactVisSvgLine" {...props} />)}
    </FlexibleWidthXYPlot>
);

export default LineSeriesWithManyColors;
