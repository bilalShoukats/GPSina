/**
 *
 * ZoneDetailPage
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
import makeSelectZoneDetailPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import Header from '../../components/Header';
import { useStyles } from './styles.js';
import { Button, Grid,Input, Radio, RadioGroup, Typography } from '@material-ui/core';
import UserAvatar from '../../components/UserAvatar';
import defaultProfileImage from '../../../assets/images/icons/defaultProfileImage.png';

export function ZoneDetailPage(props) {
  useInjectReducer({ key: 'zoneDetailPage', reducer });
  useInjectSaga({ key: 'zoneDetailPage', saga });

  const classes = useStyles(props);
  const [isEditMode, setisEditmode] = useState(false);
  const [deliveryArea, setDeliveryArea] = useState("");

  const handleEditMode = () => {
    if(isEditMode){
      console.log('save area info');
    }
    setisEditmode(!isEditMode)
  }

  const handleChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;

    switch(name){
      case 'deliveryArea':
        setDeliveryArea(value);
        break;

    }

  }

  useEffect(() => {
    console.log(props.location.state);
    if(props.location.state.area){
      const area = props.location.state.area;
      setDeliveryArea(area.name);
    } else {
      props.history.goBack()
    }
  }, []);

  return (
    <div>
      <Helmet>
        <title>{props.intl.formatMessage({...messages.zoneDetails})}</title>
      </Helmet>
      <Header 
        title={<FormattedMessage {...messages.zoneDetails} />} 
        showEditBtn
        onEdit={handleEditMode}
        isEditMode={isEditMode}
      />

      <div> 
        <Grid
          item
          sm={12}
          md={8}
          className={classes.root}
        >
          <div className={classes.container}>
            <Typography variant="h5" className={classes.title}>
              <FormattedMessage {...messages.zoneInformation} />
            </Typography>

            <Grid item>
              <Typography variant="body1" className={classes.label}>
                <FormattedMessage {...messages.deliveryArea} />
              </Typography>
              <Input
                className={classes.textInput}
                value={deliveryArea}
                name="deliveryArea"
                style={!isEditMode ? { color: '#ABABAB' } : {}}
                disabled={!isEditMode}
                placeholder={props.intl.formatMessage({...messages.enterDeliveryArea})}
                onChange={handleChange}
                disableUnderline
              />
            </Grid>
          </div>
        </Grid>
      </div>
    </div>
  );
}

ZoneDetailPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  zoneDetailPage: makeSelectZoneDetailPage(),
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

export default compose(withConnect)(injectIntl(ZoneDetailPage));
