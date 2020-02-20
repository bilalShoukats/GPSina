import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import Card from 'components/Card/Loadable'

import { compose } from 'redux';

import messages from './messages';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, Link, ButtonGroup } from '@material-ui/core';
import SplitButton from './components/splitButton'
import 'sass/elements/buttons.scss'

const useStyles = makeStyles(theme => ({
    input: {
        display: 'none',
    },
}));

const Buttons = () => {
    const classes = useStyles();
    return (
        <Fragment>
            <Helmet>
                <title>Buttons</title>
                <meta name="description" content="Description of Buttons" />
            </Helmet>
            <h2 className="breadcumbTitle">Buttons</h2>
            <Grid container spacing={3}>
                <Grid item lg={6} xs={12}>
                    <Card
                        title="General Buttons"
                    >
                        <ul className="buttonList">
                            <li><Button className='btn bg-default' >Default</Button></li>
                            <li><Button className='btn bg-success' >Success</Button></li>
                            <li><Button className='btn bg-primary' >Primary</Button></li>
                            <li><Button className='btn bg-secondary' >secondary</Button></li>
                            <li><Button className='btn bg-danger' >danger</Button></li>
                            <li><Button className='btn bg-warning' >warning</Button></li>
                            <li><Button className='btn bg-info' >info</Button></li>
                            <li><Button className='btn bg-light text-dark' >light</Button></li>
                            <li><Button className='btn bg-dark' >dark</Button></li>
                            <li><Button disabled className='btn btn-disabled'>Disabled</Button></li>
                            <li>
                                <input
                                    accept="image/*"
                                    className={classes.input}
                                    id="contained-button-file"
                                    multiple
                                    type="file"
                                />
                                <label htmlFor="contained-button-file">
                                    <Button component="span" className="btn bg-default">
                                        Upload
                                    </Button>
                                </label>
                            </li>
                            <li><input className="btn btn-submit bg-success" type="submit" /></li>
                        </ul>
                    </Card>
                </Grid>
                <Grid item lg={6} xs={12}>
                    <Card
                        title="Rounded Buttons"
                    >
                        <ul className="buttonList">
                            <li><Button component={Link} herf="#" className='btn bg-default btn-radius'>Default</Button></li>
                            <li><Button className='btn bg-success btn-radius'>Success</Button></li>
                            <li><Button className='btn bg-primary btn-radius'>Primary</Button></li>
                            <li><Button className='btn bg-secondary btn-radius'>secondary</Button></li>
                            <li><Button className='btn bg-danger btn-radius'>danger</Button></li>
                            <li><Button className='btn bg-warning btn-radius'>warning</Button></li>
                            <li><Button className='btn bg-info btn-radius'>info</Button></li>
                            <li><Button className='btn bg-light btn-radius'>light</Button></li>
                            <li><Button className='btn bg-dark btn-radius'>dark</Button></li>
                            <li><Button disabled className='btn btn-radius btn-disabled'>Disabled</Button></li>
                            <li>
                                <input
                                    accept="image/*"
                                    className={classes.input}
                                    id="contained-button-file"
                                    multiple
                                    type="file"
                                />
                                <label htmlFor="contained-button-file">
                                    <Button component="span" className="btn bg-default btn-radius">
                                        Upload
                                    </Button>
                                </label>
                            </li>
                            <li><input className="btn btn-submit bg-success btn-radius" type="submit" /></li>
                        </ul>
                    </Card>
                </Grid>
                <Grid item lg={6} xs={12}>
                    <Card
                        title="Contained Buttons"
                    >
                        <ul className="buttonList">
                            <li><Button variant="contained" component={Link} herf="#" className='btn bg-default btn-radius'>Default</Button></li>
                            <li><Button variant="contained" className='btn bg-success btn-radius'>Success</Button></li>
                            <li><Button variant="contained" className='btn bg-primary btn-radius'>Primary</Button></li>
                            <li><Button variant="contained" className='btn bg-secondary btn-radius'>secondary</Button></li>
                            <li><Button variant="contained" className='btn bg-danger btn-radius'>danger</Button></li>
                            <li><Button variant="contained" className='btn bg-warning btn-radius'>warning</Button></li>
                            <li><Button variant="contained" className='btn bg-info btn-radius'>info</Button></li>
                            <li><Button variant="contained" className='btn bg-light btn-radius'>light</Button></li>
                            <li><Button variant="contained" className='btn bg-dark btn-radius'>dark</Button></li>
                            <li><Button variant="contained" disabled className='btn btn-radius btn-disabled'>Disabled</Button></li>
                            <li>
                                <input
                                    accept="image/*"
                                    className={classes.input}
                                    id="contained-button-file"
                                    multiple
                                    type="file"
                                />
                                <label htmlFor="contained-button-file">
                                    <Button variant="contained" component="span" className="btn bg-default btn-radius">
                                        Upload
                                    </Button>
                                </label>
                            </li>
                        </ul>
                    </Card>
                </Grid>
                <Grid item lg={6} xs={12}>
                    <Card
                        title="Text Buttons"
                    >
                        <ul className="buttonList">
                            <li><Button component={Link} herf="#" className='btn text-default btn-text'>Default</Button></li>
                            <li><Button className='btn text-success btn-text'>Success</Button></li>
                            <li><Button className='btn text-primary btn-text'>Primary</Button></li>
                            <li><Button className='btn text-secondary btn-text'>secondary</Button></li>
                            <li><Button className='btn text-danger btn-text'>danger</Button></li>
                            <li><Button className='btn text-warning btn-text'>warning</Button></li>
                            <li><Button className='btn text-info btn-text'>info</Button></li>
                            <li><Button className='btn text-light btn-text'>light</Button></li>
                            <li><Button className='btn text-dark btn-text'>dark</Button></li>
                            <li><Button disabled className='btn btn-disabled btn-text'>Disabled</Button></li>
                            <li>
                                <input
                                    accept="image/*"
                                    className={classes.input}
                                    id="contained-button-file"
                                    multiple
                                    type="file"
                                />
                                <label htmlFor="contained-button-file">
                                    <Button component="span" className="btn text-default btn-text">
                                        Upload
                                    </Button>
                                </label>
                            </li>
                            <li><input className="btn btn-submit text-success btn-text" type="submit" /></li>
                        </ul>
                    </Card>
                </Grid>
                <Grid item lg={6} xs={12}>
                    <Card
                        title="Outlined Buttons"
                    >
                        <ul className="buttonList">
                            <li><Button component={Link} herf="#" className='btn text-default btn-text btn-outlined'>Default</Button></li>
                            <li><Button className='btn text-success btn-text btn-outlined'>Success</Button></li>
                            <li><Button className='btn text-primary btn-text btn-outlined'>Primary</Button></li>
                            <li><Button className='btn text-secondary btn-text btn-outlined'>secondary</Button></li>
                            <li><Button className='btn text-danger btn-text btn-outlined'>danger</Button></li>
                            <li><Button className='btn text-warning btn-text btn-outlined'>warning</Button></li>
                            <li><Button className='btn text-info btn-text btn-outlined'>info</Button></li>
                            <li><Button className='btn text-light btn-text btn-outlined'>light</Button></li>
                            <li><Button className='btn text-dark btn-text btn-outlined'>dark</Button></li>
                            <li><Button disabled className='btn btn-disabled btn-text btn-outlined'>Disabled</Button></li>
                            <li>
                                <input
                                    accept="image/*"
                                    className={classes.input}
                                    id="contained-button-file"
                                    multiple
                                    type="file"
                                />
                                <label htmlFor="contained-button-file">
                                    <Button component="span" className="btn text-default btn-text btn-outlined">
                                        Upload
                                    </Button>
                                </label>
                            </li>
                            <li><input className="btn btn-submit text-success btn-text btn-outlined" type="submit" /></li>
                        </ul>
                    </Card>
                </Grid>
                <Grid item lg={6} xs={12}>
                    <Card
                        title="Grouped Buttons"
                    >
                        <ButtonGroup fullWidth>
                            <Button className="btn bg-success">One</Button>
                            <Button className="btn bg-primary">Two</Button>
                            <Button className="btn bg-danger">Three</Button>
                        </ButtonGroup>
                    </Card>
                </Grid>
                <Grid item lg={6} xs={12}>
                    <Card
                        title="Split Button"
                    >
                        <SplitButton />
                    </Card>
                </Grid>
                <Grid item lg={6} xs={12}>
                    <Card
                        title="Buttons with icons and label"
                    >
                        <ul className="buttonList">
                            <li>
                                <Button className='btn bg-default btn-icon'>
                                    <span className="icon"><i className="fa fa-cog" /></span>
                                    Default
                                </Button>
                            </li>
                            <li>
                                <Button className='btn bg-success btn-icon'>
                                    <span className="icon"><i className="fa fa-cog" /></span>
                                    Success
                                </Button>
                            </li>
                            <li>
                                <Button className='btn bg-primary btn-icon'>
                                    <span className="icon"><i className="fa fa-cog" /></span>
                                    Primary
                                </Button>
                            </li>
                            <li>
                                <Button className='btn bg-secondary btn-icon'>
                                    <span className="icon"><i className="fa fa-cog" /></span>
                                    secondary
                                 </Button>
                            </li>
                            <li>
                                <Button className='btn bg-danger btn-icon'>
                                    <span className="icon"><i className="fa fa-cog" /></span>
                                    danger</Button>
                            </li>
                            <li>
                                <Button className='btn bg-warning btn-icon'>
                                    <span className="icon"><i className="fa fa-cog" /></span>
                                    warning
                                </Button>
                            </li>
                            <li>
                                <Button className='btn bg-info btn-icon'>
                                    <span className="icon"><i className="fa fa-cog" /></span>
                                    info
                                </Button>
                            </li>
                            <li>
                                <Button className='btn bg-light btn-icon'>
                                    <span className="icon"><i className="fa fa-cog" /></span>
                                    light
                                </Button>
                            </li>
                            <li>
                                <Button className='btn bg-dark btn-icon'>
                                    <span className="icon"><i className="fa fa-cog" /></span>
                                    dark
                                </Button>
                            </li>
                            <li>
                                <Button disabled className='btn btn-disabled btn-icon'>
                                    <span className="icon"><i className="fa fa-cog" /></span>
                                    Disabled
                                </Button>
                            </li>
                            <li>
                                <input
                                    accept="image/*"
                                    className={classes.input}
                                    id="contained-button-file"
                                    multiple
                                    type="file"
                                />
                                <label htmlFor="contained-button-file">
                                    <Button component="span" className="btn bg-default btn-icon">
                                        <i className="fa fa-cog" />
                                        Upload
                                    </Button>
                                </label>
                            </li>
                            <li><input className="btn btn-submit bg-success" type="submit" /></li>
                        </ul>
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

export default compose(withConnect)(Buttons);
