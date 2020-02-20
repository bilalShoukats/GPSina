import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Grid } from '@material-ui/core';
import Card from '../../../Card';

import img1 from '../../../../images/team/task_member.png';
import img2 from '../../../../images/team/task_member1.png';
import img3 from '../../../../images/team/task_member2.png';
import img4 from '../../../../images/team/task_member3.png';

import './style.scss';

const rows = [
    {
        icon: img1,
        name: 'Florence Carter',
        progress: 85,
        start_date: 'Nov 5',
        end_date: 'Nov 7',
        spent_time: '00:00:00',
        weekly_limit: '40:00:00',
        remaining: '40:00:00',
    },
    {
        icon: img2,
        name: 'Emerson Zulauf',
        progress: 45,
        start_date: 'Nov 5',
        end_date: 'Nov 7',
        spent_time: '00:00:00',
        weekly_limit: '40:00:00',
        remaining: '40:00:00',
    },
    {
        icon: img3,
        name: 'Benjamin Jones',
        progress: 35,
        start_date: 'Nov 5',
        end_date: 'Nov 7',
        spent_time: '00:00:00',
        weekly_limit: '40:00:00',
        remaining: '40:00:00',
    },
    {
        icon: img4,
        name: 'Ned Runolfsson',
        progress: 75,
        start_date: 'Nov 5',
        end_date: 'Nov 7',
        spent_time: '00:00:00',
        weekly_limit: '40:00:00',
        remaining: '40:00:00',
    },
];

const Report = () => (
    <Card title="Report">
        <Grid className="responsiveTable">
            <Table className="postTable" aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Members</TableCell>
                        <TableCell>Progress</TableCell>
                        <TableCell>Shift</TableCell>
                        <TableCell>Time Spent</TableCell>
                        <TableCell>Weekly Limit</TableCell>
                        <TableCell>Remaining</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, i) => (
                        <TableRow key={i}>
                            <TableCell component="th" scope="row">
                                <Grid className="flex">
                                    <Grid className="icon">
                                        <img src={row.icon} alt="thumb" />
                                    </Grid>
                                    <strong className="uThum">{row.name}</strong>
                                </Grid>
                            </TableCell>
                            <TableCell>
                                <Grid className="progress">
                                    <Grid className="pBar" style={{ width: `${row.progress}%` }}></Grid>
                                </Grid>
                            </TableCell>
                            <TableCell>{row.start_date} - {row.end_date}</TableCell>
                            <TableCell>{row.spent_time}</TableCell>
                            <TableCell>{row.weekly_limit}</TableCell>
                            <TableCell>{row.remaining}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Grid>
    </Card>
)
export default Report;