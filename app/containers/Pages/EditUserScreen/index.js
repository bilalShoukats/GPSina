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
    userDetail: {},
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    userName: '',
    error: {},
    file: '',
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
            err.message = "Last name must be more than 3 character";
            break;
          default:
            err.message = "Please enter last name";
            break;
        }
      });
      return errors;
    }),
    phone: Joi.string().regex(/^[0-9 ]{10}/).required().error(errors => {
      errors.forEach(err => {
        switch (err.type) {
          case "string.regex.base":
            err.message = "Phone name must be more than 9 character";
            break;
          default:
            err.message = "Please enter phone number";
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
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      phone: this.state.phone,
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
  getSingleUserDetail = () => {
    let dec = window.atob(this.props.match.params.item)
    let body = {
      companyEmail: this.props.user.companyEmail,
      email: dec
    }
    // console.log('alssssl', body)
    this.props.apiManager.makeCall(`getEmployeeDetail`, body, res => {
      console.log('alssssl', res.response.userPermissions[body.companyEmail])
      if (res.code === 5056) {
        this.setState({
          userDetail: res.response, currentPage: res.currentPage, totalPages: res.totalPages, loading: false,
          firstName: res.response.firstName,
          lastName: res.response.lastName,
          email: res.response.email,
          userName: res.response.userName,
          password: res.response.password,
          phone: res.response.phone,
          file: res.response.avatar,
          addUser: res.response.userPermissions[body.companyEmail].apiOperation[0],
          viewUser: res.response.userPermissions[body.companyEmail].apiOperation[1],
          editUser: res.response.userPermissions[body.companyEmail].apiOperation[2],
          addRoute: res.response.userPermissions[body.companyEmail].apiOperation[3],
          viewRoutes: res.response.userPermissions[body.companyEmail].apiOperation[4],
          addDriver: res.response.userPermissions[body.companyEmail].apiOperation[5],
          viewDrivers: res.response.userPermissions[body.companyEmail].apiOperation[6],
          addVehicle: res.response.userPermissions[body.companyEmail].apiOperation[7],
          viewVehicle: res.response.userPermissions[body.companyEmail].apiOperation[8],
          assignDriver: res.response.userPermissions[body.companyEmail].apiOperation[9],
          attachDevice: res.response.userPermissions[body.companyEmail].apiOperation[10],
        });
      }
      else {
        this.setState({ loading: false });
        toast.error(res.id);
      }
    })
  }

  submitHandler = (e) => {
    e.preventDefault()
    console.log("submitting add user form");
    const error = this.validate()
    this.setState({ loading: true }, () => {
      if (!error) {
        let emaill = this.props.user.companyEmail
        let body = {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          userName: this.state.userName,
          password: this.state.password,
          email: this.state.email,
          phone: this.state.phone,
          avatar: this.state.file,
          companyEmail: emaill,
          userPermissions: {
            [emaill]: {
              apiOperation: [
                this.state.addUser === true ? 1 : 0,
                this.state.viewUser === true ? 1 : 0,
                this.state.editUser === true ? 1 : 0,
                this.state.addRoute === true ? 1 : 0,
                this.state.viewRoutes === true ? 1 : 0,
                this.state.addDriver === true ? 1 : 0,
                this.state.viewDrivers === true ? 1 : 0,
                this.state.addVehicle === true ? 1 : 0,
                this.state.viewVehicle === true ? 1 : 0,
                this.state.assignDriver === true ? 1 : 0,
                this.state.attachDevice === true ? 1 : 0,
              ]
            }
          }
        }
        this.props.apiManager.makeCall("updateEmployee", body, (response) => {
          console.log('adddddd', response)
          console.log('adddddd', body)
          if (response.code === 1014) {
            this.setState({ loading: false })
            toast.success('User added successfully!')
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
  componentDidMount = () => {
    this.getSingleUserDetail();
  }

  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Edit User</title>
          <meta name="description" content="Description of AddUserScreen" />
        </Helmet>
        <h2 className="breadcumbTitle">Edit User</h2>
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
              title="Add User"
              className="addCompany"
            >
              <Grid container spacing={3}>
                <Grid item sm={6} xs={12}>
                  <TextField
                    label="First Name"
                    placeholder="Your First Name name here.."
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
                    placeholder="Your Last Name here.."
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
                <Grid item sm={6} xs={12} >
                  <TextField
                    style={{ backgroundColor: '#8080801c' }}
                    disabled={true}
                    label="User Name"
                    placeholder="Your User name here.."
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
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    style={{ backgroundColor: '#8080801c' }}
                    label="Password"
                    placeholder="Your Password  here.."
                    fullWidth
                    variant="outlined"
                    name="password"
                    type='password'
                    disabled={true}
                    onChange={this.changeHandler}
                    value={this.state.password}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={this.state.error.password && true}
                    helperText={this.state.error.password && this.state.error.password}
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
                    style={{ backgroundColor: '#8080801c' }}
                    disabled={true}
                    label="Phone Number"
                    placeholder="Your Phone Number here.."
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
                <Grid item sm={6} xs={12}>
                  <div className="modalContent">
                    <h4>
                      Over Speed:
                </h4>
                    <Switch
                      checked={this.state.addUser}
                      onChange={this.handleSwitchChange('addUser')}
                      value="addUser"
                      classes={{
                        root: 'switchDefault',
                        switchBase: 'switchBase',
                        thumb: 'switchThumb',
                        track: 'switchTrack',
                        checked: 'switchChecked'
                      }}
                    />
                  </div>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <div className="modalContent">
                    <h4>
                      View User:
                </h4>
                    <Switch
                      checked={this.state.viewUser}
                      onChange={this.handleSwitchChange('viewUser')}
                      value="viewUser"
                      classes={{
                        root: 'switchDefault',
                        switchBase: 'switchBase',
                        thumb: 'switchThumb',
                        track: 'switchTrack',
                        checked: 'switchChecked'
                      }}
                    />
                  </div>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <div className="modalContent">
                    <h4>
                      Edit User:
                </h4>
                    <Switch
                      checked={this.state.editUser}
                      onChange={this.handleSwitchChange('editUser')}
                      value="editUser"
                      classes={{
                        root: 'switchDefault',
                        switchBase: 'switchBase',
                        thumb: 'switchThumb',
                        track: 'switchTrack',
                        checked: 'switchChecked'
                      }}
                    />
                  </div>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <div className="modalContent">
                    <h4>
                      Add Route:
                </h4>
                    <Switch
                      checked={this.state.addRoute}
                      onChange={this.handleSwitchChange('addRoute')}
                      value="addRoute"
                      classes={{
                        root: 'switchDefault',
                        switchBase: 'switchBase',
                        thumb: 'switchThumb',
                        track: 'switchTrack',
                        checked: 'switchChecked'
                      }}
                    />
                  </div>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <div className="modalContent">
                    <h4>
                      View Router:
                </h4>
                    <Switch
                      checked={this.state.viewRoutes}
                      onChange={this.handleSwitchChange('viewRoutes')}
                      value="viewRoutes"
                      classes={{
                        root: 'switchDefault',
                        switchBase: 'switchBase',
                        thumb: 'switchThumb',
                        track: 'switchTrack',
                        checked: 'switchChecked'
                      }}
                    />
                  </div>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <div className="modalContent">
                    <h4>
                      Add Driver:
                </h4>
                    <Switch
                      checked={this.state.addDriver}
                      onChange={this.handleSwitchChange('addDriver')}
                      value="addDriver"
                      classes={{
                        root: 'switchDefault',
                        switchBase: 'switchBase',
                        thumb: 'switchThumb',
                        track: 'switchTrack',
                        checked: 'switchChecked'
                      }}
                    />
                  </div>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <div className="modalContent">
                    <h4>
                      View Drivers:
                </h4>
                    <Switch
                      checked={this.state.viewDrivers}
                      onChange={this.handleSwitchChange('viewDrivers')}
                      value="viewDrivers"
                      classes={{
                        root: 'switchDefault',
                        switchBase: 'switchBase',
                        thumb: 'switchThumb',
                        track: 'switchTrack',
                        checked: 'switchChecked'
                      }}
                    />
                  </div>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <div className="modalContent">
                    <h4>
                      Add Vehicle:
                </h4>
                    <Switch
                      checked={this.state.addVehicle}
                      onChange={this.handleSwitchChange('addVehicle')}
                      value="addVehicle"
                      classes={{
                        root: 'switchDefault',
                        switchBase: 'switchBase',
                        thumb: 'switchThumb',
                        track: 'switchTrack',
                        checked: 'switchChecked'
                      }}
                    />
                  </div>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <div className="modalContent">
                    <h4>
                      View Vehicle:
                </h4>
                    <Switch
                      checked={this.state.viewVehicle}
                      onChange={this.handleSwitchChange('viewVehicle')}
                      value="viewVehicle"
                      classes={{
                        root: 'switchDefault',
                        switchBase: 'switchBase',
                        thumb: 'switchThumb',
                        track: 'switchTrack',
                        checked: 'switchChecked'
                      }}
                    />
                  </div>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <div className="modalContent">
                    <h4>
                      Assign Driver:
                </h4>
                    <Switch
                      checked={this.state.assignDriver}
                      onChange={this.handleSwitchChange('assignDriver')}
                      value="assignDriver"
                      classes={{
                        root: 'switchDefault',
                        switchBase: 'switchBase',
                        thumb: 'switchThumb',
                        track: 'switchTrack',
                        checked: 'switchChecked'
                      }}
                    />
                  </div>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <div className="modalContent">
                    <h4>
                      Attach Device:
                </h4>
                    <Switch
                      checked={this.state.attachDevice}
                      onChange={this.handleSwitchChange('attachDevice')}
                      value="attachDevice"
                      classes={{
                        root: 'switchDefault',
                        switchBase: 'switchBase',
                        thumb: 'switchThumb',
                        track: 'switchTrack',
                        checked: 'switchChecked'
                      }}
                    />
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <Button className="btn bg-default" onClick={this.submitHandler}>Edit User</Button>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
        {this.renderLoading()}
      </Fragment >
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
