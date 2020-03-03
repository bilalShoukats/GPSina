import React, { Fragment, Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Joi from 'joi-browser'
import { Grid, TextField, Button, } from '@material-ui/core'
import { toast } from 'react-toastify';

class AddRouteModal extends Component {
  state = {
    routeName: '',
    disabled: true,
    data: {},
    error: {}
  }

  schema = {
    routeName: Joi.string().regex(/^[a-zA-Z]{8}/).required().error(errors => {
      errors.forEach(err => {
        switch (err.type) {
          case "string.regex.base":
            err.message = "route name must be more than 7 character";
            break;
          default:
            err.message = "Please enter route name";
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
      routeName: this.state.routeName,
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
    if (!error) {
      let body = {
        routeName: this.state.routeName,
        companyEmail: this.props.user.companyEmail,
        addresses: this.state.data,
      }
      this.props.apiManager.makeCall("addRoute", body, (response) => {
        this.hideModal();
        if (response.code === 1008) {
          toast.success('Route added successfully!');
        }
        else
          toast.error(response.id)
      });
    } else {
      this.setState({
        error: error || {}
      })
    }
  }

  hideModal = () => {
    this.setState({ disabled: true, routeName: "" })
  }

  showModal = (data) => {
    this.setState({ disabled: false, data: data })
  }

  render() {
    return (
      <Fragment>
        <Dialog
          onClose={() => {
            this.hideModal()
          }}
          open={!this.state.disabled}
          className="modalWrapper"
        >
          <div className="modalHead" >
            <Grid className="modalTitle">
              <h3>Add Route Name</h3>
            </Grid>
            <DialogContent >
              <div className="modalContent">
                <TextField
                  label="Route Name"
                  placeholder="Enter route name.."
                  fullWidth
                  variant="outlined"
                  name="routeName"
                  onChange={this.changeHandler}
                  value={this.state.routeName}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={this.state.error.routeName && true}
                  helperText={this.state.error.routeName && this.state.error.routeName}
                  className="formInput"
                />
              </div>
            </DialogContent>
            <Grid className="modalFooter">
              <Button style={{ padding: '5px 20px' }} className="btn bg-default" onClick={this.submitHandler}>
                Add Route
              </Button>
            </Grid>
          </div>
        </Dialog>
      </Fragment>
    )
  }
}

export default (AddRouteModal);