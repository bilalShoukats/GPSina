import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {Grid} from '@material-ui/core'
import Card from 'components/Card/Loadable'
import messages from './messages';
import './style.scss'

import logo from 'images/logo.png';
import {Helmet} from "react-helmet";

const invoice = [
  {
    item: 'Asus Zenfone 3 Zoom ZE553KL Dual Sim (4GB, 64GB)',
    quantity: 2,
    price: 480,
  },
  {
    item: 'Asus Zenfone 4 Zoom ZHFJ578 Dual Sim (3GB, 32GB)',
    quantity: 5,
    price: 678,
  },
  {
    item: 'Asus Zenfone 8 Zoom ZE553KL Dual Sim (2GB, 5GB)',
    quantity: 10,
    price: 754,
  },
]

const Invoice = () => {
  return (
    <Fragment>
      <h2 className="breadcumbTitle">Invoice</h2>
      <Card
        className="invoiceWrapper"
      >
        <Grid className="invoiceHeader">
          <ul className="invoiceList">
            <li><img src={logo} alt=""/></li>
            <li>Amonor, Inc.</li>
            <li>9498 Harvard Street</li>
            <li>Fairfield, Chicago Town 06824</li>
            <li>Phone: <span>(123) 456-7890</span></li>
          </ul>
          <h2>INVOICE</h2>
        </Grid>
        <Grid className="invoiceHeaderBottom">
          <Grid container>
            <Grid item lg={10}>
              <h3>Invoice To:</h3>
              <ul className="address">
                <li>Genting Holdings.</li>
                <li>8626 Maiden Dr.</li>
                <li>Niagara Falls, New York 14304</li>
              </ul>
            </Grid>
            <Grid item lg={2}>
              <ul className="invoiceNumber">
                <li>Invoice No : <span>#1668</span></li>
                <li>Date : <span>25/7/2018</span></li>
              </ul>
            </Grid>
          </Grid>
        </Grid>
        <Grid className="tableResponsive">
          <table className="tableWrapper">
            <thead>
            <tr>
              <th>No.</th>
              <th>Items</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
            </thead>
            <tbody>
            {invoice.map((item, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{item.item}</td>
                <td>{item.quantity}</td>
                <td>{item.price + '$'}</td>
                <td>{item.quantity * item.price + '$'}</td>
              </tr>
            ))}

            </tbody>
          </table>
        </Grid>
        <ul className="tableButton">
          <li>Sub - Total amount: <span>$7,325</span></li>
          <li>vat (10%) : <span>$232</span></li>
          <li><h3>Total : <span>$7,557.00</span></h3></li>
        </ul>
        <p className="contentDetails">In exceptional circumstances, Financial Services can provide an urgent manually
          processed special cheque. Note, however, that urgent special cheques should be requested only on an emergency
          basis as manually produced cheques involve duplication of effort and considerable staff resources. Requests
          need to be supported by a letter explaining the circumstances to justify the special cheque payment.</p>
        <Grid className="invoiceFooter">
          <div className="footerInvoiceLogo">
            <img src={logo} alt=""/>
          </div>
          <Grid></Grid>
          <ul className="invoiceFooterRight">
            <li><span>Phone:</span> 917-290-5344 x386</li>
            <li>godfrey@email.com</li>
          </ul>
        </Grid>
      </Card>
    </Fragment>
  );
}

Invoice.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(Invoice);
