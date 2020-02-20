import React, {Fragment, useState} from 'react';
import {Helmet} from 'react-helmet';
import {injectIntl} from 'react-intl';
import messages from './messages';
import {Grid} from '@material-ui/core';
import Card from 'components/Card/Loadable'

// json 
import themify from 'utils/json/icons/themify'

const ThemifyIcon = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Themify</title>
      </Helmet>
      <h2 className="breadcumbTitle">Themify Icon</h2>
      <Grid container spacing={3}>

        {themify.map((icon, i) => (
          <Grid key={i} item xs={12}>
            <Card title={icon.title}>
              <div className="fontawesomeIconList">
                {icon.cetagorys.map((item, i) => (
                  <div key={i} className="iconWrap">
                    <i className={item}></i>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Fragment>
  );
}

export default ThemifyIcon;
