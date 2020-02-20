import React from 'react';
import Card from "../../../Card";
import Grid from "@material-ui/core/Grid";

import './style.scss';

const loans = [
  {
    title: 'Car Loan',
    amount: '$9,700',
    percentage: 70,
    color: '#3B53DB'
  },
  {
    title: 'Home Loan',
    amount: '$13,450',
    percentage: 40,
    color: '#BD20D3'
  },
  {
    title: 'Cash Loan',
    amount: '$6,500',
    percentage: 45,
    color: '#F1682C'
  },
  {
    title: 'Renewable',
    amount: '$8,000',
    percentage: 0,
    color: '#0EB7FE'
  },
];

const Loans = () => {
  return (
    <Card title="Loans">
      <Grid className="loansWrapper">
        <h2>Total $37,650</h2>
        <Grid container spacing={3}>
          {loans.map((item, i) => {
            return (
              <Grid key={i} item sm={6} xs={12}>
                <Grid className="loanCard">
                  <h4>{item.title}</h4>
                  <Grid className="lbtm">
                    <h3>{item.amount}</h3>
                    <Grid className="lprogressbar">
                      <span className="prbg" style={{background: item.color}}/>
                      <span className="lpbar" style={{width: `${item.percentage}%`, background: item.color}}/>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            )
          })}
        </Grid>
      </Grid>
    </Card>
  )
};

export default Loans;
