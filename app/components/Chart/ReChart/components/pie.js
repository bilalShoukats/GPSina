import React, { useState } from 'react';
import { ResponsiveContainer, PieChart, Sector, Pie, } from 'recharts';
import { Grid } from '@material-ui/core'

const orders = [
    { name: 'Active', value: 800 },
    { name: 'Pending', value: 600 },
    { name: 'Delivered', value: 500 },
    { name: 'Shipping', value: 600 },
];


const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
        cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
        fill, payload, percent, value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 5}
                outerRadius={outerRadius + 8}
                fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`Order ${value}`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                {`(Rate ${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};


const PieRechart = () => {
    const [activeIndex, setActiveIndex] = useState(0)

    const onPieEnter = (data, index) => {
        setActiveIndex(index)
    };
    return (
        <Grid className="responsiveRechart">
            <ResponsiveContainer>
                <PieChart>
                    <defs>
                        <linearGradient id="orderStatus" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="20%" stopColor="#3b53db" stopOpacity={.60} />
                            <stop offset="80%" stopColor="#3b53db" stopOpacity={.80} />
                        </linearGradient>
                    </defs>
                    <Pie
                        activeIndex={activeIndex}
                        activeShape={renderActiveShape}
                        data={orders}
                        innerRadius={100}
                        outerRadius={120}
                        fill="url(#orderStatus)"
                        dataKey="value"
                        onMouseEnter={onPieEnter}
                    />
                </PieChart>
            </ResponsiveContainer>
        </Grid>
    );
}

export default PieRechart
