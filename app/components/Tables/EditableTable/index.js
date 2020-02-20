import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import Card from 'components/Card/Loadable'
import { Grid } from '@material-ui/core'
import { compose } from 'redux';
import ReactDataGrid from 'react-data-grid';
import update from 'immutability-helper';
import messages from './messages';
import './style.scss'

const heads = [
    {
        key: 'id',
        name: '#',
        width: 80,
    },
    {
        key: 'first_name',
        name: 'First Name',
        editable: true,
    },
    {
        key: 'last_name',
        name: 'Last Name',
        editable: true,
    },
    {
        key: 'user',
        name: 'Username',
        editable: true,
    },
    {
        key: 'age',
        name: 'Age',
        editable: true,
    },
    {
        key: 'date',
        name: 'Date',
        editable: true,
    },
    {
        key: 'location',
        name: 'Location',
        editable: true,
    },
    {
        key: 'work',
        name: 'Work',
        editable: true,
    },
];

const rows = [
    {
        id: 1,
        first_name: 'kaji Hasibur',
        last_name: 'Rahman',
        width: 80,
        user: 'kajihasib',
        age: 25,
        date: '30/12/1997',
        location: 'Khulna',
        work: 'Front-end Developer'
    },
    {
        id: 2,
        first_name: 'Victor',
        last_name: 'K. Rios',
        width: 80,
        user: 'Victor',
        age: '41 years old',
        date: '15/12/1997',
        location: 'Taurus',
        work: 'Layden'
    },
    {
        id: 3,
        first_name: 'kaji Hasibur',
        last_name: 'Rahman',
        width: 80,
        user: 'kajihasib',
        age: 25,
        date: '30/12/1997',
        location: 'Khulna',
        work: 'Front-end Developer'
    },
    {
        id: 4,
        first_name: 'kaji Hasibur',
        last_name: 'Rahman',
        width: 80,
        user: 'kajihasib',
        age: 25,
        date: '30/12/1997',
        location: 'Khulna',
        work: 'Front-end Developer'
    },
    {
        id: 5,
        first_name: 'kaji Hasibur',
        last_name: 'Rahman',
        width: 80,
        user: 'kajihasib',
        age: 25,
        date: '30/12/1997',
        location: 'Khulna',
        work: 'Front-end Developer'
    },
    {
        id: 6,
        first_name: 'kaji Hasibur',
        last_name: 'Rahman',
        width: 80,
        user: 'kajihasib',
        age: 25,
        date: '30/12/1997',
        location: 'Khulna',
        work: 'Front-end Developer'
    },
    {
        id: 7,
        first_name: 'kaji Hasibur',
        last_name: 'Rahman',
        width: 80,
        user: 'kajihasib',
        age: 25,
        date: '30/12/1997',
        location: 'Khulna',
        work: 'Front-end Developer'
    },
    {
        id: 8,
        first_name: 'kaji Hasibur',
        last_name: 'Rahman',
        width: 80,
        user: 'kajihasib',
        age: 25,
        date: '30/12/1997',
        location: 'Khulna',
        work: 'Front-end Developer'
    },
    {
        id: 9,
        first_name: 'kaji Hasibur',
        last_name: 'Rahman',
        width: 80,
        user: 'kajihasib',
        age: 25,
        date: '30/12/1997',
        location: 'Khulna',
        work: 'Front-end Developer'
    },
    {
        id: 10,
        first_name: 'kaji Hasibur',
        last_name: 'Rahman',
        width: 80,
        user: 'kajihasib',
        age: 25,
        date: '30/12/1997',
        location: 'Khulna',
        work: 'Front-end Developer'
    },
];


class EditableTable extends Component {
    constructor(props, context) {
        super(props, context);
        const originalRows = rows;
        this.state = {
            rows,
            originalRows,
        };
    }


    handleGridRowsUpdated = ({ fromRow, toRow, updated }) => {
        let { rows } = this.state;
        rows = rows.slice();

        for (let i = fromRow; i <= toRow; i += 1) {
            const rowToUpdate = rows[i];
            rows[i] = update(rowToUpdate, { $merge: updated });
        }

        this.setState({ rows });
    };

    handleGridSort = (sortColumn, sortDirection) => {
        const comparer = (a, b) => {
            if (sortDirection === 'ASC') {
                return (a[sortColumn] > b[sortColumn]) ? 1 : -1;
            } if (sortDirection === 'DESC') {
                return (a[sortColumn] < b[sortColumn]) ? 1 : -1;
            }
        };

        const { originalRows } = this.state;
        const sortRows = originalRows.slice(0);
        const rows = sortDirection === 'NONE' ? originalRows.slice(0, 10) : sortRows.sort(comparer).slice(0, 10);

        this.setState({ rows });
    };

    rowGetter = (i) => {
        const { rows } = this.state;
        return rows[i];
    };

    render() {
        return (
            <Fragment>
                <Helmet>
                    <title>Editable Table</title>
                    <meta name="description" content="Description of EditableTable" />
                </Helmet>
                <h2 className="breadcumbTitle">Editable Table</h2>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Card
                            title="Editable Table"
                            className="editableTableWrapper"
                        >
                            <ReactDataGrid
                                onGridSort={this.handleGridSort}
                                columns={heads}
                                rowGetter={this.rowGetter}
                                rowsCount={rows.length}
                                onGridRowsUpdated={this.handleGridRowsUpdated}
                                rowHeight={60}
                                enableCellSelect
                                minColumnWidth={100}
                            />
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card
                            title="Striped Rows Editable Table"
                            classNameText=".stripedEditableTable"
                        >
                            <ReactDataGrid
                                onGridSort={this.handleGridSort}
                                columns={heads}
                                rowGetter={this.rowGetter}
                                enableCellSelect
                                rowsCount={rows.length}
                                onGridRowsUpdated={this.handleGridRowsUpdated}
                                rowHeight={60}
                                minColumnWidth={100}
                            />
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card
                            title="Inverse Table Editable Table"
                            classNameText=".inverseEditableTable"
                        >
                            <ReactDataGrid
                                onGridSort={this.handleGridSort}
                                columns={heads}
                                rowGetter={this.rowGetter}
                                enableCellSelect
                                rowsCount={rows.length}
                                onGridRowsUpdated={this.handleGridRowsUpdated}
                                rowHeight={60}
                                minColumnWidth={100}
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

export default compose(withConnect)(EditableTable);
