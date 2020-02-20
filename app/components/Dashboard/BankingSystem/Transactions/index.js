import React from 'react';
import Card from "../../../Card";
import Grid from "@material-ui/core/Grid";
import ScrollArea from 'react-scrollbar';

import icon1 from '../../../../images/icons/transactions/auth-icon1.png';
import icon2 from '../../../../images/icons/transactions/auth-icon2.png';
import icon3 from '../../../../images/icons/transactions/auth-icon3.png';
import icon4 from '../../../../images/icons/transactions/auth-icon4.png';

import './style.scss';

const transList = [
  {
    icon: icon1,
    title: 'For The Bill',
    type: 'sent',
    name: 'William Davis',
    amount: '1350.00',
    currency_type: 'BTC',
    created_at: '05 Nov',
    created_time: '11:19 AM',
  },
  {
    icon: icon2,
    title: 'From Client',
    type: 'received',
    name: 'Cody  Thibeault',
    amount: '3278.00',
    currency_type: 'BTC',
    created_at: '04 Nov',
    created_time: '02:58 PM',
  },
  {
    icon: icon3,
    title: 'Funds Issue',
    type: 'decline',
    name: 'Sue Molloy',
    amount: '6541.00',
    currency_type: 'BTC',
    created_at: '02 Nov',
    created_time: '05:54 PM',
  },
  {
    icon: icon4,
    title: 'A Watch',
    type: 'bought',
    name: 'Eloise Reinke',
    amount: '3670.00',
    currency_type: 'BTC',
    created_at: '30 Oct',
    created_time: '08:19 PM',
  },
  {
    icon: icon1,
    title: 'For The Bill',
    type: 'sent',
    name: 'William Davis',
    amount: '1350.00',
    currency_type: 'BTC',
    created_at: '05 Nov',
    created_time: '11:19 AM',
  },
  {
    icon: icon2,
    title: 'From Client',
    type: 'received',
    name: 'Cody  Thibeault',
    amount: '3278.00',
    currency_type: 'BTC',
    created_at: '04 Nov',
    created_time: '02:58 PM',
  },
  {
    icon: icon3,
    title: 'Funds Issue',
    type: 'decline',
    name: 'Sue Molloy',
    amount: '6541.00',
    currency_type: 'BTC',
    created_at: '02 Nov',
    created_time: '05:54 PM',
  },
  {
    icon: icon4,
    title: 'A Watch',
    type: 'bought',
    name: 'Eloise Reinke',
    amount: '3670.00',
    currency_type: 'BTC',
    created_at: '30 Oct',
    created_time: '08:19 PM',
  },
];

const Transactions = () => {
  return (
    <Card
      name="See All"
      link="/"
      title="Transactions"
    >
      <Grid className="transactionsLists">
        <ScrollArea>
          {transList.map((item, i) => {
            return (
              <Grid key={i} className="transItem">
                <Grid className="icon">
                  <img src={item.icon} alt="icon"/>
                </Grid>
                <Grid className="title">
                  <h4>{item.name}</h4>
                  <p>{item.created_at}</p>
                </Grid>
                <Grid className="amount">
                  <h4>${item.amount}</h4>
                  <p>{item.type}</p>
                </Grid>
              </Grid>
            )
          })}
        </ScrollArea>
      </Grid>
    </Card>
  )
};

export default Transactions;
