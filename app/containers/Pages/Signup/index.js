import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import makeSelectLogin from './selectors';
import { Grid, TextField, Button, InputAdornment, } from '@material-ui/core'
import { Link, withRouter } from 'react-router-dom'
import Joi from 'joi-browser'
import { ToastContainer, toast } from 'react-toastify';
import './style.scss'
import { SuperHOC } from '../../../HOC';

// images
import loginImg from 'images/login-bg.png'

class Signup extends Component {
  state = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    userName: '',
    confirm_password: '',
    phone: '',
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
          default:
            err.message = "Email cannot be empty";
            break;
        }
      });
      return errors;
    }),
    password: Joi.string().required().error(errors => {
      errors.forEach(err => {
        switch (err.type) {
          default:
            err.message = "Please enter your password";
            break;
        }
      });
      return errors;
    }),
    confirm_password: Joi.string().required().error(errors => {
      errors.forEach(err => {
        switch (err.type) {
          default:
            err.message = "Please enter your confirm password";
            break;
        }
      });
      return errors;
    }),
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
    userName: Joi.string().regex(/^[a-zA-Z]{8}/).required().error(errors => {
      errors.forEach(err => {
        switch (err.type) {
          case "string.regex.base":
            err.message = "user name must be more than 7 character";
            break;
          default:
            err.message = "Please enter your user name";
            break;
        }
      });
      return errors;
    }),
    phone: Joi.string().regex(/^[0-9]{8}/).required().error(errors => {
      errors.forEach(err => {
        console.log(err);
        switch (err.type) {
          case "string.regex.base":
            err.message = "Phone must be more than 7 digit number";
            break;
          default: err.message = "Phone cannot be empty";
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
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      userName: this.state.userName,
      confirm_password: this.state.confirm_password,
      phone: this.state.phone
    }
    let { error } = Joi.validate(form, this.schema, options)
    if (this.state.password !== this.state.confirm_password) {
      let obj = {
        message: "Password and confirm password not match",
        path: ["confirm_password"]
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
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        userName: this.state.userName,
        password: this.state.password,
        email: this.state.email,
        phone: this.state.phone,
        role: 1
      }
      this.props.apiManager.makeCall("register", body, (response) => {
        if (response.code === 1006) {
          toast.success('Successfully registered!')
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
          <title>Register</title>
          <meta name="description" content="Description of Login" />
        </Helmet>
        <Grid className="accountArea">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <form className="accountWrapper" onSubmit={this.submitHandler}>
                <Grid className="bgShaperight"
                  style={{ background: `url(${loginImg})left center/cover no-repeat` }}></Grid>
                <Grid className="accountForm">
                  <div className="fromTitle">
                    <h2>Register</h2>
                    <p>Don't have an account? Register now!</p>
                  </div>
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
                  <TextField
                    label="User Name"
                    placeholder="Your user name here.."
                    fullWidth
                    variant="outlined"
                    name="userName"
                    onChange={this.changeHandler}
                    value={this.state.userName}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={this.state.error.userName && true}
                    helperText={this.state.error.userName && this.state.error.userName}
                    className="formInput"
                  />
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
                  <TextField
                    label="Phone"
                    placeholder="Your phone here.."
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
                  <Button type="submit" className="btn bg-default accountBtn">Register</Button>

                  <h4 className="or"><span>OR</span></h4>
                  <ul className="socialLoginBtn">
                    <li><Button disabled className="facebook"><i className="fa fa-facebook" /></Button></li>
                    <li><Button disabled className="twitter"><i className="fa fa-twitter" /></Button></li>
                    <li><Button disabled className="linkedin"><i className="fa fa-linkedin" /></Button></li>
                  </ul>
                  <p className="subText">Already have an account? <Link to="/">Return to Sign In</Link></p>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  login: makeSelectLogin(),
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

// export default compose(withConnect)(Signup);
export default SuperHOC((withConnect)(Signup));
