import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import makeSelectAddUserScreen from './selectors';
import { SuperHOC } from '../../../HOC';
import { Grid, TextField, Button, Tab, Tabs } from '@material-ui/core'
import Card from 'components/Card/Loadable'
import './style.scss'
import { ToastContainer, toast } from 'react-toastify';
import 'sass/elements/sweet-alerts.scss';
import Joi from 'joi-browser'
import Switch from '@material-ui/core/Switch';

// images
import companyLogo from 'images/team/img1.jpg'

class AddUserScreen extends Component {

  state = {
    firstName: '',
    lastName: '',
    driverAge: '',
    email: '',
    licenceExpiry: '',
    licenceNumber: '',
    error: {},
    file: '',
    addUser: false,
    viewUser: false,
    editUser: false,
    addRoute: false,
    viewRoutes: false,
    addDriver: false,
    viewDrivers: false,
    addVehicle: false,
    viewVehicle: false,
    assignDriver: false,
    attachDevice: false,
  }

  schema = {
    firstName: Joi.string().regex(/^[a-zA-Z ]{3}/).required().error(errors => {
      errors.forEach(err => {
        switch (err.type) {
          case "string.regex.base":
            err.message = "First name must be more than 3 character";
            break;
          default:
            err.message = "Please enter first name";
            break;
        }
      });
      return errors;
    }),
    lastName: Joi.string().regex(/^[a-zA-Z ]{3}/).required().error(errors => {
      errors.forEach(err => {
        switch (err.type) {
          case "string.regex.base":
            err.message = "Owner name must be more than 3 character";
            break;
          default:
            err.message = "Please enter ast name";
            break;
        }
      });
      return errors;
    }),
    licenceNumber: Joi.string().regex(/^[a-zA-Z ]{8}/).required().error(errors => {
      errors.forEach(err => {
        switch (err.type) {
          case "string.regex.base":
            err.message = "User name must be more than 7 character";
            break;
          default:
            err.message = "Please enter user name";
            break;
        }
      });
      return errors;
    }),
    driverAge: Joi.string().regex(/^[0-9 ]{2}/).required().error(errors => {
      errors.forEach(err => {
        switch (err.type) {
          case "string.regex.base":
            err.message = "driverAge name must be more than 2 character";
            break;
          default:
            err.message = "Please enter driverAge";
            break;
        }
      });
      return errors;
    }),
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
    licenceExpiry: Joi.string().required().error(errors => {
      errors.forEach(err => {
        switch (err.type) {
          default: err.message = "licenceExpiry  can not be empty";
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
      companyName: this.state.companyName,
      companyEmail: this.state.companyEmail,
      directorName: this.state.directorName
    }
    const { error } = Joi.validate(form, this.schema, options)
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message
    return errors;
  };

  submitHandler = (e) => {
    e.preventDefault()
    console.log("submitting add user form");
    const error = this.validate()

    if (!error) {
      let body = {
        companyName: this.state.companyName,
        email: this.state.companyEmail,
        director: this.state.directorName,
        // companyLogo: this.state.companyLogo,
      }
      this.props.apiManager.makeCall("addCompany", body, (response) => {
        if (response.code === 1008) {
          toast.success('User added successfully!')
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
  handleChange = (event) => {
    this.setState({
      file: URL.createObjectURL(event.target.files[0])
    })
  }
  handleSwitchChange = (name) => (event) => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const genderItems = [
      {
        value: '0',
        label: 'Male',
      },
      {
        value: '1',
        label: 'Female',
      },
      {
        value: '2',
        label: 'Transgender',
      },
    ];
    return (
      <Fragment>
        <Helmet>
          <title>Edit Driver</title>
          <meta name="description" content="Description of AddUserScreen" />
        </Helmet>
        <h2 className="breadcumbTitle">Edit Driver</h2>
        <Grid container spacing={3}>
          <Grid item xl={3} lg={4} xs={12}>
            <Grid className="companyInfoWrap">
              <Grid className="companyInfoImg">
                <img src={this.state.file !== '' ? this.state.file : companyLogo} alt='' />

              </Grid>
              <input id="file" name="file" style={{ display: 'none' }} type="file" onChange={this.handleChange} />
              <label style={{ color: 'blue', cursor: 'pointer' }} for="file">Edit Image</label>

              <Grid className="companyInfoContent">
                <h4>Please upload user image</h4>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xl={9} lg={8} xs={12}>
            <Card
              title="Edit Driver"
              className="addCompany"
            >
              <Grid container spacing={3}>
              <Grid item sm={6} xs={12}>
                  <TextField
                    label="Name"
                    placeholder="Your Name name here.."
                    fullWidth
                    variant="outlined"
                    name="driverName"
                    onChange={this.changeHandler}
                    value={this.state.driverName}
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
                    style={{ backgroundColor: '#8080801c' }}
                    disabled={true}
                    label="Email"
                    placeholder="Your Email here.."
                    fullWidth
                    variant="outlined"
                    name="driverEmail"
                    onChange={this.changeHandler}
                    value={this.state.driverEmail}
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
                    label="Driver Owner"
                    placeholder="Your Last Name here.."
                    fullWidth
                    variant="outlined"
                    name="driverOwner"
                    onChange={this.changeHandler}
                    value={this.state.driverOwner}
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
                    label="Licence Number"
                    placeholder="Your User name here.."
                    fullWidth
                    variant="outlined"
                    name="licenceNumber"
                    onChange={this.changeHandler}
                    value={this.state.licenceNumber}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={this.state.error.licenceNumber && true}
                    helperText={this.state.error.licenceNumber && this.state.error.licenceNumber}
                    className="formInput"
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    label="Licence Expiry"
                    placeholder="Your licence Expiry  here.."
                    fullWidth
                    variant="outlined"
                    name="licenceExpiry"
                    onChange={this.changeHandler}
                    value={this.state.licenceExpiry}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={this.state.error.licenceExpiry && true}
                    helperText={this.state.error.licenceExpiry && this.state.error.licenceExpiry}
                    className="formInput"
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    label="Blood Group"
                    placeholder="Your BloodGroup here.."
                    fullWidth
                    variant="outlined"
                    name="driverBloodGroup"
                    onChange={this.changeHandler}
                    value={this.state.driverBloodGroup}
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
                    label="Age"
                    placeholder="Your driverAge here.."
                    fullWidth
                    variant="outlined"
                    name="driverAge"
                    onChange={this.changeHandler}
                    value={this.state.driverAge}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={this.state.error.driverAge && true}
                    helperText={this.state.error.driverAge && this.state.error.driverAge}
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
                </Grid>
                <Grid item xs={12}>
                  <Button className="btn bg-default" onClick={this.submitHandler}>Edit Driver</Button>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

// const mapStateToProps = createStructuredSelector({
//   addUserScreen: makeSelectAddUserScreen(),
// });

// function mapDispatchToProps(dispatch) {
//   return {
//     dispatch,
//   };
// }

// const withConnect = connect(
//   mapStateToProps,
//   mapDispatchToProps,
// );

// export default compose(withConnect)(AddUserScreen);

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);
export default SuperHOC((withConnect)(AddUserScreen));
