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
    roleID: '',
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
    drivingAnalysis: false,
    fleetUtilization: false,
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
    roleDetail: Joi.string().regex(/^[a-zA-Z ]{30}/).required().error(errors => {
      errors.forEach(err => {
        switch (err.type) {
          case "string.regex.base":
            err.message = "Role Detail must be more than 30 characters";
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
  componentDidMount() {
    let a = this.props.location.search
    let b = a.split('?name=')
    let c = b[1].split('?desc=')
    let d = c[1].split('?id=')
    let name = window.atob(c[0])
    let description = window.atob(d[0])
    let id = window.atob(d[1])
    this.setState({ roleName: name, roleDetail: description, roleID: id })

    // this.getList()
  }

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
        let body = {
          title: this.state.roleName,
          description: this.state.roleDetail,
          roleID: parseInt(this.state.roleID),
          companyEmail: 'usman.malik@adad.com'
        }
        this.props.apiManager.makeCall("updateRole", body, (response) => {
          console.log('update role', response)
          console.log('update role', body)
          if (response.code === 1014) {
            this.setState({ loading: false })
            toast.success('Role updated successfully!')
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
          <title>Edit Role</title>
          <meta name="description" content="Description of EditRoleScreen" />
        </Helmet>
        <h2 className="breadcumbTitle">Edit Role</h2>
        <Grid container spacing={3}>
          <Grid item xl={12} lg={12} xs={12}>
            <Card
              title="Edit Role"
              className="addCompany"
            >
              <Grid container spacing={3}>
                <Grid item sm={4} xs={12}>
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
                <Grid item sm={8} xs={12}>
                  <TextField
                    type="description"
                    label="Role Details"
                    placeholder="Role detail here.."
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
                <Grid item xs={12}>
                  <Button className="btn bg-default" onClick={this.submitHandler}>Update Role</Button>
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
