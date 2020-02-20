import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import {
    Grid,
} from '@material-ui/core';
import './style.scss'

const BasicTable = ({ tablesData, tableHead, className }) => {
    return (
        <Grid className='tableResponsive'>
            <table className={`tableWrapper ${className}`}>
                <thead className="tableHead">
                    <tr className="tableRow">
                        {tableHead.map(head => (
                            <th key={head}>{head}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className="tableBody">
                    {tablesData.map((item, i) => (
                        <tr className="tableRow" key={i}>
                            <td>{i + 1}</td>
                            <td>
                                <img className="imgAvatar" src={item.image} alt="" />
                            </td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td>
                                {item.status && <span className={`badge 
                                                ${
                                    item.status === 'active' && 'badge-success ' ||
                                    item.status === 'inactive' && 'badge-danger' ||
                                    item.status === 'rejected' && 'badge-danger' ||
                                    item.status === 'pending' && 'badge-warning text-warning'
                                    }
                                                `}>
                                    {item.status}
                                </span>}
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </Grid>
    );
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(
    null,
    mapDispatchToProps,
);

export default compose(withConnect)(BasicTable);
