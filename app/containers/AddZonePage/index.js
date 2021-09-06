/**
 *
 * AddZonePage
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
import makeSelectAddZonePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import Header from '../../components/Header';
import { useStyles } from './styles.js';
import { Button, Grid, Input, Typography } from '@material-ui/core';

export function AddZonePage(props) {
  useInjectReducer({ key: 'addZonePage', reducer });
  useInjectSaga({ key: 'addZonePage', saga });

  const classes = useStyles(props);
  const [deliveryArea, setDeliveryArea] = useState("");

  const handleChange = (e) => {
    e.preventDefault();

  const { name, value } = e.target;

    switch(deliveryArea){
      case 'deliveryArea':
        setDeliveryArea(value);
        break;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('handleSubmitAddZonePage');
    props.history.goBack();
  }

  useEffect(() => {

  }, []);

  return (
    <div>
      <Helmet>
        <title>{props.intl.formatMessage({...messages.addZone})}</title>
      </Helmet>
      <Header title={<FormattedMessage {...messages.addZone} />} />

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
                <FormattedMessage {...messages.deliveryArea} />
              </Typography>
              <Input
                className={classes.textInput}
                value={deliveryArea}
                name="deliveryArea"
                placeholder={props.intl.formatMessage({...messages.enterDeliveryArea})}
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

AddZonePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  addZonePage: makeSelectAddZonePage(),
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

export default compose(withConnect)(injectIntl(AddZonePage));
