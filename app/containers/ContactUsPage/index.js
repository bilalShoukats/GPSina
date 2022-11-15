/**
 *
 * ContactUsPage
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import Header from '../../components/Header';
import { useStyles } from './styles.js';
import APIURLS from '../../ApiManager/apiUrl';
import ApiManager from '../../ApiManager/ApiManager';

import messages from './messages';
import { Grid, Typography } from '@material-ui/core';

export function ContactUsPage(props) {
  const api = ApiManager.getInstance();
  const classes = useStyles(props);
  const [ApiData,setApiData]=useState('')
  const [activationService,setActivationService] =useState([])



  const getContact = () => {
    // console.log('ALARMSNOTIF',ALARMSNOTIF);
     
        api.send('GET', '/getContactInfo', {
          companyInfoType:2,
          appType:0,

        })
            .then(res => {
              console.log('res---------.', res);
              setApiData(res.data.response)
              setActivationService(res.data.response.activationService);
              // console.log('res.', res.data.activationService[0].lunchEndTime );
                  })
            .catch(error => {});
    
};
// activationService
console.log('Api data--',ApiData);
console.log('activationService--',activationService);

useEffect(() => {
  getContact();
}, []);

  return (
    <div>
      <Helmet>
        <title>{props.intl.formatMessage({...messages.contactUs})}</title>
      </Helmet>
      <Header title={<FormattedMessage {...messages.contactUs} />} />

      

      <div>
        <Grid
          container
          direction="column"
          className={classes.root}
        >
          <Grid
            container
            direction="column"
            className={classes.container}
          >
            <Typography variant="body1" className={classes.title}>
              {ApiData.companyName}
            </Typography>
            <Typography variant="body2" className={classes.description}>
              <FormattedMessage {...messages.gpSinaAsiaSdnBhd} />
            </Typography>
          </Grid>

          <Grid
            container
            direction="column"
            className={classes.container}
          >
            <Typography variant="body1" className={classes.title}>
              <FormattedMessage {...messages.registrationNumber} />
            </Typography>
            <Typography variant="body2" className={classes.description}>
            {ApiData.registrationNum}
            </Typography>
          </Grid>

          <Grid
            container
            direction="column"
            className={classes.container}
          >
            <Typography variant="body1" className={classes.title}>
              <FormattedMessage {...messages.emailAddress} />
            </Typography>
            <Typography variant="body2" className={classes.description}>
              <a className={classes.link} href="mailto:acc.gpsina@pettorway.com.my">{ApiData.email}</a>
            </Typography>
          </Grid>

          <Grid
            container
            direction="column"
            className={classes.container}
          >
            <Typography variant="body1" className={classes.title}>
              <FormattedMessage {...messages.call} />
            </Typography>
            <Typography variant="body2" className={classes.description}>
              {ApiData.phone}
            </Typography>
          </Grid>

          <Grid
            container
            direction="column"
            className={classes.container}
          >
            <Typography variant="body1" className={classes.title}>
              <FormattedMessage {...messages.smsWhatsapp} />
            </Typography>
            <Typography variant="body2" className={classes.description}>
              +6012-3288 960
            </Typography>
          </Grid>

          <Grid
            container
            direction="column"
            className={classes.container}
          >
            <Typography variant="body1" className={classes.title}>
              <FormattedMessage {...messages.wechat} />
            </Typography>
            <Typography variant="body2" className={classes.description}>
              {ApiData.weChat}
            </Typography>
          </Grid>

          <Grid
            container
            direction="column"
            className={classes.container}
          >
            <Typography variant="body1" className={classes.title}>
              <FormattedMessage {...messages.companyAddress} />
            </Typography>
            <Typography variant="body2" className={classes.description}>
             {ApiData.companyAddress}
            </Typography>
          </Grid>

          {activationService.map((index)=>{
            return(
              <div>
              
              <Grid
            container
            direction="column"
            className={classes.container}
          >
            <Typography variant="body1" className={classes.title}>
              <FormattedMessage {...messages.activationService} />
            </Typography>
            <Typography variant="body2" className={classes.description}>
            {index.lunchStartTime},{index.lunchEndTime}
              
            </Typography>
            <Typography variant="body2" className={classes.description}>
            {index.workingStartTime},{index.workingEndTime}
             
            </Typography>
          </Grid>
          </div>
            )
          })}
        </Grid>
      </div>
    </div>
  );
}

ContactUsPage.propTypes = {
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

export default compose(withConnect)(injectIntl(ContactUsPage));
