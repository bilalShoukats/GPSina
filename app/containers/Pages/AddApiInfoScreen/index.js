import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { SuperHOC } from '../../../HOC';
import { Grid, TextField, Button, CircularProgress } from '@material-ui/core'
import Card from 'components/Card/Loadable'
import './style.scss'
import { ToastContainer, toast } from 'react-toastify';
import 'sass/elements/sweet-alerts.scss';
import Joi from 'joi-browser'
import Dialog from '@material-ui/core/Dialog';

// images
import companyLogo from 'images/team/img1.jpg'

class AddApiInfoScreen extends Component {

  state = {
    apiUrl: '',
    apiName: '',
    directorName: '',
    companyLogo: '',
    error: {},
    loading: false,
    file: ''
  }

  schema = {
    apiName: Joi.string().regex(/^[a-zA-Z0-9]{5}/).required().error(errors => {
      errors.forEach(err => {
        switch (err.type) {
          case "string.regex.base":
            err.message = "Api name name must be more than 5 character";
            break;
          default:
            err.message = "Please enter api name";
            break;
        }
      });
      return errors;
    }),
    apiUrl: Joi.string().regex(/^[a-zA-Z0-9]{6}/).required().error(errors => {
      errors.forEach(err => {
        switch (err.type) {
          case "string.regex.base":
            err.message = "Api url must be more than 6 character";
            break;
          default:
            err.message = "Please enter api url";
            break;
        }
      });
      return errors;
    }),
    apiType: Joi.string().regex(/^[a-zA-Z0-9]{2}/).required().error(errors => {
      errors.forEach(err => {
        switch (err.type) {
          case "string.regex.base":
            err.message = "Api type must be more than 2 character";
            break;
          default:
            err.message = "Please enter api type";
            break;
        }
      });
      return errors;
    }),
    apiDescription: Joi.string().regex(/^[a-zA-Z ]{20}/).required().error(errors => {
      errors.forEach(err => {
        switch (err.type) {
          case "string.regex.base":
            err.message = "Api Detail must be more than 20 characters";
            break;
          default:
            err.message = "Please enter api detail";
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
      apiName: this.state.apiName,
      apiUrl: this.state.apiUrl,
      apiDescription: this.state.apiDescription,
      apiType: this.state.apiType
    }
    const { error } = Joi.validate(form, this.schema, options)
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message
    return errors;
  };

  submitHandler = (e) => {
    e.preventDefault()
    console.log('add Devicess', this.state.apiUrl);
    const error = this.validate()
    this.setState({ loading: true }, () => {
      if (!error) {
        let body = {
          apiName: this.state.apiName,
          apiUrl: this.state.apiUrl,
          apiDescription: this.state.apiDescription,
          apiType: this.state.apiType

        }
        this.props.apiManager.makeCall("addApiInfo", body, (response) => {
          console.log('add Api', response)
          console.log('add Api', body)
          if (response.code === 1008) {
            this.setState({ loading: false })
            toast.success('Info added successfully!')
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
  handleChange = (event) => {
    this.setState({
      file: URL.createObjectURL(event.target.files[0])
    })
  }
  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Add Api Info</title>
          <meta name="description" content="Description of AddApiInfoScreen" />
        </Helmet>
        <h2 className="breadcumbTitle">Add Api Info</h2>
        <Grid container spacing={3}>
          <Grid item xl={12} lg={12} xs={12}>
            <Card
              title="Add Api Info"
              className="addCompany"
            >
              <Grid container spacing={3}>
                <Grid item sm={4} xs={12}>
                  <TextField
                    label="Api Name"
                    placeholder="Api name here.."
                    fullWidth
                    variant="outlined"
                    name="apiName"
                    onChange={this.changeHandler}
                    value={this.state.apiName}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={this.state.error.apiName && true}
                    helperText={this.state.error.apiName && this.state.error.apiName}
                    className="formInput"
                  />
                </Grid>
                <Grid item sm={4} xs={12}>
                  <TextField
                    label="Api Url"
                    placeholder="Api url here.."
                    fullWidth
                    variant="outlined"
                    name="apiUrl"
                    max={9}
                    onChange={this.changeHandler}
                    value={this.state.apiUrl}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={this.state.error.apiUrl && true}
                    helperText={this.state.error.apiUrl && this.state.error.apiUrl}
                    className="formInput"
                  />
                </Grid>
                <Grid item sm={4} xs={12}>
                  <TextField
                    label="Api Type"
                    placeholder="Api type here.."
                    fullWidth
                    variant="outlined"
                    name="apiType"
                    max={9}
                    onChange={this.changeHandler}
                    value={this.state.apiType}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={this.state.error.apiType && true}
                    helperText={this.state.error.apiType && this.state.error.apiType}
                    className="formInput"
                  />
                </Grid>
                <Grid item sm={12} xs={12}>
                  <TextField
                    type="description"
                    label="Api Details"
                    placeholder="Api detail here.."
                    rows={10}
                    multiline={true}
                    fullWidth
                    variant="outlined"
                    name="apiDescription"
                    onChange={this.changeHandler}
                    value={this.state.apiDescription}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={this.state.error.apiDescription && true}
                    helperText={this.state.error.apiDescription && this.state.error.apiDescription}
                    className="formInput"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button className="btn bg-default" onClick={this.submitHandler}>Add Info</Button>
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
export default SuperHOC((withConnect)(AddApiInfoScreen));
