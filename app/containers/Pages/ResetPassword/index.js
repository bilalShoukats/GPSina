import React, { Component, Fragment } from 'react';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import Card from 'components/Card/Loadable'
import { Grid, TextField, Button, InputAdornment } from '@material-ui/core'
import './style.scss'
import { SuperHOC } from '../../../HOC';
import Joi from 'joi-browser'
import { ToastContainer, toast } from 'react-toastify';
import { connect } from 'react-redux';

class ResetPassword extends Component {
    state = {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
        showpass: false,
        error: {},
    }

    schema = {
        oldPassword: Joi.string().required().error(errors => {
            errors.forEach(err => {
                switch (err.type) {
                    default:
                        err.message = "Please enter your old password";
                        break;
                }
            });
            return errors;
        }),
        newPassword: Joi.string().required().error(errors => {
            errors.forEach(err => {
                switch (err.type) {
                    default:
                        err.message = "Please enter your new password";
                        break;
                }
            });
            return errors;
        }),
        confirmPassword: Joi.string().required().error(errors => {
            errors.forEach(err => {
                switch (err.type) {
                    default:
                        err.message = "Please enter your confirm password";
                        break;
                }
            });
            return errors;
        }),
    }

    showpasshandler = () => {
        this.setState({
            showpass: !this.state.showpass
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
            oldPassword: this.state.oldPassword,
            newPassword: this.state.newPassword,
            confirmPassword: this.state.confirmPassword
        }
        let { error } = Joi.validate(form, this.schema, options)
        if (this.state.newPassword !== this.state.confirmPassword) {
            let obj = {
                message: "New password and confirm password not match",
                path: ["confirmPassword"]
            }
            if (error) error.details.push(obj);
            else {
                let details = [];
                details.push(obj);
                error = {
                    details
                }
            }
        }
        if (!error) return null;

        const errors = {};
        for (let item of error.details) errors[item.path[0]] = item.message
        return errors;
    };

    submitHandler = (e) => {
        e.preventDefault()
        console.log("submitting reset form");
        const error = this.validate()

        if (!error) {
            let body = {
                oldpassword: this.state.oldPassword,
                newpassword: this.state.newPassword,
            }
            this.props.apiManager.makeCall("updatePassword", body, (response) => {
                if (response.code === 1026) {
                    toast.success('Password changed successfully!')
                }
                else
                    toast.error(response.id)
            });
        } else {
            console.log(error);
            this.setState({
                error: error || {}
            })
        }
    }

    render() {
        return (
            <Card
                title="Reset Password"
                className="editProfile"
            >
                <Fragment>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                label="Old Password"
                                placeholder="Your old password here.."
                                fullWidth
                                type={this.state.showpass ? 'text' : 'password'}
                                variant="outlined"
                                name="oldPassword"
                                onChange={this.changeHandler}
                                value={this.state.oldPassword}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                error={this.state.error.oldPassword && true}
                                helperText={this.state.error.oldPassword && this.state.error.oldPassword}
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
                            <TextField
                                label="New Password"
                                placeholder="Your new password here.."
                                fullWidth
                                type={this.state.showpass ? 'text' : 'password'}
                                variant="outlined"
                                name="newPassword"
                                onChange={this.changeHandler}
                                value={this.state.newPassword}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                error={this.state.error.newPassword && true}
                                helperText={this.state.error.newPassword && this.state.error.newPassword}
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
                            <TextField
                                label="Confirm Password"
                                placeholder="Your confirm password here.."
                                fullWidth
                                type={this.state.showpass ? 'text' : 'password'}
                                variant="outlined"
                                name="confirmPassword"
                                onChange={this.changeHandler}
                                value={this.state.confirmPassword}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                error={this.state.error.confirmPassword && true}
                                helperText={this.state.error.confirmPassword && this.state.error.confirmPassword}
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
                            <Button className="btn bg-default" onClick={this.submitHandler}>Update</Button>
                        </Grid>
                    </Grid>
                </Fragment>
            </Card>
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
export default SuperHOC((withConnect)(ResetPassword));

// export default ResetPassword;
