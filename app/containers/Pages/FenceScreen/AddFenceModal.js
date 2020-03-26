import React, { Fragment, Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Joi from 'joi-browser'
import { Grid, TextField, Button, CircularProgress } from '@material-ui/core'
import { toast } from 'react-toastify';

class AddFenceModal extends Component {
  state = {
    fenceName: '',
    disabled: true,
    data: {},
    error: {},
    loading: false
  }

  schema = {
    fenceName: Joi.string().regex(/^[a-zA-Z]{8}/).required().error(errors => {
      errors.forEach(err => {
        switch (err.type) {
          case "string.regex.base":
            err.message = "fence name must be more than 7 character";
            break;
          default:
            err.message = "Please enter fence name";
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
      fenceName: this.state.fenceName,
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
          fenceName: this.state.fenceName,
          companyEmail: this.props.user.companyEmail,
          addresses: this.state.data,
        }
        this.props.apiManager.makeCall("addFence", body, (response) => {
          this.hideModal();
          if (response.code === 1008) {
            this.setState({ loading: false })
            toast.success('Fence added successfully!');
          }
          else {
            this.setState({ loading: false })
            toast.error(response.id)
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
    this.setState({ disabled: true, fenceName: "" })
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
            this.hideModal()
          }}
          open={!this.state.disabled}
          className="modalWrapper"
        >
          <div className="modalHead" >
            <Grid className="modalTitle">
              <h3>Add Fence Name</h3>
            </Grid>
            <DialogContent >
              <div className="modalContent">
                <TextField
                  label="Fence Name"
                  placeholder="Enter fence name.."
                  fullWidth
                  variant="outlined"
                  name="fenceName"
                  onChange={this.changeHandler}
                  value={this.state.fenceName}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={this.state.error.fenceName && true}
                  helperText={this.state.error.fenceName && this.state.error.fenceName}
                  className="formInput"
                />
              </div>
            </DialogContent>
            <Grid className="modalFooter">
              <Button style={{ padding: '5px 20px' }} className="btn bg-default" onClick={this.submitHandler}>
                Add Fence
              </Button>
            </Grid>
          </div>
        </Dialog>
        {this.renderLoading()}
      </Fragment>
    )
  }
}

export default (AddFenceModal);