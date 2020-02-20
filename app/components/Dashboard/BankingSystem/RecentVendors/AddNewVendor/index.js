import React from 'react';
import TextField from "@material-ui/core/TextField";
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from "@material-ui/core/Button";
import {toast} from 'react-toastify';

import CustomModal from "../../../../CustomModal";

class AddNewVendor extends React.Component {
  constructor(props) {
    super(props);
    this.inputLabel = React.createRef();
  }

  state = {
    name: '',
    email: '',
    phone: '',
    website: '',
    category: '',
    labelWidth: 0
  };

  componentDidMount() {
    this.setState({
      labelWidth: 70
    })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  submitHandler = e => {
    e.preventDefault();

    const {name} = this.state;

    if (name !== ''){
      this.props.submittedData(this.state);
      toast.success('Vendor added successfully');
      this.setState({
        name: '',
        email: '',
        phone: '',
        website: '',
        category: '',
      })
    }
    else {
      toast.error('Empty field is not allowed');
    }
  };

  render() {
    const {open, toggleModal} = this.props;
    const {name, email, phone, website, category, labelWidth} = this.state;
    return (
      <CustomModal
        title="Add New Vendors "
        open={open}
        toggleModal={toggleModal}
      >
        <form onSubmit={this.submitHandler}>
          <TextField
            className="formInput"
            fullWidth
            label="Name"
            onChange={this.handleChange('name')}
            value={name}
            placeholder="Enter your name"
            variant="outlined"
          />
          <TextField
            className="formInput"
            fullWidth
            label="Email"
            onChange={this.handleChange('email')}
            value={email}
            type="email"
            placeholder="Enter your email"
            variant="outlined"
          />
          <TextField
            className="formInput"
            fullWidth
            label="Phone"
            onChange={this.handleChange('phone')}
            value={phone}
            type="number"
            placeholder="Enter your phone"
            variant="outlined"
          />
          <TextField
            className="formInput"
            fullWidth
            label="Website"
            onChange={this.handleChange('website')}
            value={website}
            placeholder="Enter your website"
            variant="outlined"
          />
          <FormControl variant="outlined" fullWidth className="formInput">
            <InputLabel ref={r => this.inputLabel = r} id="demo-simple-select-outlined-label">
              Category
            </InputLabel>
            <Select
              labelid="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={category}
              onChange={this.handleChange('category')}
              labelWidth={labelWidth}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={1}>Category One</MenuItem>
              <MenuItem value={2}>Category Two</MenuItem>
              <MenuItem value={3}>Category Three</MenuItem>
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" size="large" color="primary"
                  className="cBtn">Submit</Button>
        </form>
      </CustomModal>
    )
  }
}

export default AddNewVendor;
