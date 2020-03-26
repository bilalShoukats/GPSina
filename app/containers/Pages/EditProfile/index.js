import React, { Component, Fragment } from 'react';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import Card from 'components/Card/Loadable'
import { Grid, TextField, OutlinedInput, FormControl, Select, Button } from '@material-ui/core'
import './style.scss'
import { SuperHOC } from '../../../HOC';
import Joi from 'joi-browser'
import { ToastContainer, toast } from 'react-toastify';
import { connect } from 'react-redux';

class EditProfile extends Component {
    state = {
        email: '',
        firstName: '',
        lastName: '',
        userName: '',
        phone: '',
        gender: 0,
        age: 0,
        suspended: '',
        error: {},
        loading: true,
    }

    schema = {
        firstName: Joi.string().regex(/^[a-zA-Z ]{3}/).required().error(errors => {
            errors.forEach(err => {
                switch (err.type) {
                    case "string.regex.base":
                        err.message = "First name must be more than 2 character";
                        break;
                    default:
                        err.message = "Please enter your first name";
                        break;
                }
            });
            return errors;
        }),
        lastName: Joi.string().regex(/^[a-zA-Z ]{3}/).required().error(errors => {
            errors.forEach(err => {
                switch (err.type) {
                    case "string.regex.base":
                        err.message = "Last name must be more than 2 character";
                        break;
                    default:
                        err.message = "Please enter your last name";
                        break;
                }
            });
            return errors;
        }),
        age: Joi.number().integer().min(1).max(125).error(errors => {
            errors.forEach(err => {
                console.log(err);
                switch (err.type) {
                    case "number.min":
                        err.message = "Age cannot be less than 1";
                        break;
                    case "number.max":
                        err.message = "Age cannot be greater than 125";
                        break;
                    default: err.message = "Age cannot be empty";
                        break;
                }
            });
            return errors;
        }),
    }

    componentDidMount = () => {
        this.setState({
            email: this.props.profile.email,
            firstName: this.props.profile.firstName,
            lastName: this.props.profile.lastName,
            userName: this.props.profile.userName,
            phone: this.props.profile.phone,
            gender: this.props.profile.gender,
            age: this.props.profile.age,
            suspended: this.props.profile.suspended,
            loading: false
        });
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
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            age: this.state.age
        }
        const { error } = Joi.validate(form, this.schema, options)
        if (!error) return null;

        const errors = {};
        for (let item of error.details) errors[item.path[0]] = item.message
        return errors;
    };

    submitHandler = (e) => {
        e.preventDefault()
        console.log("submitting profile form");
        const error = this.validate()

        if (!error) {
            let body = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                gender: this.state.gender,
                age: Number(this.state.age),
                email: this.state.email
            }
            this.props.apiManager.makeCall("updateUser", body, (response) => {
                if (response.code === 1014) {
                    toast.success('Profile updated successfully!')
                    this.props.profile.firstName = this.state.firstName;
                    this.props.profile.lastName = this.state.lastName;
                    this.props.profile.gender = this.state.gender;
                    this.props.profile.age = this.state.age;
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
        if (this.state.loading)
            return null;

        const genderItems = [
            {
                value: '0',
                label: 'Male',
            },
            {
                value: '1',
                label: 'Female',
            },
        ];

        return (

            <Card
                title="Edit Profile"
                className="editProfile"
            >
                <Fragment>
                    <Grid container spacing={3}>
                        <Grid item sm={6} xs={12}>
                            <TextField
                                label="First Name"
                                placeholder="Your first name here.."
                                fullWidth
                                variant="outlined"
                                name="firstName"
                                onChange={this.changeHandler}
                                value={this.state.firstName}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                error={this.state.error.firstName && true}
                                helperText={this.state.error.firstName && this.state.error.firstName}
                                className="formInput"
                            />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <TextField
                                label="Last Name"
                                placeholder="Your last name here.."
                                fullWidth
                                variant="outlined"
                                name="lastName"
                                onChange={this.changeHandler}
                                value={this.state.lastName}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                error={this.state.error.lastName && true}
                                helperText={this.state.error.lastName && this.state.error.lastName}
                                className="formInput"
                            />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <TextField
                                label="User Name"
                                placeholder="Your user name here.."
                                fullWidth
                                variant="outlined"
                                name="userName"
                                disabled
                                onChange={this.changeHandler}
                                value={this.state.userName}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                error={this.state.error.userName && true}
                                helperText={this.state.error.userName && this.state.error.userName}
                                className="formInput"
                            />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <TextField
                                label="Email"
                                placeholder="Your email here.."
                                fullWidth
                                disabled
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
                        <Grid item sm={6} xs={12}>
                            <TextField
                                label="Phone"
                                placeholder="Your phone here.."
                                fullWidth
                                variant="outlined"
                                name="phone"
                                disabled
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
                        <Grid item sm={6} xs={12}>
                            <TextField
                                select
                                label="Gender"
                                className='formInput'
                                value={this.state.gender}
                                fullWidth
                                onChange={event => {
                                    const { value } = event.target;
                                    this.setState({ gender: Number(value) });
                                }}
                                SelectProps={{
                                    native: true,
                                }}
                                variant="outlined"
                            >
                                {genderItems.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </TextField>
                        </Grid >
                        <Grid item sm={6} xs={12}>
                            <TextField
                                label="Age"
                                placeholder="Your age here.."
                                fullWidth
                                variant="outlined"
                                name="age"
                                onChange={this.changeHandler}
                                value={this.state.age}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                error={this.state.error.age && true}
                                helperText={this.state.error.age && this.state.error.age}
                                className="formInput"
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
export default SuperHOC((withConnect)(EditProfile));

// export default EditProfile;
