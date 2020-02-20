import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { ToastContainer, toast } from 'react-toastify';
import makeSelectResetPassword from './selectors';
import reducer from './reducer';
import messages from './messages';
import { Grid, TextField, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import Joi from 'joi-browser'
import { SuperHOC } from '../../../HOC';

import './style.scss'

// images 
import logo from 'images/logo-white.png'
import loginImg from 'images/login-bg.png'

class ForgotPassword extends Component {
    state = {
        email: '',
        remember: false,
        showpass: false,
        error: {}
    }

    schema = {
        email: Joi.string().email({ minDomainAtoms: 2 }).required().error(errors => {
            errors.forEach(err => {
                switch (err.type) {
                    case "string.email":
                        err.message = "Please enter valid email address";
                        break;
                    default: err.message = "Email cannot be empty";
                        break;
                }
            });
            return errors;
        })
    }
    changeHandler = event => {
        const error = { ...this.state.error };
        const errorMassage = this.validationProperty(event);
        if (errorMassage) {
            error[event.target.name] = errorMassage;
        } else {
            delete error[event.target.name];
        }
        this.setState({
            [event.target.name]: event.target.value,
            error
        })
    };

    validationProperty = event => {
        const Obj = { [event.target.name]: event.target.value };
        const schema = { [event.target.name]: this.schema[event.target.name] }
        const { error } = Joi.validate(Obj, schema);
        return error ? error.details[0].message : null
    };

    validate = () => {
        const options = { abortEarly: false }
        const form = {
            email: this.state.email,
        }
        const { error } = Joi.validate(form, this.schema, options)
        if (!error) return null;

        const errors = {};
        for (let item of error.details) errors[item.path[0]] = item.message
        return errors;
    };

    checkHandler = () => {
        this.setState({
            remember: !this.state.remember
        })
    }
    showpasshandler = () => {
        this.setState({
            showpass: !this.state.showpass
        })
    }
    submitHandler = (e) => {
        e.preventDefault()
        const error = this.validate()
        if (!error) {
            let body = {
                email: this.state.email
            }
            this.props.apiManager.makeCall("forgotPassword", body, (response) => {
                if (response.code === 1024) {
                    toast.success('Email sent successfully!')
                    this.props.history.push('/')
                }
                else
                    toast.error(response.id)
            });
        } else {
            this.setState({
                error: error || {}
            })
        }
    }
    render() {
        return (
            <Fragment>
                <Helmet>
                    <title>Reset password</title>
                    <meta name="description" content="Description of Login" />
                </Helmet>
                <Grid className="accountArea">
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <form className="accountWrapper" onSubmit={this.submitHandler}>
                                <Grid className="bgShaperight" style={{ background: `url(${loginImg})left center/cover no-repeat` }}></Grid>
                                <Grid className="accountForm">
                                    <div className="fromTitle">
                                        <h2>Reset Password</h2>
                                        <p>Enter your email address below and we’ll send you a link to reset your password</p>
                                    </div>
                                    <TextField
                                        label="Email"
                                        placeholder="Your email here.."
                                        fullWidth
                                        variant="outlined"
                                        name="email"
                                        onChange={this.changeHandler}
                                        value={this.state.email}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        error={this.state.error.email && true}
                                        helperText={this.state.error.email && this.state.error.email}
                                        className="formInput"
                                    />
                                    <Button type="submit" className="btn bg-default accountBtn">Reset Password</Button>
                                    <p className="subText mt-16">Don't have an acount? <Link to="/register"> Create free account</Link></p>
                                </Grid>
                            </form>
                        </Grid>
                    </Grid>
                </Grid>
            </Fragment>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    resetPassword: makeSelectResetPassword(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

// export default compose(withConnect)(ForgotPassword);
export default SuperHOC((withConnect)(ForgotPassword));
