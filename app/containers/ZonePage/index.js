/**
 *
 * ZonePage
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
import makeSelectZonePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import Header from '../../components/Header';
import { useStyles } from './styles.js';
import { zoneList } from '../../constants/dummy';
import { Grid, Typography } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faChevronRight, faFlag, faHome, faIndustry, faMapMarkerAlt, faStreetView, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import SCREENS from '../../constants/screen';

export function ZonePage(props) {
  useInjectReducer({ key: 'zonePage', reducer });
  useInjectSaga({ key: 'zonePage', saga });

  const classes = useStyles(props);

  const goToAreaDetailScreen = (area) => {
    console.log('goToAreaDetailScreen');
    props.history.push(SCREENS.AREADETAIL, { area: area })
  }

  const handleAddZone = () => {
    console.log('handleAddZone');
  }

  return (
    <div>
      <Helmet>
        <title>{props.intl.formatMessage({...messages.zone})}</title>
      </Helmet>
      <Header 
        title={<FormattedMessage {...messages.zone} />} 
        showAddBtn
        onPressAdd={handleAddZone}
      />

      <Grid 
        container
        className={classes.main}
      >
        { zoneList.map(zone => (
            <Grid 
              container
              direction="row"
              alignItems="center"
              className={classes.container}
              onClick={() => goToAreaDetailScreen(zone)}
            >
              <Grid
                item
                xs={12}
                alignItems="center"
                className={classes.content}
              >
                <Grid 
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item >
                    <Typography variant="body1" className={classes.title}>
                      { zone.name}
                    </Typography>
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

ZonePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  zonePage: makeSelectZonePage(),
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

export default compose(withConnect)(injectIntl(ZonePage));
