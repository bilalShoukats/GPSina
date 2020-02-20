import React, { useState } from 'react';
import { Grid, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import Card from 'components/Card'
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import './style.scss'

const orders = [
    { orderId: '001', name: 'Bertha T. Stogner', delivarydDate: '30/07/2019', status: 'pending', quantity: 4, price: 160 },
    { orderId: '002', name: 'Angelo A. Skinner', delivarydDate: '31/07/2019', status: 'pending', quantity: 5, price: 145 },
    { orderId: '003', name: 'Richard M. Patterson', delivarydDate: '02/07/2019', status: 'compleate', quantity: 7, price: 321 },
    { orderId: '008', name: 'Jane M. Jeffery', delivarydDate: '03/07/2019', status: 'pending', quantity: 6, price: 160 },
    { orderId: '009', name: 'Juana M. Lewis', delivarydDate: '01/07/2019', status: 'compleate', quantity: 8, price: 160 },
]
const orderHeaders = ['Order Id', 'Name', 'Delivary Date', 'Status', 'Quantity', 'Price', 'Total']

const OrderList = () => {
    return (
        <Card
            title="Latest Order"
            className="orderList"
        >
            <Grid className="tableResponsive">
                <Table className="tableWrapper">
                    <TableHead className="tableHeader">
                        <TableRow>
                            {orderHeaders.map(head => (
                                <TableCell key={head}>{head}</TableCell>
                            ))}
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className="tableBody">
                        {orders.map((order, i) => (
                            <TableRow key={i}>
                                <TableCell component="th">{order.orderId}</TableCell>
                                <TableCell >{order.name}</TableCell>
                                <TableCell>{order.delivarydDate}</TableCell>
                                <TableCell>
                                    <span className={order.status === 'pending' ? 'badge badge-warning text-warning' : 'badge badge-success'}>{order.status}</span>
                                </TableCell>
                                <TableCell>{order.quantity}</TableCell>
                                <TableCell>{`$${order.price}`}</TableCell>
                                <TableCell>{`$${order.price * order.quantity}`}</TableCell>
                                <TableCell>
                                    <Button className="actionBtn bg-default" component={Link} to="/orders">
                                        <i className="fa fa-eye"></i>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Grid>
        </Card>
    );
}

export default OrderList;
