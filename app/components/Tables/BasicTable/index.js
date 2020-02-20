import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import messages from './messages';
import Card from 'components/Card/Loadable'
import BasicTable from './basicTable'
import Pagination from 'components/Pagination'
import { Grid } from '@material-ui/core'
import './style.scss'

// images
import image from 'images/team/img1.jpg'
import image2 from 'images/team/img2.jpg'
import image3 from 'images/team/img3.jpg'

const tables = [
    { image: image, name: 'Luther M. Roach', email: 'roach@jourrapide.com', phone: '412-206-6478', status: 'active' },
    { image: image2, name: 'Rosemary F. Goebel', email: 'goebel@jourrapide.com', phone: '979 - 488 - 2394', status: 'inactive' },
    { image: image3, name: 'Jarvis M. Wells', email: 'JarvisMWells@rhyta.com', phone: '605-855 - 8626', status: 'pending' },
    { image: image, name: 'Luther M. Roach', email: 'roach@jourrapide.com', phone: '412-206-6478', status: 'active' },
    { image: image2, name: 'Rosemary F. Goebel', email: 'goebel@jourrapide.com', phone: '979 - 488 - 2394', status: 'inactive' },
]
const tablehead = ['#', 'image', 'Name', 'Email', 'Phone', 'Status']

const tablesPaginations = [
    { image: image, name: 'Luther M. Roach', email: 'roach@jourrapide.com', phone: '412-206-6478', status: 'active' },
    { image: image2, name: 'Rosemary F. Goebel', email: 'goebel@jourrapide.com', phone: '979 - 488 - 2394', status: 'inactive' },
    { image: image3, name: 'Jarvis M. Wells', email: 'JarvisMWells@rhyta.com', phone: '605-855 - 8626', status: 'pending' },
    { image: image, name: 'Luther M. Roach', email: 'roach@jourrapide.com', phone: '412-206-6478', status: 'active' },
    { image: image2, name: 'Rosemary F. Goebel', email: 'goebel@jourrapide.com', phone: '979 - 488 - 2394', status: 'inactive' },
    { image: image, name: 'Luther M. Roach', email: 'roach@jourrapide.com', phone: '412-206-6478', status: 'active' },
    { image: image2, name: 'Rosemary F. Goebel', email: 'goebel@jourrapide.com', phone: '979 - 488 - 2394', status: 'inactive' },
    { image: image3, name: 'Jarvis M. Wells', email: 'JarvisMWells@rhyta.com', phone: '605-855 - 8626', status: 'pending' },
    { image: image, name: 'Luther M. Roach', email: 'roach@jourrapide.com', phone: '412-206-6478', status: 'active' },
    { image: image2, name: 'Rosemary F. Goebel', email: 'goebel@jourrapide.com', phone: '979 - 488 - 2394', status: 'inactive' },
    { image: image, name: 'Luther M. Roach', email: 'roach@jourrapide.com', phone: '412-206-6478', status: 'active' },
    { image: image2, name: 'Rosemary F. Goebel', email: 'goebel@jourrapide.com', phone: '979 - 488 - 2394', status: 'inactive' },
    { image: image3, name: 'Jarvis M. Wells', email: 'JarvisMWells@rhyta.com', phone: '605-855 - 8626', status: 'pending' },
    { image: image, name: 'Luther M. Roach', email: 'roach@jourrapide.com', phone: '412-206-6478', status: 'active' },
    { image: image2, name: 'Rosemary F. Goebel', email: 'goebel@jourrapide.com', phone: '979 - 488 - 2394', status: 'inactive' },
    { image: image, name: 'Luther M. Roach', email: 'roach@jourrapide.com', phone: '412-206-6478', status: 'active' },
    { image: image2, name: 'Rosemary F. Goebel', email: 'goebel@jourrapide.com', phone: '979 - 488 - 2394', status: 'inactive' },
    { image: image3, name: 'Jarvis M. Wells', email: 'JarvisMWells@rhyta.com', phone: '605-855 - 8626', status: 'pending' },
    { image: image, name: 'Luther M. Roach', email: 'roach@jourrapide.com', phone: '412-206-6478', status: 'active' },
    { image: image2, name: 'Rosemary F. Goebel', email: 'goebel@jourrapide.com', phone: '979 - 488 - 2394', status: 'inactive' },
]

class BasicTablePages extends Component {
    state = {
        tables: tablesPaginations,
        pageOfItems: []
    }

    onChangePage = (pageOfItems) => {
        this.setState({ pageOfItems: pageOfItems });
    }
    render() {
        return (
            <Fragment>
                <Helmet>
                    <title>Basic Table</title>
                    <meta name="description" content="Description of BasicTable" />
                </Helmet>
                <h2 className="breadcumbTitle">Basic Table</h2>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Card
                            title="Basic Table"
                            className="basicTable"
                        >
                            <BasicTable
                                tablesData={tables}
                                tableHead={tablehead}
                            />
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card
                            title="Striped rows Table"
                            className="basicTable"
                        >
                            <BasicTable
                                tablesData={tables}
                                tableHead={tablehead}
                                className="tableStriped"
                            />
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card
                            title="Border rows Table"
                            className="basicTable"
                        >
                            <BasicTable
                                tablesData={tables}
                                tableHead={tablehead}
                                className="tableBorder"
                            />
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card
                            title="Inverse table"
                            className="basicTable"
                        >
                            <BasicTable
                                tablesData={tables}
                                tableHead={tablehead}
                                className="tableInverse"
                            />
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card
                            title="Hoverable Table"
                            className="basicTable"
                        >
                            <BasicTable
                                tablesData={tables}
                                tableHead={tablehead}
                                className="tableHoder"
                            />
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card
                            title="Pagination Table"
                            className="basicTable"
                        >
                            <BasicTable
                                tablesData={this.state.pageOfItems}
                                tableHead={tablehead}
                                className="tableHoder"
                            />
                            <Pagination
                                rowShow={5}
                                className="pt-30"
                                items={this.state.tables}
                                onChangePage={this.onChangePage}
                            />
                        </Card>
                    </Grid>
                </Grid>
            </Fragment>
        )
    }
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

export default compose(withConnect)(BasicTablePages);
