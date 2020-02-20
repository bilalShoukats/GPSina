import React from 'react';
import TextField from "@material-ui/core/TextField";
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from "@material-ui/core/Button";

import CustomModal from "../../../../CustomModal";
import {toast} from "react-toastify";

class RequestMoney extends React.Component {
  constructor(props) {
    super(props);
    this.inputLabel = React.createRef();
  }

  state = {
    email: '',
    amount: '',
    short_description: '',
    labelWidth: 0,
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

    const {email, amount} = this.state;

    if (email === '') {
      toast.error('Please enter your email');
    }
    if (amount === '') {
      toast.error('Please enter your amount');
    }
    if (email !== '' && amount !== '') {
      toast.success('Form Submitted');
      this.props.toggleModal(false);
      this.setState({
        email: '',
        amount: '',
        short_description: '',
      })
    }
  };

  render() {
    const {open, toggleModal} = this.props;
    const {email, amount, short_description, labelWidth} = this.state;
    return (
      <CustomModal
        title="Request Money"
        open={open}
        toggleModal={toggleModal}
      >
        <form onSubmit={this.submitHandler}>
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
            label="Amount"
            onChange={this.handleChange('amount')}
            value={amount}
            type="number"
            placeholder="Enter your phone"
            variant="outlined"
          />
          <TextField
            className="formInput"
            fullWidth
            label="Short Description"
            onChange={this.handleChange('short_description')}
            value={short_description}
            placeholder="Enter your website"
            variant="outlined"
          />
          <Button type="submit" variant="contained" size="large" color="primary"
                  className="cBtn">Submit</Button>
        </form>
      </CustomModal>
    )
  }
}

export default RequestMoney;
