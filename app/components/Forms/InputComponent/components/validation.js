import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Grid, TextField, InputAdornment, Button } from '@material-ui/core'
import Joi from 'joi-browser'

class InputValidation extends Component {
    state = {
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        phone: '',
        confirm_password: '',
        showpass: false,
        error: {}
    }

    schema = {
        email: Joi.string().email({ minDomainAtoms: 2 }).required().error(errors => {
            errors.forEach(err => {
                switch (err.type) {
                    case "string.email":
                        err.message = "Email Mast be a Valid email";
                        break;
                    default: err.message = "EMAIL can not be empty";
                        break;
                }
            });
            return errors;
        }),
        password: Joi.string().required().error(errors => {
            errors.forEach(err => {
                switch (err.type) {
                    default: err.message = "Password  can not be empty";
                        break;
                }
            });
            return errors;
        }),
        first_name: Joi.string().required().error(errors => {
            errors.forEach(err => {
                switch (err.type) {
                    default: err.message = "First name can not be empty";
                        break;
                }
            });
            return errors;
        }),
        last_name: Joi.string().required().error(errors => {
            errors.forEach(err => {
                switch (err.type) {
                    default: err.message = "Last name can not be empty";
                        break;
                }
            });
            return errors;
        }),
        phone: Joi.number().required().error(errors => {
            errors.forEach(err => {
                switch (err.type) {
                    default: err.message = "Phone can not be empty";
                        break;
                }
            });
            return errors;
        }),
        confirm_password: Joi.string().required().error(errors => {
            errors.forEach(err => {
                switch (err.type) {
                    default: err.message = " can not be empty";
                        break;
                }
            });
            return errors;
        }),
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
            password: this.state.password,
            email: this.state.email,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            phone: this.state.phone,
            confirm_password: this.state.confirm_password
        }
        const { error } = Joi.validate(form, this.schema, options)
        if (!error) return null;

        const errors = {};
        for (let item of error.details) errors[item.path[0]] = item.message
        return errors;
    };

    showpasshandler = () => {
        this.setState({
            showpass: !this.state.showpass
        })
    }

    submitHandler = (e) => {
        e.preventDefault()
        const error = this.validate();
        if (!error) {
            console.log('Submited');
        } else {
            this.setState({
                error: error || {}
            })
        }
    }

    render() {
        return (
            <Fragment>
                <form onSubmit={this.submitHandler}>
                    <Grid container spacing={3}>
                        <Grid item xl={4}>
                            <TextField
                                label="First Name"
                                placeholder="Your name here.."
                                fullWidth
                                variant="outlined"
                                name="first_name"
                                onChange={this.changeHandler}
                                value={this.state.first_name}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                error={this.state.error.first_name && true}
                                helperText={this.state.error.first_name && this.state.error.first_name}
                                className="formInput"
                            />
                        </Grid>
                        <Grid item xl={4}>
                            <TextField
                                label="Last Name"
                                placeholder="Your name here.."
                                fullWidth
                                variant="outlined"
                                name="last_name"
                                onChange={this.changeHandler}
                                value={this.state.last_name}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                error={this.state.error.last_name && true}
                                helperText={this.state.error.last_name && this.state.error.last_name}
                                className="formInput"
                            />
                        </Grid>
                        <Grid item xl={4}>
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
                        </Grid>
                        <Grid item xl={4}>
                            <TextField
                                label="Phone"
                                placeholder="Your Phone here.."
                                fullWidth
                                variant="outlined"
                                name="phone"
                                onChange={this.changeHandler}
                                value={this.state.phone}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                error={this.state.error.phone && true}
                                helperText={this.state.error.phone && this.state.error.phone}
                                className="formInput"
                            />
                        </Grid>
                        <Grid item xl={4}>
                            <TextField
                                label="Password"
                                placeholder="Your password here.."
                                fullWidth
                                type={this.state.showpass ? 'text' : 'password'}
                                variant="outlined"
                                name="password"
                                onChange={this.changeHandler}
                                value={this.state.password}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                error={this.state.error.password && true}
                                helperText={this.state.error.password && this.state.error.password}
                                className="formInput"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment
                                            onClick={this.showpasshandler}
                                            className="showPassword"
                                            position="end">
                                            <i className={this.state.showpass ? 'fa fa-eye' : 'fa fa-eye-slash'} />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xl={4}>
                            <TextField
                                label="Confirm Password"
                                placeholder="Your password here.."
                                fullWidth
                                type={this.state.showpass ? 'text' : 'password'}
                                variant="outlined"
                                name="confirm_password"
                                onChange={this.changeHandler}
                                value={this.state.confirm_password}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                error={this.state.error.confirm_password && true}
                                helperText={this.state.error.confirm_password && this.state.error.confirm_password}
                                className="formInput"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment
                                            onClick={this.showpasshandler}
                                            className="showPassword"
                                            position="end">
                                            <i className={this.state.showpass ? 'fa fa-eye' : 'fa fa-eye-slash'} />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button className="defaultButton bg-default" type="submit">Submit</Button>
                        </Grid>
                    </Grid>
                </form>
            </Fragment>
        );
    }
}

const mapStateToProps = createStructuredSelector({

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

export default compose(withConnect)(InputValidation);
