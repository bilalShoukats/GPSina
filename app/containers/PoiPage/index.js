/**
 *
 * PoiPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectPoiPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import Header from '../../components/Header';
import { useStyles } from './styles.js';
import { poiList } from '../../constants/dummy';
import { Grid, Typography } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faChevronRight, faFlag, faHome, faIndustry, faMapMarkerAlt, faStreetView } from '@fortawesome/free-solid-svg-icons';
import SCREENS from '../../constants/screen';

export function PoiPage(props) {
  useInjectReducer({ key: 'poiPage', reducer });
  useInjectSaga({ key: 'poiPage', saga });

  const classes = useStyles(props);

  const goToPOIDetailScreen = (poi) => {
    props.history.push(SCREENS.POIDETAIL, { poi: poi })
  }

  const handleZone = () => {
    console.log('handleAddZone');
    props.history.push(SCREENS.ZONE);
  }

  const handleAddPoi = () => {
    console.log('handleAddPoi');
    props.history.push(SCREENS.ADDPOI);
  }

  const handleIcon = (icon) => {
    switch(icon){
      case 1 :
        return faBuilding

      case 2:
        return faIndustry

      case 3:
        return faFlag;

      case 4:
        return faHome;

      case 5:
        return faMapMarkerAlt

      case 6: 
        return faStreetView

      default:
        return faBuilding
    }
  }

  return (
    <div>
      <Helmet>
        <title>{props.intl.formatMessage({...messages.poi})}</title>
      </Helmet>
      <Header 
        title={<FormattedMessage {...messages.poi} />} 
        showAddPoiBtn
        onPressAddPoi={handleAddPoi}
        onPressZone={handleZone}
      />

      <Grid 
        container
        className={classes.main}
      >
        { poiList.map(poi => (
            <Grid 
              container
              direction="row"
              alignItems="center"
              className={classes.container}
              onClick={() => goToPOIDetailScreen(poi)}
            >
              <Grid item xs={2} md={1} className={classes.avatar}>
                <Grid 
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <FontAwesomeIcon
                    icon={handleIcon(poi.markerShop)}
                    color={poi.color}
                    // style={{ }}
                    size="3x"
                  />
                </Grid>
              </Grid>
              <Grid
                item
                xs={10}
                md={11}
                alignItems="center"
                className={classes.content}
              >
                <Grid 
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item>
                    <Grid 
                      container
                      direction="column"
                    >
                      <Grid item >
                        <Typography variant="body1" className={classes.title}>
                          { props.intl.formatMessage({...messages.name}) + ": "}
                          <Typography variant="body1" className={classes.description}>
                            { poi.name}
                          </Typography>
                        </Typography>
                      </Grid>
                      <Grid item >
                        <Typography variant="body1" className={classes.title}>
                          { props.intl.formatMessage({...messages.type}) + ": "}
                          <Typography variant="body1" className={classes.description}>
                            { poi.type}
                          </Typography>
                        </Typography>
                      </Grid>
                      <Grid item >
                        <Typography variant="body1" className={classes.title}>
                          { props.intl.formatMessage({...messages.zone}) + ": "}
                          <Typography variant="body1" className={classes.description}>
                            { poi.zone}
                          </Typography>
                        </Typography>
                      </Grid>
                      <Grid item >
                        <Typography variant="body1" className={classes.title}>
                          { props.intl.formatMessage({...messages.address}) + ": "}
                          <Typography variant="body1" className={classes.description}>
                            { poi.address}
                          </Typography>
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <FontAwesomeIcon icon={faChevronRight} size="1x" />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ))
        }
      </Grid>
    </div>
  );
}

PoiPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  poiPage: makeSelectPoiPage(),
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

export default compose(withConnect)(injectIntl(PoiPage));
