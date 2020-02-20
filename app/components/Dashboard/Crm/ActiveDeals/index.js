import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {Grid} from '@material-ui/core';
import Card from '../../../Card';

import img1 from '../../../../images/team/task_member.png';
import img2 from '../../../../images/team/task_member1.png';
import img3 from '../../../../images/team/task_member2.png';
import img4 from '../../../../images/team/task_member3.png';

import './style.scss';
import Button from "@material-ui/core/Button";

const rows = [
  {
    name: 'Anker Acesa',
    progress: 'approval',
    amount: '$1,581,524',
    contact_name: 'William Davis',
    contact_thumb: img1,
    created_at: '01-01-2020',
    last_updated: '07-01-2020',
  },
  {
    name: 'Florence Carter',
    progress: 'underwriting',
    amount: '$1,581,524',
    contact_name: 'Cody thebuits',
    contact_thumb: img2,
    created_at: '01-01-2020',
    last_updated: '07-01-2020',
  },
  {
    name: 'Air filters',
    progress: 'underwriting',
    amount: '$1,581,524',
    contact_name: 'Sue Molloy',
    contact_thumb: img3,
    created_at: '01-01-2020',
    last_updated: '07-01-2020',
  },
  {
    name: 'Florence Carter',
    progress: 'approval',
    amount: '$1,581,524',
    contact_name: 'William Davis',
    contact_thumb: img4,
    created_at: '01-01-2020',
    last_updated: '07-01-2020',
  },
];

const ActiveDeals = () => (
  <Card title="Active Deals">
    <Grid className="responsiveTable">
      <Table className="postTable" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Progress</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Contact</TableCell>
            <TableCell>Created</TableCell>
            <TableCell>Last Updated</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i}>
              <TableCell component="th" scope="row">
                <strong>{row.name}</strong>
              </TableCell>
              <TableCell component="th" scope="row">
                <Button className={`cBtn cBtnSmall ${row.progress === 'approval' ? 'cBtnPrimary' : row.progress === 'underwriting' ? 'cBtnDanger' : ''}`} size="small">{row.progress}</Button>
              </TableCell>
              <TableCell component="th" scope="row">
                <strong>{row.amount}</strong>
              </TableCell>
              <TableCell component="th" scope="row">
                <Grid className="flex">
                  <Grid className="icon">
                    <img src={row.contact_thumb} alt="contact_thumb"/>
                  </Grid>
                  <strong>{row.contact_name}</strong>
                </Grid>
              </TableCell>
              <TableCell>
                <strong>{row.created_at}</strong>
              </TableCell>
              <TableCell>
                <strong>{row.last_updated}</strong>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Grid>
  </Card>
);
export default ActiveDeals;
