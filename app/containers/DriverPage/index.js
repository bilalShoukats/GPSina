/**
 *
 * DriverPage
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
import makeSelectDriverPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import Header from '../../components/Header';
import { useStyles } from './styles.js';
import { driverList, gensetList } from '../../constants/dummy';
import { Badge, Grid, Typography } from '@material-ui/core';
import UserAvatar from '../../components/UserAvatar';
import defaultProfileImage from '../../../assets/images/icons/defaultProfileImage.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import SCREENS from '../../constants/screen';
import moment from 'moment';

export function DriverPage(props) {
  useInjectReducer({ key: 'driverPage', reducer });
  useInjectSaga({ key: 'driverPage', saga });

  const classes = useStyles(props);

  const goToDriverDetailScreen = (driver) => {
    props.history.push(SCREENS.DRIVERDETAIL, { driver: driver })
  }

  const handleAddDriver = () => {
    props.history.push(SCREENS.ADDDRIVER);
  }

  return (
    <div>
      <Helmet>
        <title>{props.intl.formatMessage({...messages.driver})}</title>
      </Helmet>
      <Header 
        title={<FormattedMessage {...messages.driver} />} 
        showAddBtn
        onPressAdd={handleAddDriver}
      />

      <Grid 
        container
        className={classes.main}
      >
        { driverList.map(driver => (
            <Grid 
              container
              direction="row"
              alignItems="center"
              className={classes.container}
              onClick={() => goToDriverDetailScreen(driver)}
            >
              <Grid item xs={2} md={1} className={classes.avatar}>
                <Grid 
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Badge color="secondary" overlap="circle" badgeContent="" anchorOrigin={{ vertical: 'bottom', horizontal: "right" }} >
                    <UserAvatar alt="Driver Avatar" src={defaultProfileImage} />
                  </Badge>
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
                      <Grid item>
                        <Typography variant="h6">
                          {driver.name}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body1">
                          { props.intl.formatMessage({...messages.driverId}) + " #" + driver.idNum}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body1">
                          { props.intl.formatMessage({...messages.expiredOn}) + moment(driver.expiryDate).format('DD MMM YYYY')}
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

DriverPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  driverPage: makeSelectDriverPage(),
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

export default compose(withConnect)(injectIntl(DriverPage));
