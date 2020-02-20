import React, {Fragment, useState} from 'react';
import {Helmet} from 'react-helmet';
import {injectIntl} from 'react-intl';
import messages from './messages';
import {Grid} from '@material-ui/core';
import Card from 'components/Card/Loadable'

// json 
import icofont from 'utils/json/icons/icofont'

const IcoFontIcons = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Icofont</title>
      </Helmet>
      <h2 className="breadcumbTitle">IcoFont Icon</h2>
      <Grid container spacing={3}>

        {icofont.map((icon, i) => (
          <Grid key={i} item xs={12}>
            <Card title={icon.title}>
              <div className="fontawesomeIconList">
                {icon.cetagorys.map((item, i) => (
                  <div key={i} className="iconWrap">
                    <i className={`icofont-${item}`}></i>
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

export default IcoFontIcons;
