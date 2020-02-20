import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import messages from './messages';
import { Grid, Button, ClickAwayListener, Paper } from '@material-ui/core'
import Card from 'components/Card/Loadable'
import 'sass/elements/dropdowns.scss'

const Dropdown = () => {
    const [left, setLeft] = useState(false)
    const [right, setRight] = useState(false)
    const [top, setTop] = useState(false)
    const [bottom, setBottom] = useState(false)
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(prev => !prev);
    };

    const handleClickAway = () => {
        setOpen(false);
    };

    return (
        <Fragment>
            <Helmet>
                <title>Dropdown</title>
                <meta name="description" content="Description of Dropdown" />
            </Helmet>
            <h2 className="breadcumbTitle">Dropdown</h2>
            <Grid container spacing={3}>
                <Grid item lg={6} xs={12}>
                    <Card
                        title="Hover Dropdown"
                    >
                        <Grid container spacing={2}>
                            <Grid item xl={3} lg={6} md={4} sm={6} xs={12}>
                                <Grid className="dropdownWrapper hover">
                                    <Button className="bg-default">Left Dropdown <i className="fa fa-angle-down" /></Button>
                                    <ul className="dropdown left">
                                        <li>Dropdown 1</li>
                                        <li>Dropdown 2</li>
                                        <li>Dropdown 3</li>
                                        <li>Dropdown 4</li>
                                    </ul>
                                </Grid>
                            </Grid>
                            <Grid item xl={3} lg={6} md={4} sm={6} xs={12}>
                                <Grid className="dropdownWrapper hover ">
                                    <Button className="bg-success">Right Dropdown <i className="fa fa-angle-down" /></Button>
                                    <ul className="dropdown right">
                                        <li>Dropdown 1</li>
                                        <li>Dropdown 2</li>
                                        <li>Dropdown 3</li>
                                        <li>Dropdown 4</li>
                                    </ul>
                                </Grid>
                            </Grid>
                            <Grid item xl={3} lg={6} md={4} sm={6} xs={12}>
                                <Grid className="dropdownWrapper hover">
                                    <Button className="bg-primary">Top Dropdown <i className="fa fa-angle-down" /></Button>
                                    <ul className="dropdown top">
                                        <li>Dropdown 1</li>
                                        <li>Dropdown 2</li>
                                        <li>Dropdown 3</li>
                                        <li>Dropdown 4</li>
                                    </ul>
                                </Grid>
                            </Grid>
                            <Grid item xl={3} lg={6} md={4} sm={6} xs={12}>
                                <Grid className="dropdownWrapper hover">
                                    <Button className="bg-info">Bottom Dropdown <i className="fa fa-angle-down" /></Button>
                                    <ul className="dropdown bottom">
                                        <li>Dropdown 1</li>
                                        <li>Dropdown 2</li>
                                        <li>Dropdown 3</li>
                                        <li>Dropdown 4</li>
                                    </ul>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
                <Grid item lg={6} xs={12}>
                    <Card
                        title="Click Dropdown"
                    >
                        <Grid container spacing={2}>
                            <Grid item xl={3} lg={6} md={4} sm={6} xs={12}>
                                <Grid className={left ? 'dropdownWrapper active' : 'dropdownWrapper'}>
                                    <Button className="bg-default" onClick={() => setLeft(!left)}>Left Dropdown <i className={bottom ? 'fa fa-angle-up' : 'fa fa-angle-down'} /></Button>
                                    <ul className="dropdown left">
                                        <li>Dropdown 1</li>
                                        <li>Dropdown 2</li>
                                        <li>Dropdown 3</li>
                                        <li>Dropdown 4</li>
                                    </ul>
                                </Grid>
                            </Grid>
                            <Grid item xl={3} lg={6} md={4} sm={6} xs={12}>
                                <Grid className={right ? 'dropdownWrapper active' : 'dropdownWrapper'}>
                                    <Button className="bg-info" onClick={() => setRight(!right)}>Right Dropdown <i className={bottom ? 'fa fa-angle-up' : 'fa fa-angle-down'} /></Button>
                                    <ul className="dropdown right">
                                        <li>Dropdown 1</li>
                                        <li>Dropdown 2</li>
                                        <li>Dropdown 3</li>
                                        <li>Dropdown 4</li>
                                    </ul>
                                </Grid>
                            </Grid>
                            <Grid item xl={3} lg={6} md={4} sm={6} xs={12}>
                                <Grid className={top ? 'dropdownWrapper active' : 'dropdownWrapper'}>
                                    <Button className="bg-success" onClick={() => setTop(!top)}>Top Dropdown <i className={bottom ? 'fa fa-angle-up' : 'fa fa-angle-down'} /></Button>
                                    <ul className="dropdown top">
                                        <li>Dropdown 1</li>
                                        <li>Dropdown 2</li>
                                        <li>Dropdown 3</li>
                                        <li>Dropdown 4</li>
                                    </ul>
                                </Grid>
                            </Grid>
                            <Grid item xl={3} lg={6} md={4} sm={6} xs={12}>
                                <Grid className={bottom ? 'dropdownWrapper active' : 'dropdownWrapper'}>
                                    <Button className="bg-primary" onClick={() => setBottom(!bottom)}> Bottom Dropdown <i className={bottom ? 'fa fa-angle-up' : 'fa fa-angle-down'} /></Button>
                                    <ul className="dropdown bottom">
                                        <li>Dropdown 1</li>
                                        <li>Dropdown 2</li>
                                        <li>Dropdown 3</li>
                                        <li>Dropdown 4</li>
                                    </ul>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
                <Grid item lg={6} xs={12}>
                    <Card
                        title="Material Dropdown"
                    >
                        <Grid container spacing={2}>
                            <Grid item xl={3} lg={6} md={4} sm={6} xs={12}>
                                <ClickAwayListener onClickAway={handleClickAway}>
                                    <Grid className="dropdownWrapper">
                                        <Button className="bg-default" onClick={handleClick}>Open menu  <i className="fa fa-angle-down" /></Button>
                                        {open ? (
                                            <Paper>
                                                <ul className="dropdownItem">
                                                    <li>Dropdown 1</li>
                                                    <li>Dropdown 2</li>
                                                    <li>Dropdown 3</li>
                                                    <li>Dropdown 4</li>
                                                </ul>
                                            </Paper>
                                        ) : null}
                                    </Grid>
                                </ClickAwayListener>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
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

export default compose(withConnect)(Dropdown);
