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

class AddCompanyScreen extends Component {

  state = {
    deviceId: Math.floor(100000000 + Math.random() * 900000000),
    softwareVer: '',
    directorName: '',
    companyLogo: '',
    error: {},
    loading: false,
    file: ''
  }

  schema = {
    softwareVer: Joi.string().regex(/^[a-zA-Z0-9]{8}/).required().error(errors => {
      errors.forEach(err => {
        switch (err.type) {
          case "string.regex.base":
            err.message = "softwareVersion name must be more than 7 character";
            break;
          default:
            err.message = "Please enter softwareVersion";
            break;
        }
      });
      return errors;
    }),
    deviceId: Joi.string().regex(/[0-9]{9}/).length(9).required().error(errors => {
      errors.forEach(err => {
        switch (err.type) {
          case "string.regex.base":
            err.message = "Device id must be of 9 character";
            break;
          default:
            err.message = "Device id must be of 9 character";
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
      softwareVer: this.state.softwareVer,
      deviceId: this.state.deviceId.toString(),
    }
    const { error } = Joi.validate(form, this.schema, options)
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message
    return errors;
  };

  submitHandler = (e) => {
    e.preventDefault()
    console.log('add Devicess', this.state.deviceId);
    const error = this.validate()
    this.setState({ loading: true }, () => {
      if (!error) {
        let body = {
          softwareVer: this.state.softwareVer,
          deviceId: this.state.deviceId,
        }
        this.props.apiManager.makeCall("addDevice", body, (response) => {
          console.log('add Device', response)
          console.log('add Device', body)
          if (response.code === 1008) {
            this.setState({ loading: false })
            toast.success('Device added successfully!')
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
          <title>Add Device</title>
          <meta name="description" content="Description of AddCompanyScreen" />
        </Helmet>
        <h2 className="breadcumbTitle">Add Device</h2>
        <Grid container spacing={3}>
          {/* <Grid item xl={3} lg={4} xs={12}>
            <Grid className="companyInfoWrap">
              <Grid className="companyInfoImg">
                <img style={{ borderRadius: " 200px", width: "130px", height: "130px" }} src={this.state.file !== '' ? this.state.file : companyLogo} alt='' />
              </Grid>
              <input id="file" name="file" style={{ display: 'none' }} type="file" onChange={this.handleChange} />
              <label style={{ color: 'blue', cursor: 'pointer' }} htmlFor="file">Edit Image</label>
              <Grid className="companyInfoContent">
                <h4>Please upload Device logo</h4>
              </Grid>
            </Grid>
          </Grid> */}
          <Grid item xl={12} lg={12} xs={12}>
            <Card
              title="Add Device"
              className="addCompany"
            >
              <Grid container spacing={3}>
                <Grid item sm={6} xs={12}>
                  <TextField
                    label="Software Version"
                    placeholder="Your software version here.."
                    fullWidth
                    variant="outlined"
                    name="softwareVer"
                    onChange={this.changeHandler}
                    value={this.state.softwareVer}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={this.state.error.softwareVer && true}
                    helperText={this.state.error.softwareVer && this.state.error.softwareVer}
                    className="formInput"
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    label="Device Id"
                    placeholder="Your company email here.."
                    fullWidth
                    variant="outlined"
                    name="deviceId"
                    max={9}
                    onChange={this.changeHandler}
                    value={this.state.deviceId}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={this.state.error.deviceId && true}
                    helperText={this.state.error.deviceId && this.state.error.deviceId}
                    className="formInput"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button className="btn bg-default" onClick={this.submitHandler}>Add Device</Button>
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
//   addCompanyScreen: makeSelectAddCompanyScreen(),
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

// export default compose(withConnect)(AddCompanyScreen);

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);
export default SuperHOC((withConnect)(AddCompanyScreen));
