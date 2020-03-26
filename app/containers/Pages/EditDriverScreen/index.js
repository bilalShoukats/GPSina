import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import makeSelectAddUserScreen from './selectors';
import { SuperHOC } from '../../../HOC';
import { Grid, TextField, Button, Tab, Tabs, CircularProgress } from '@material-ui/core'
import Card from 'components/Card/Loadable'
import './style.scss'
import { ToastContainer, toast } from 'react-toastify';
import 'sass/elements/sweet-alerts.scss';
import Joi from 'joi-browser'
import Switch from '@material-ui/core/Switch';
import Dialog from '@material-ui/core/Dialog';

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
    driverBloodGroup: 1,
    loading: false,
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
    driver: []
  }

  schema = {
    driverName: Joi.string().regex(/^[a-zA-Z ]{3}/).required().error(errors => {
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
    // driverOwner: Joi.string().regex(/^[a-zA-Z ]{3}/).required().error(errors => {
    //   errors.forEach(err => {
    //     switch (err.type) {
    //       case "string.regex.base":
    //         err.message = "Owner name must be more than 3 character";
    //         break;
    //       default:
    //         err.message = "Please enter ast name";
    //         break;
    //     }
    //   });
    //   return errors;
    // }),
    licenceNumber: Joi.string().regex(/^[a-zA-Z0-9]{6}/).required().error(errors => {
      errors.forEach(err => {
        switch (err.type) {
          case "string.regex.base":
            err.message = "Licence Number must be more than 5 character";
            break;
          default:
            err.message = "Please enter Licence Number";
            break;
        }
      });
      return errors;
    }),
    licenceExpiry: Joi.number().integer().min(2020).max(2030).error(errors => {
      errors.forEach(err => {
        switch (err.type) {
          default: err.message = "licenceExpiry  should be above 2020 and less than 2030";
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
      driverName: this.state.driverName,
      licenceNumber: this.state.licenceNumber,
      licenceExpiry: this.state.licenceExpiry,
    }
    const { error } = Joi.validate(form, this.schema, options)
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message
    return errors;
  };


  handleChange = (event) => {
    this.setState({
      file: URL.createObjectURL(event.target.files[0])
    })
  }
  handleSwitchChange = (name) => (event) => {
    this.setState({ [name]: event.target.checked });
  };
  getSingleDriverDetail = () => {
    let dec = window.atob(this.props.match.params.item)
    let body = {
      companyEmail: this.props.user.companyEmail,
      driverId: this.props.match.params.item
    }
    // console.log('alssssl', body)
    this.props.apiManager.makeCall(`driverDetail`, body, res => {
      console.log('alssssl', res.response)
      console.log('alssssl', body)
      if (res.code === 5056) {
        this.setState({
          userDetail: res.response, currentPage: res.currentPage, totalPages: res.totalPages, loading: false,
          driverName: res.response.driverName,
          driverEmail: res.response.driverEmail,
          driverOwner: res.response.driverOwner,
          licenceExpiry: res.response.licenceExpiry,
          licenceNumber: res.response.licenceNumber,
          driverAge: res.response.driverAge,
          gender: res.response.gender,
          driverBloodGroup: res.response.driverBloodGroup,
        });
      }
      else {
        this.setState({ loading: false });
        toast.error(res.id);
      }
    })
  }
  componentWillMount = () => {
    this.getSingleDriverDetail();
  }
  editDriver = (e) => {
    e.preventDefault()
    console.log("submitting add company form");
    const error = this.validate()
    this.setState({ loading: true }, () => {
      if (!error) {
        let body = {
          driverEmail: this.state.driverEmail,
          driverName: this.state.driverName,
          licenceExpiry: parseInt(this.state.licenceExpiry),
          role: 0,
          gender: parseInt(this.state.gender),
          companyEmail: this.props.user.companyEmail,
        }
        this.props.apiManager.makeCall("updateDriver", body, (response) => {
          console.log("response:s ", response);
          console.log("response:s ", body);
          if (response.code === 1014) {
            this.setState({ loading: false })
            toast.success('Driver Edited successfully!')
          }
          else {
            this.setState({ loading: false })
            toast.error(response.id)
          }
        });
      } else {
        console.log(error);
        this.setState({
          loading: false,
          error: error || {}
        })
      }
    })
  }
  renderLoading = () => {
    return (
      <Dialog
        open={this.state.loading}
        PaperProps={{
          style: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
            padding: 10
          },
        }}>
        <CircularProgress className="text-dark" />
      </Dialog>
    )
  }

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
      // {
      //   value: '2',
      //   label: 'Transgender',
      // },
    ];
    const bloodGorupItems = [
      {
        value: '1',
        label: 'A RhD positive (A+)',
      },
      {
        value: '2',
        label: 'A RhD negative (A-)',
      },
      {
        value: '3',
        label: 'B RhD positive (B+)',
      },
      {
        value: '4',
        label: 'B RhD negative (B-)',
      },
      {
        value: '5',
        label: 'O RhD positive (O+)',
      },
      {
        value: '6',
        label: 'O RhD negative (O-)',
      },
      {
        value: '7',
        label: 'AB RhD positive (AB+)',
      },
      {
        value: '8',
        label: 'AB RhD negative (AB-)',
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
              <label style={{ color: 'blue', cursor: 'pointer' }} htmlFor="file">Edit Image</label>
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
                    error={this.state.error.driverName && true}
                    helperText={this.state.error.driverName && this.state.error.driverName}
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
                    style={{ backgroundColor: '#8080801c' }}
                    disabled={true}
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
                    style={{ backgroundColor: '#8080801c' }}
                    disabled={true}
                    label="Licence Number"
                    placeholder="Your Licence number here.."
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
                    style={{ backgroundColor: '#8080801c' }}
                    disabled={true}
                    select
                    label="Blood Group"
                    className='formInput'
                    value={this.state.driverBloodGroup}
                    fullWidth
                    onChange={event => {
                      const { value } = event.target;
                      console.log('lolololol', event.target.value)
                      this.setState({ driverBloodGroup: Number(value) });
                    }}
                    SelectProps={{
                      native: true,
                    }}
                    variant="outlined"
                  >
                    {bloodGorupItems.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    style={{ backgroundColor: '#8080801c' }}
                    disabled={true}
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
                    style={{ backgroundColor: '#8080801c' }}
                    select
                    label="Gender"
                    disabled={true}
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
                  <Button className="btn bg-default" onClick={this.editDriver}>Edit Driver</Button>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
        {this.renderLoading()}
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
