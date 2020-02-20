import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {Helmet} from 'react-helmet';
import {FormattedMessage} from 'react-intl';
import {compose} from 'redux';
import {Grid} from '@material-ui/core';
import Card from 'components/Card/Loadable'
import messages from './messages';
import './style.scss'

// json 
import fontawesome from 'utils/json/icons/fontawesome'

const FontawesomeIcon = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Fontawesome</title>
      </Helmet>
      <h2 className="breadcumbTitle">Fontawesome</h2>
      <Grid container spacing={3}>
        <Grid container spacing={3}>

          {fontawesome.map((icon, i) => (
            <Grid key={i} item xs={12}>
              <Card title={icon.title}>
                <div className="fontawesomeIconList">
                  {icon.cetagorys.map((item, i) => (
                    <div key={i} className="iconWrap">
                      <i className={`fa ${item}`}></i>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Fragment>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(FontawesomeIcon);
