import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {Grid} from '@material-ui/core';
import Card from '../../../Card';

import './style.scss';

const rows = [
  {
    invoice: '#0102019',
    customer: 'David Ohara',
    date: '05 Nove 2019',
    amount: '$350',
    status: 'Received',
    tracking: 'FD45AS',
  },
  {
    invoice: '#0102019',
    customer: 'Rachel Leung',
    date: '05 Nove 2019',
    amount: '$350',
    status: 'Received',
    tracking: 'FD45AS',
  },
  {
    invoice: '#0102019',
    customer: 'Mary Severin',
    date: '05 Nove 2019',
    amount: '$350',
    status: 'Pending',
    tracking: 'FD45AS',
  },
  {
    invoice: '#0102019',
    customer: 'Robert Drago',
    date: '05 Nove 2019',
    amount: '$350',
    status: 'Received',
    tracking: 'FD45AS',
  },
  {
    invoice: '#0102019',
    customer: 'Paula Moffatt',
    date: '05 Nove 2019',
    amount: '$350',
    status: 'Canceled',
    tracking: 'FD45AS',
  },
  {
    invoice: '#0102019',
    customer: 'Robert Roudebush',
    date: '05 Nove 2019',
    amount: '$350',
    status: 'Pending',
    tracking: 'FD45AS',
  },
  {
    invoice: '#0102019',
    customer: 'Glenn Monte',
    date: '05 Nove 2019',
    amount: '$350',
    status: 'Received',
    tracking: 'FD45AS',
  },
];

const OrderList = () => (
  <Card title="Order List">
    <Grid className="responsiveTable">
      <Table className="postTable" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Invoice</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Tracking</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i}>
              <TableCell component="th" scope="row">{row.invoice}</TableCell>
              <TableCell>{row.customer}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.amount}</TableCell>
              <TableCell><strong className={`${row.status}`}>{row.status}</strong></TableCell>
              <TableCell>{row.tracking}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Grid>
  </Card>
);
export default OrderList;
