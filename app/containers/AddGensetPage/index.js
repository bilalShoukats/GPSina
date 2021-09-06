/**
 *
 * AddGensetPage
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectAddGensetPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import Header from '../../components/Header';
import { useStyles } from './styles.js';
import { Button, Grid, Input, Typography } from '@material-ui/core';

export function AddGensetPage(props) {
  useInjectReducer({ key: 'addGensetPage', reducer });
  useInjectSaga({ key: 'addGensetPage', saga });

  const classes = useStyles(props);
  const [deviceId, setDeviceId] = useState("");
  const [deviceName, setDeviceName] = useState("");

  const handleChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;

    switch(name){
      case 'deviceId':
        setDeviceId(value);
        break;

      case 'deviceName':
        setDeviceName(value);
        break;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('handleSubmitAddGenset');
    props.history.goBack();
  }

  useEffect(() => {

  }, []);

  return (
    <div>
      <Helmet>
        <title>{props.intl.formatMessage({...messages.addGenset})}</title>
      </Helmet>
      <Header title={<FormattedMessage {...messages.addGenset} />} />

      <div>
        <Grid
          item
          sm={12}
          md={8}
          className={classes.root}
        >
          <div className={classes.container}>
            <Grid item>
              <Typography variant="body1" className={classes.label}>
                <FormattedMessage {...messages.deviceId} />
              </Typography>
              <Input
                className={classes.textInput}
                value={deviceId}
                name="deviceId"
                placeholder={props.intl.formatMessage({...messages.enterDeviceId})}
                onChange={handleChange}
                disableUnderline
              />
            </Grid>

            <Grid item>
              <Typography variant="body1" className={classes.label}>
                <FormattedMessage {...messages.deviceName} />
              </Typography>
              <Input
                className={classes.textInput}
                value={deviceName}
                name="deviceName"
                placeholder={props.intl.formatMessage({...messages.enterDeviceName})}
                onChange={handleChange}
                disableUnderline
              />
            </Grid>
          </div>

          <Grid
            container
            justify="center"
            alignItems="center"
            className={classes.btnContainer}
          >
            <Button size="medium" className={classes.btnBlue} onClick={handleSubmit}>
              <Typography variant="body1">
                <FormattedMessage {...messages.submit} />
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

AddGensetPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  addGensetPage: makeSelectAddGensetPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(AddGensetPage));
