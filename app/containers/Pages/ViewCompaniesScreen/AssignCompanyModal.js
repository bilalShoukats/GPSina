import React, { Fragment, Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Joi from 'joi-browser'
import { Grid, TextField, Button, CircularProgress } from '@material-ui/core'
import { toast } from 'react-toastify';

class AddRouteModal extends Component {
  state = {
    email: '',
    disabled: true,
    data: {},
    error: {},
    loading: false
  }

  schema = {
    email: Joi.string().email({ minDomainAtoms: 2 }).required().error(errors => {
      errors.forEach(err => {
        switch (err.type) {
          case "string.email":
            err.message = "Email Mast be a Valid email";
            break;
          default: err.message = "Email can not be empty";
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
      email: this.state.email,
    }
    const { error } = Joi.validate(form, this.schema, options)
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message
    return errors;
  };

  submitHandler = (e) => {
    e.preventDefault()
    const error = this.validate()
    this.setState({ loading: true }, () => {
      if (!error) {
        let body = {
          adminEmail: this.state.email,
          companyEmail: this.props.companyEmail,
        }
        this.props.apiManager.makeCall("assignCompanyToAdmin", body, (response) => {
          console.log('lkjkl', response)
          console.log('lkjkl', body)
          if (response.code === 1014) {
            toast.success('Route added successfully!');
            this.props.close();
          }
          else {
            toast.error(response.id)
            this.props.close();
          }
        });
      } else {
        this.setState({
          loading: false,
          error: error || {}
        })
      }
    })
  }

  hideModal = () => {
    this.setState({ disabled: true, email: "" })
  }

  showModal = (data) => {
    this.setState({ disabled: false, data: data })
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
        <Dialog
          onClose={() => {
            this.props.close()
          }}
          open={this.props.open}
          className="modalWrapper"
        >
          <div className="modalHead" >
            <Grid className="modalTitle">
              <h3>Enter Email</h3>
            </Grid>
            <DialogContent >
              <div className="modalContent">
                <TextField
                  label="Email"
                  placeholder="Enter Email"
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
              </div>
            </DialogContent>
            <Grid className="modalFooter">
              <Button style={{ padding: '5px 20px' }} className="btn bg-default" onClick={this.submitHandler}>
                Submit
              </Button>
            </Grid>
          </div>
        </Dialog>
        {this.renderLoading()}
      </Fragment>
    )
  }
}

export default (AddRouteModal);