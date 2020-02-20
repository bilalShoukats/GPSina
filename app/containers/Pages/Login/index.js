import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import makeSelectLogin from './selectors';
import { Grid, TextField, Button, InputAdornment, FormControlLabel, Checkbox } from '@material-ui/core'
import { Link } from 'react-router-dom'
import Joi from 'joi-browser'
import { ToastContainer, toast } from 'react-toastify';
import { SuperHOC } from '../../../HOC';
import './style.scss'

// images
import loginImg from 'images/login-bg.png'

class Login extends Component {
  state = {
    email: '',
    password: '',
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
            err.message = "Password cannot be empty";
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
    }
    const { error } = Joi.validate(form, this.schema, options)
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message
    return errors;
  };

  openDashboard = () => {
    this.props.history.push('/dashboard')
  }

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
    console.log(this.state.email);
    console.log(this.state.password);
    const error = this.validate()
    if (!error) {
      let body = {
        email: this.state.email,
        password: this.state.password
      }
      this.props.apiManager.makeCall("login", body, (response) => {
        if (response.response.hash && response.code === 2003) {
          toast.success('Successfully logged in!')
          this.props.history.push('/dashboard')
          //window.location.href = "/dashboard";
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
          <title>Login</title>
        </Helmet>
        <Grid className="accountArea">
          <form className="accountWrapper" onSubmit={this.submitHandler}>
            <Grid className="bgShaperight" style={{ background: `url(${loginImg})left center/cover no-repeat` }}></Grid>
            <Grid className="accountForm">
              <div className="fromTitle">
                <h2>Log In </h2>
                <p>Welcome Back! Please sign in to your Account</p>
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
              <Grid className="loginAction">
                <FormControlLabel
                  className="remambar"
                  control={
                    <Checkbox
                      checked={this.state.remember}
                      onChange={this.checkHandler}
                      disableRipple
                    />
                  }
                  label="Remember Me"
                />
                <Link to="/forgotPassword">Forgot Password?</Link>
              </Grid>
              <Button type="submit" className="btn bg-default accountBtn">login</Button>
              <h4 className="or"><span>OR</span></h4>
              <ul className="socialLoginBtn">
                <li><Button disabled className="facebook"><i className="fa fa-facebook" /></Button></li>
                <li><Button disabled className="twitter"><i className="fa fa-twitter" /></Button></li>
                <li><Button disabled className="linkedin"><i className="fa fa-linkedin" /></Button></li>
              </ul>
              <p className="subText">Don't have an account? <Link to="/register">Create free account</Link></p>
            </Grid>
          </form>
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

// export default compose(withConnect)(Login);
export default SuperHOC((withConnect)(Login));

