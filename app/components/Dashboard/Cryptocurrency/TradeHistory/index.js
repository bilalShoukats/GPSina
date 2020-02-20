import React from 'react';
import Card from "../../../Card";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from "@material-ui/core/Grid";

import './style.scss';

const tradeHistory = [
  {
    price: '$9,320.53',
    amount: '1.0125',
    amount_corrency_type: 'BTC',
  },
  {
    price: '$483.43',
    amount: '2.6540',
    amount_corrency_type: 'ETH',
  }, {
    price: '$330.24',
    amount: '5.6403',
    amount_corrency_type: 'LTC',
  }, {
    price: '$83,630.68',
    amount: '9.0849',
    amount_corrency_type: 'BTC',
  }, {
    price: '$236.92',
    amount: '4.0465',
    amount_corrency_type: 'LTC',
  }, {
    price: '$199.45',
    amount: '3.4065',
    amount_corrency_type: 'ETH',
  }, {
    price: '$80,552.38',
    amount: '8.7505',
    amount_corrency_type: 'BTC',
  }
];

const TradeHistory = () => {
  return (
    <Card title="Trade History">
      <Grid className="tradeHistory">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Prices($)</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tradeHistory.map((item, i) => {
              return (
                <TableRow key={i}>
                  <TableCell>{item.price}</TableCell>
                  <TableCell align="right">{item.amount} {item.amount_corrency_type}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Grid>
    </Card>
  )
};

export default TradeHistory;
