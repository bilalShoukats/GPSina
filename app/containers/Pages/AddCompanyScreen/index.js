import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import makeSelectAddCompanyScreen from './selectors';
import { SuperHOC } from '../../../HOC';
import { Grid, TextField, Button, Tab, Tabs } from '@material-ui/core'
import Card from 'components/Card/Loadable'
import './style.scss'
import { ToastContainer, toast } from 'react-toastify';
import 'sass/elements/sweet-alerts.scss';
import Joi from 'joi-browser'

// images
import companyLogo from 'images/team/img1.jpg'

class AddCompanyScreen extends Component {

  state = {
    companyEmail: '',
    companyName: '',
    directorName: '',
    companyLogo: '',
    error: {},
  }

  schema = {
    companyName: Joi.string().regex(/^[a-zA-Z ]{8}/).required().error(errors => {
      errors.forEach(err => {
        switch (err.type) {
          case "string.regex.base":
            err.message = "Company name must be more than 7 character";
            break;
          default:
            err.message = "Please enter company name";
            break;
        }
      });
      return errors;
    }),
    directorName: Joi.string().regex(/^[a-zA-Z ]{8}/).required().error(errors => {
      errors.forEach(err => {
        switch (err.type) {
          case "string.regex.base":
            err.message = "Director name must be more than 7 character";
            break;
          default:
            err.message = "Please enter director name";
            break;
        }
      });
      return errors;
    }),
    companyEmail: Joi.string().email({ minDomainAtoms: 2 }).required().error(errors => {
      errors.forEach(err => {
        switch (err.type) {
          case "string.email":
            err.message = "Please enter valid email address";
            break;
          default:
            err.message = "Company email cannot be empty";
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
    console.log("submitting add company form");
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
          toast.success('Company added successfully!')
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

  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Add Company</title>
          <meta name="description" content="Description of AddCompanyScreen" />
        </Helmet>
        <h2 className="breadcumbTitle">Add Company</h2>
        <Grid container spacing={3}>
          <Grid item xl={3} lg={4} xs={12}>
            <Grid className="companyInfoWrap">
              <Grid className="companyInfoImg">
                <img src={companyLogo} alt="" />
              </Grid>
              <Grid className="companyInfoContent">
                <h4>Please upload company logo</h4>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xl={9} lg={8} xs={12}>
            <Card
              title="Add Company"
              className="addCompany"
            >
              <Grid container spacing={3}>
                <Grid item sm={6} xs={12}>
                  <TextField
                    label="Company Name"
                    placeholder="Your company name here.."
                    fullWidth
                    variant="outlined"
                    name="companyName"
                    onChange={this.changeHandler}
                    value={this.state.companyName}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={this.state.error.companyName && true}
                    helperText={this.state.error.companyName && this.state.error.companyName}
                    className="formInput"
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    label="Company Email"
                    placeholder="Your company email here.."
                    fullWidth
                    variant="outlined"
                    name="companyEmail"
                    onChange={this.changeHandler}
                    value={this.state.companyEmail}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={this.state.error.companyEmail && true}
                    helperText={this.state.error.companyEmail && this.state.error.companyEmail}
                    className="formInput"
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    label="Director Name"
                    placeholder="Your director name here.."
                    fullWidth
                    variant="outlined"
                    name="directorName"
                    onChange={this.changeHandler}
                    value={this.state.directorName}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={this.state.error.directorName && true}
                    helperText={this.state.error.directorName && this.state.error.directorName}
                    className="formInput"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button className="btn bg-default" onClick={this.submitHandler}>Add Company</Button>
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