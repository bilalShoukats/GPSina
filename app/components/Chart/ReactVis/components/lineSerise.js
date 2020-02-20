import React, { PureComponent } from 'react';
import {
    HorizontalGridLines, LineMarkSeries, VerticalGridLines, XAxis, FlexibleWidthXYPlot, YAxis,
} from 'react-vis';

function getRandomData() {
    return (new Array(500)).fill(0).map((row, i) => ({
        x: i,
        y: Math.random() * 20,
    }));
}

class LineSeries extends PureComponent {

    constructor() {
        super();
        this.state = {
            data: getRandomData(),
        };
    }

    render() {
        const { data } = this.state;

        const lineSeriesProps = {
            color: '#8fd3f4',
            strokeWidth: 1,
            strokeColor: '#fff',
            data,
        };

        return (
            <FlexibleWidthXYPlot
                height={250}
            >
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis />
                <YAxis />
                <LineMarkSeries
                    className="reactVisSvgLine"
                    {...lineSeriesProps}
                />
            </FlexibleWidthXYPlot>
        );
    }
}

export default LineSeries;
