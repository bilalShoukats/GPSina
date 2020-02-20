import React, {Fragment, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Helmet} from 'react-helmet';
import {FormattedMessage} from 'react-intl';
import {compose} from 'redux';
import messages from './messages';
import {Grid, TextField, InputAdornment, Link, Button} from '@material-ui/core'
import './style.scss'

// images
import avatar from 'images/avatar.jpg'

const LockScreen = () => {
  const [password, setPassword] = useState('')
  return (
    <Fragment>
      <Helmet>
        <title>Lock Screen</title>
        <meta name="description" content="Description of LockScreen"/>
      </Helmet>
      <h2 className="breadcumbTitle">Lock Screen</h2>
      <Grid className="lockScreenWrap">
        <Grid className="lockScreenImg">
          <img src={avatar} alt=""/>
        </Grid>
        <Grid className="lockScreendContent">
          <h4>John Doe</h4>
          <span className="text">johndoe@okler.com</span>
          <TextField
            label="Confirm Password"
            placeholder="Your password here.."
            fullWidth
            type='password'
            variant="outlined"
            name="confirm_password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            InputLabelProps={{
              shrink: true,
            }}
            className="formInput"
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="end">
                  <i className="fa fa-lock"/>
                </InputAdornment>
              ),
            }}
          />
          <ul>
            <li><Button className="btn bg-default btn-radius">Unlock</Button></li>
          </ul>
        </Grid>
      </Grid>
    </Fragment>
  );
}

LockScreen.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(LockScreen);
