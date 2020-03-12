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
    companyEmail: '',
    companyName: '',
    directorName: '',
    companyLogo: '',
    error: {},
    loading: false,
    file: ''
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
      // companyEmail: this.state.companyEmail,
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
    this.setState({ loading: true }, () => {
      if (!error) {
        let body = {
          email: this.props.match.params.item,
          companyName: this.state.companyName,
          director: this.state.directorName
        }
        this.props.apiManager.makeCall("updateCompany", body, (response) => {
          console.log('add company', response)
          console.log('add company', body)
          if (response.code === 1014) {
            this.setState({ loading: false })
            toast.success('Company added successfully!')
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

  componentDidMount() {
    this.getSingleCompanyDetail()
  }

  getSingleCompanyDetail = () => {
    // let dec = window.atob(this.props.match.params.item)
    let body = {
      companyEmail: this.props.match.params.item,
      // driverId: this.props.match.params.item
    }
    // console.log('alssssl', body)
    this.props.apiManager.makeCall(`getCompanyDetail`, body, res => {
      console.log('alssssl', res)
      console.log('alssssl', body)
      if (res.code === 5056) {
        this.setState({
          userDetail: res.response, currentPage: res.currentPage, totalPages: res.totalPages, loading: false,
          companyName: res.response.companyName,
          directorName: res.response.director,
          companyEmail: res.response.email,
          file: res.response.companyLogo
        });
      }
      else {
        this.setState({ loading: false });
        toast.error(res.id);
      }
    })
  }
  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Edit Company</title>
          <meta name="description" content="Description of AddCompanyScreen" />
        </Helmet>
        <h2 className="breadcumbTitle">Edit Company</h2>
        <Grid container spacing={3}>
          <Grid item xl={3} lg={4} xs={12}>
            <Grid className="companyInfoWrap">
              <Grid className="companyInfoImg">
                <img style={{ borderRadius: " 200px", width: "130px", height: "130px" }} src={this.state.file !== '' ? this.state.file : companyLogo} alt='' />
              </Grid>
              <input id="file" name="file" style={{ display: 'none' }} type="file" onChange={this.handleChange} />
              <label style={{ color: 'blue', cursor: 'pointer' }} htmlFor="file">Edit Image</label>
              <Grid className="companyInfoContent">
                <h4>Please upload company logo</h4>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xl={9} lg={8} xs={12}>
            <Card
              title="Edit Company"
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
                    style={{ backgroundColor: '#8080801c' }}
                    disabled={true}
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
                    // placeholder="Your director name here.."
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
                  <Button className="btn bg-default" onClick={this.submitHandler}>Edit Company</Button>
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
export default SuperHOC((withConnect)(AddCompanyScreen));
