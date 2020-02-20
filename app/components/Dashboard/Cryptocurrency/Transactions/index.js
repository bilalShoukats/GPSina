import React from 'react';
import Card from "../../../Card";
import Grid from "@material-ui/core/Grid";
import ScrollArea from 'react-scrollbar';

import sent from '../../../../images/icons/transactions/sent.png';
import received from '../../../../images/icons/transactions/received.png';
import decline from '../../../../images/icons/transactions/decline.png';
import bought from '../../../../images/icons/transactions/bought.png';

import './style.scss';

const transList = [
  {
    title: 'For The Bill',
    type: 'sent',
    name: 'William Davis',
    amount: '0.44',
    currency_type: 'BTC',
    created_at: '05 Nov',
    created_time: '11:19 AM',
  },
  {
    title: 'From Client',
    type: 'received',
    name: 'Cody  Thibeault',
    amount: '0.64',
    currency_type: 'BTC',
    created_at: '04 Nov',
    created_time: '02:58 PM',
  },
  {
    title: 'Funds Issue',
    type: 'decline',
    name: 'Sue Molloy',
    amount: '0.321',
    currency_type: 'BTC',
    created_at: '02 Nov',
    created_time: '05:54 PM',
  },
  {
    title: 'A Watch',
    type: 'bought',
    name: 'Eloise Reinke',
    amount: '0.798',
    currency_type: 'BTC',
    created_at: '30 Oct',
    created_time: '08:19 PM',
  },
  {
    title: 'For The Bill',
    type: 'sent',
    name: 'William Davis',
    amount: '0.44',
    currency_type: 'BTC',
    created_at: '05 Nov',
    created_time: '11:19 AM',
  },
  {
    title: 'From Client',
    type: 'received',
    name: 'Cody  Thibeault',
    amount: '0.64',
    currency_type: 'BTC',
    created_at: '04 Nov',
    created_time: '02:58 PM',
  },
  {
    title: 'Funds Issue',
    type: 'decline',
    name: 'Sue Molloy',
    amount: '0.321',
    currency_type: 'BTC',
    created_at: '02 Nov',
    created_time: '05:54 PM',
  },
  {
    title: 'A Watch',
    type: 'bought',
    name: 'Eloise Reinke',
    amount: '0.798',
    currency_type: 'BTC',
    created_at: '30 Oct',
    created_time: '08:19 PM',
  },
];


function transIcon(type) {
  switch (type) {
    case 'sent':
      return sent;
    case 'received':
      return received;
    case 'decline':
      return decline;
    default:
      return bought;
  }
}

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
                  <img src={transIcon(item.type)} alt="icon"/>
                </Grid>
                <Grid className="title">
                  <h4>{item.type}: {item.title} </h4>
                  <p>{item.name}</p>
                </Grid>
                <Grid className="amount">
                  <h4>{item.amount} {item.currency_type}</h4>
                  <p>{item.created_at} | {item.created_time}</p>
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
