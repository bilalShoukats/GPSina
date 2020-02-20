import React from 'react';
import Card from "../../../Card";
import Grid from "@material-ui/core/Grid";

import visa from '../../../../images/visa.png';

import './style.scss';

const CreditCard = () => {
  return (
    <Card
      title="Credit Card"
      link="/"
      name="Add Card"
    >
      <Grid className="masterCard">
        <h5>Plutinam Plus</h5>
        <h2>Bruce Lambert</h2>
        <p className="cardNumber">5126 4587 2214 5845</p>
        <Grid className="mcardFooter">
          <img src={visa} alt="visa"/>
          <p>12/07</p>
        </Grid>
      </Grid>
    </Card>
  )
};

export default CreditCard;
