import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { SuperHOC } from '../../../HOC';
import { Grid, TextField, Button, CircularProgress } from '@material-ui/core'
import Card from 'components/Card/Loadable'
import './style.scss'
import { toast } from 'react-toastify';
import 'sass/elements/sweet-alerts.scss';
import Joi from 'joi-browser'
import Switch from '@material-ui/core/Switch';
import Dialog from '@material-ui/core/Dialog';

// images
class AddRoleScreen extends Component {

  state = {
    roleName: '',
    roleDetail: '',
    error: {},
    loading: false,
    addUser: false,
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
    roleName: Joi.string().regex(/^[a-zA-Z ]{3}/).required().error(errors => {
      errors.forEach(err => {
        switch (err.type) {
          case "string.regex.base":
            err.message = "Role name must be more than 3 characters";
            break;
          default:
            err.message = "Please enter role name";
            break;
        }
      });
      return errors;
    }),
    roleDetail: Joi.string().regex(/^[a-zA-Z ]{50}/).required().error(errors => {
      errors.forEach(err => {
        switch (err.type) {
          case "string.regex.base":
            err.message = "Role Detail must be more than 50 characters";
            break;
          default:
            err.message = "Please enter role detail";
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
      roleName: this.state.roleName,
      roleDetail: this.state.roleDetail,
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
    this.setState({ loading: true }, () => {
      if (!error) {
        let emaill = this.props.user.companyEmail
        let body = {
          roleName: this.state.roleName,
          roleDetail: this.state.roleDetail,
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
        this.props.apiManager.makeCall("addEmployeeUserToCompany", body, (response) => {
          console.log('adddddd', response)
          console.log('adddddd', body)
          if (response.code === 1006) {
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
  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Add Role</title>
          <meta name="description" content="Description of AddRoleScreen" />
        </Helmet>
        <h2 className="breadcumbTitle">Add Role</h2>
        <Grid container spacing={3}>
          <Grid item xl={12} lg={12} xs={12}>
            <Card
              title="Add Role"
              className="addCompany"
            >
              <Grid container spacing={3}>
                <Grid item sm={6} xs={12}>
                  <TextField
                    label="Role Name"
                    placeholder="Role name here.."
                    fullWidth
                    variant="outlined"
                    name="roleName"
                    onChange={this.changeHandler}
                    value={this.state.roleName}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={this.state.error.roleName && true}
                    helperText={this.state.error.roleName && this.state.error.roleName}
                    className="formInput"
                  />
                </Grid>
                <Grid item sm={12} xs={12}>
                  <TextField
                    type="description"
                    label="Role Details"
                    placeholder="Role detail here.."
                    rows={10}
                    multiline={true}
                    fullWidth
                    variant="outlined"
                    name="roleDetail"
                    onChange={this.changeHandler}
                    value={this.state.roleDetail}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={this.state.error.roleDetail && true}
                    helperText={this.state.error.roleDetail && this.state.error.roleDetail}
                    className="formInput"
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <div className="modalContent">
                    <h4>
                      Add User:
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
                      View Route:
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
                  <Button className="btn bg-default" onClick={this.submitHandler}>Add Role</Button>
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
s
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);
export default SuperHOC((withConnect)(AddRoleScreen));
