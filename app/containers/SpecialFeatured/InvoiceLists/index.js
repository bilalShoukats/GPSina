/**
 *
 * InvoiceLists
 *
 */

import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import saga from './saga';
import messages from './messages';

import { Grid, Button } from '@material-ui/core'
import Card from '../../../components/Card'
import { Link } from 'react-router-dom';

const invoicelist = [
    {
        name: 'john doe',
        issue: '18 Jan 2019',
        due: '18 Jan 2019',
        paid: '18 Jan 2019',
        billed: '$145.00',
        received: '$0.00',
        status: 'pending'
    },
    {
        name: 'Michaela Weimann',
        issue: '18 Jan 2019',
        due: '18 Jan 2019',
        paid: '18 Jan 2019',
        billed: '$145.00',
        received: '$0.00',
        status: 'draft'
    },
    {
        name: 'Carol Glover',
        issue: '18 Jan 2019',
        due: '18 Jan 2019',
        paid: '18 Jan 2019',
        billed: '$145.00',
        received: '$0.00',
        status: 'overdue'
    },
    {
        name: 'Domenico Heidenreich',
        issue: '18 Jan 2019',
        due: '18 Jan 2019',
        paid: '18 Jan 2019',
        billed: '$145.00',
        received: '$0.00',
        status: 'paid'
    },
    {
        name: 'Gordon Koelpin',
        issue: '18 Jan 2019',
        due: '18 Jan 2019',
        paid: '18 Jan 2019',
        billed: '$145.00',
        received: '$0.00',
        status: 'pending'
    },
]

export function InvoiceLists() {
    useInjectSaga({ key: 'invoiceLists', saga });

    return (
      <Fragment>
        <h2 className="breadcumbTitle">Invoice Lists</h2>
        <Card>
            <Grid className='tableResponsive'>
                <table className="tableWrapper">
                    <thead className="tableHead">
                        <tr className="tableRow">
                            <th>No</th>
                            <th>Client</th>
                            <th>Issue</th>
                            <th>Due</th>
                            <th>Paid</th>
                            <th>Billed</th>
                            <th>Received</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className="tableBody">
                        {invoicelist.map((item, i) => (
                            <tr className="tableRow" key={i}>
                                <td><strong>{i + 1}</strong></td>
                                <td>{item.name}</td>
                                <td>{item.issue}</td>
                                <td>{item.due}</td>
                                <td>{item.paid}</td>
                                <td>{item.billed}</td>
                                <td>{item.received}</td>
                                <td>
                                    {item.status && <span className={`badge 
                                                ${
                                        item.status === 'paid' && 'badge-success ' ||
                                        item.status === 'overdue' && 'badge-danger' ||
                                        item.status === 'draft' && 'badge-default' ||
                                        item.status === 'pending' && 'badge-warning text-warning'
                                        }
                                                `}>
                                        {item.status}
                                    </span>}
                                </td>
                                <td>
                                    <Grid className="actions">
                                        <Button component={Link} to="/invoice" className="actionBtn badge-success"><i className="fa fa-eye"></i></Button>
                                    </Grid>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </Grid>
        </Card>
      </Fragment>
    );
}

InvoiceLists.propTypes = {
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

export default compose(withConnect)(InvoiceLists);
