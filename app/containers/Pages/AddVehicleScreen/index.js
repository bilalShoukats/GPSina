import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { SuperHOC } from '../../../HOC';
import { Grid, TextField, Button, Tab, Tabs, CircularProgress } from '@material-ui/core'
import Card from 'components/Card/Loadable'
import './style.scss'
import { ToastContainer, toast } from 'react-toastify';
import 'sass/elements/sweet-alerts.scss';
import Joi from 'joi-browser'
import Dialog from '@material-ui/core/Dialog';

// images
import companyLogo from 'images/team/img1.jpg'

class AddVehicleScreen extends Component {

  state = {
    companyEmail: '',
    vehicleName: '',
    directorName: '',
    companyLogo: '',
    error: {},
    file: '',
    loading: false
  }

  schema = {
    carOwnername: Joi.string().regex(/^[a-zA-Z ]{8}/).required().error(errors => {
      errors.forEach(err => {
        switch (err.type) {
          case "string.regex.base":
            err.message = "Owner name must be more than 7 character";
            break;
          default:
            err.message = "Please enter Owner name";
            break;
        }
      });
      return errors;
    }),
    carModel: Joi.string().regex(/^[a-zA-Z0-9]{6}/).required().error(errors => {
      errors.forEach(err => {
        switch (err.type) {
          case "string.regex.base":
            err.message = "Modal name must be more than 5 character";
            break;
          default:
            err.message = "Please enter Model name";
            break;
        }
      });
      return errors;
    }),
    color: Joi.string().regex(/^[a-zA-Z0-9]{4}/).required().error(errors => {
      errors.forEach(err => {
        switch (err.type) {
          case "string.regex.base":
            err.message = "Color must be more than 3 character";
            break;
          default:
            err.message = "Please enter Color";
            break;
        }
      });
      return errors;
    }),
    carType: Joi.string().regex(/^[a-zA-Z0-9 ]{8}/).required().error(errors => {
      errors.forEach(err => {
        switch (err.type) {
          case "string.regex.base":
            err.message = "Car type must be more than 7 character";
            break;
          default:
            err.message = "Please enter car type";
            break;
        }
      });
      return errors;
    }),
    fuelType: Joi.string().regex(/^[a-zA-Z0-9]{4}/).required().error(errors => {
      errors.forEach(err => {
        switch (err.type) {
          case "string.regex.base":
            err.message = "Fuel type must be more than 3 character";
            break;
          default:
            err.message = "Please enter fuel type";
            break;
        }
      });
      return errors;
    }),
    mileage: Joi.string().regex(/^[0-9]{4}/).required().error(errors => {
      errors.forEach(err => {
        switch (err.type) {
          case "string.regex.base":
            err.message = "Mileage must be more than 3 number";
            break;
          default:
            err.message = "Please enter mileage";
            break;
        }
      });
      return errors;
    }),
    engineNo: Joi.string().regex(/^[a-zA-Z0-9]{7}/).required().error(errors => {
      errors.forEach(err => {
        switch (err.type) {
          case "string.regex.base":
            err.message = "Engine Number must be more than 6 character";
            break;
          default:
            err.message = "Please enter engine number";
            break;
        }
      });
      return errors;
    }),
    registrationNo: Joi.string().regex(/^[a-zA-Z0-9]{6}/).required().error(errors => {
      errors.forEach(err => {
        switch (err.type) {
          case "string.regex.base":
            err.message = "Registration Number must be more than 5 character";
            break;
          default:
            err.message = "Please enter registration number";
            break;
        }
      });
      return errors;
    }),
    chassis: Joi.string().regex(/^[0-9]{5}/).required().error(errors => {
      errors.forEach(err => {
        switch (err.type) {
          case "string.regex.base":
            err.message = "Chassis number must be more than 4 number";
            break;
          default:
            err.message = "Please enter chassis number";
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
      carOwnername: this.state.carOwnername,
      carModel: this.state.carModel,
      color: this.state.color,
      carType: this.state.carType,
      fuelType: this.state.fuelType,
      mileage: this.state.mileage,
      engineNo: this.state.engineNo,
      registrationNo: this.state.registrationNo,
      chassis: this.state.chassis,

    }
    const { error } = Joi.validate(form, this.schema, options)
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message
    return errors;
  };

  submitHandler = (e) => {
    e.preventDefault()
    console.log("submitting add vehicle form");
    const error = this.validate()
    this.setState({ loading: true }, () => {
      if (!error) {
        let body = {
          carOwnername: this.state.carOwnername,
          carModel: this.state.carModel,
          color: this.state.color,
          carType: this.state.carType,
          fuelType: this.state.fuelType,
          mileage: this.state.mileage,
          engineNo: this.state.engineNo,
          registrationNo: this.state.registrationNo,
          chassis: this.state.chassis,
          companyEmail: this.props.user.companyEmail,
        }
        this.props.apiManager.makeCall("addCar", body, (response) => {
          console.log('addcar', body)
          if (response.code === 1008) {
            this.setState({ loading: false })
            toast.success('Vehicle added successfully!')
          }
          else
            this.setState({ loading: false })
          toast.error(response.id)
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
  handleChange = (event) => {
    this.setState({
      file: URL.createObjectURL(event.target.files[0])
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
    return (
      <Fragment>
        <Helmet>
          <title>Add Vehicle</title>
          <meta name="description" content="Description of AddVehicleScreen" />
        </Helmet>
        <h2 className="breadcumbTitle">Add Vehicle</h2>
        <Grid container spacing={3}>
          <Grid item xl={3} lg={4} xs={12}>
            <Grid className="companyInfoWrap">
              <Grid className="companyInfoImg">
                <img style={{ borderRadius: " 200px", width: "130px", height: "130px" }} src={this.state.file !== '' ? this.state.file : companyLogo} alt='' />
              </Grid>
              <input id="file" name="file" style={{ display: 'none' }} type="file" onChange={this.handleChange} />
              <label style={{ color: 'blue', cursor: 'pointer' }} htmlFor="file">Edit Image</label>
              <Grid className="companyInfoContent">
                <h4>Please upload Vehicle logo</h4>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xl={9} lg={8} xs={12}>
            <Card
              title="Add Vehicle"
              className="addCompany"
            >
              <Grid container spacing={3}>
                <Grid item sm={6} xs={12}>
                  <TextField
                    label="Vehicle Owner Name"
                    placeholder="Vehicle owner name here.."
                    fullWidth
                    variant="outlined"
                    name="carOwnername"
                    onChange={this.changeHandler}
                    value={this.state.carOwnername}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={this.state.error.carOwnername && true}
                    helperText={this.state.error.carOwnername && this.state.error.carOwnername}
                    className="formInput"
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    label="Car Modal"
                    placeholder="Your car modal here.."
                    fullWidth
                    variant="outlined"
                    name="carModel"
                    onChange={this.changeHandler}
                    value={this.state.carModel}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={this.state.error.carModel && true}
                    helperText={this.state.error.carModel && this.state.error.carModel}
                    className="formInput"
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    label="Vehicle Color"
                    placeholder="Vehicle color here.."
                    fullWidth
                    variant="outlined"
                    name="color"
                    onChange={this.changeHandler}
                    value={this.state.color}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={this.state.error.color && true}
                    helperText={this.state.error.color && this.state.error.color}
                    className="formInput"
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    label="Vehicle Type"
                    placeholder="Your vehicle type here.."
                    fullWidth
                    variant="outlined"
                    name="carType"
                    onChange={this.changeHandler}
                    value={this.state.carType}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={this.state.error.carType && true}
                    helperText={this.state.error.carType && this.state.error.carType}
                    className="formInput"
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    label="Fuel Type"
                    placeholder="Vehicle fuel type here.."
                    fullWidth
                    variant="outlined"
                    name="fuelType"
                    onChange={this.changeHandler}
                    value={this.state.fuelType}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={this.state.error.fuelType && true}
                    helperText={this.state.error.fuelType && this.state.error.fuelType}
                    className="formInput"
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    label="Vehicle Mileage"
                    placeholder="Vehicle mileage here.."
                    fullWidth
                    variant="outlined"
                    name="mileage"
                    onChange={this.changeHandler}
                    value={this.state.mileage}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={this.state.error.mileage && true}
                    helperText={this.state.error.mileage && this.state.error.mileage}
                    className="formInput"
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    label="Engine Number"
                    placeholder="Vehicle engine number here.."
                    fullWidth
                    variant="outlined"
                    name="engineNo"
                    onChange={this.changeHandler}
                    value={this.state.engineNo}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={this.state.error.engineNo && true}
                    helperText={this.state.error.engineNo && this.state.error.engineNo}
                    className="formInput"
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    label="Vehicle Registration Number"
                    placeholder="Vehicle registration number here.."
                    fullWidth
                    variant="outlined"
                    name="registrationNo"
                    onChange={this.changeHandler}
                    value={this.state.registrationNo}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={this.state.error.registrationNo && true}
                    helperText={this.state.error.registrationNo && this.state.error.registrationNo}
                    className="formInput"
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    label="Vehicle Chassis Number"
                    placeholder="Vehicle chassis number here.."
                    fullWidth
                    variant="outlined"
                    name="chassis"
                    onChange={this.changeHandler}
                    value={this.state.chassis}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={this.state.error.chassis && true}
                    helperText={this.state.error.chassis && this.state.error.chassis}
                    className="formInput"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button className="btn bg-default" onClick={this.submitHandler}>Add Vehicle</Button>
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
//   addVehicleScreen: makeSelectAddVehicleScreen(),
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

// export default compose(withConnect)(AddVehicleScreen);

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);
export default SuperHOC((withConnect)(AddVehicleScreen));
