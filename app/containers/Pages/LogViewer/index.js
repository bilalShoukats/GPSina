import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import Card from 'components/Card/Loadable'
import { Table, TableBody, TableHead, TableCell, TableRow, Grid } from '@material-ui/core'
import messages from './messages';
import './style.scss'

const logviewer = [
    { url: 'Debug', date: '13/04/2019 18:25:59', details: 'my.host - oh snap! another exception', icon: 'bug', color: 'text-primary' },
    { url: 'Info', date: '30/08/2019 18:25:59', details: '"GET / HTTP/1.1" 200 1225', icon: 'info', color: 'text-info' },
    { url: 'Warning', date: '05/04/2019 18:25:59', details: 'DocumentRoot [/var/www/porto-admin/] does not exist', icon: 'exclamation-triangle', color: 'text-warning' },
    { url: 'Error', date: '15/04/2019 18:25:59', details: 'File does not exist: /var/www/porto-admin/favicon.ico', icon: 'times-circle ', color: 'text-danger' },
    { url: 'Fatal', date: '13/04/2019 18:25:59', details: 'not a tree object', icon: 'ban ', color: 'text-warning' },
]


const LogViewer = () => {
    return (
        <Fragment>
            <Helmet>
                <title>Log Viewer</title>
                <meta name="description" content="Description of LogViewer" />
            </Helmet>
            <h2 className="breadcumbTitle">Log Viewer</h2>
            <Card
                title="Log Viewer"
                className="logViewerArea"
            >
                <Grid className="tableResponsive">
                    <table className="tableWrapper">
                        <thead>
                            <tr>
                                <th>Url</th>
                                <th>Date</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logviewer.map((item, i) => (
                                <tr key={i}>
                                    <td><i className={`fa fa-${item.icon} ${item.color} mr-5`} /> {item.url} </td>
                                    <td>{item.date}</td>
                                    <td>{item.details}</td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </Grid>
            </Card>
        </Fragment>
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

export default compose(withConnect)(LogViewer);
