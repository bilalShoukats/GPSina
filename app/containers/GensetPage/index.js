/**
 *
 * GensetPage
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
import makeSelectGensetPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import Header from '../../components/Header';
import { useStyles } from './styles.js';
import { gensetList } from '../../constants/dummy';
import { Grid, Typography } from '@material-ui/core';
import UserAvatar from '../../components/UserAvatar';
import defaultProfileImage from '../../../assets/images/icons/defaultProfileImage.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import SCREENS from '../../constants/screen';


export function GensetPage(props) {
  useInjectReducer({ key: 'gensetPage', reducer });
  useInjectSaga({ key: 'gensetPage', saga });

  const classes = useStyles(props);

  const goToGensetDetailScreen = (genset) => {
    props.history.push(SCREENS.GENSETDETAIL, { genset: genset })
  }

  const handleAddGenset = (genset) => {
    props.history.push(SCREENS.ADDGENSET);
  }

  return (
    <div>
      <Helmet>
        <title>{props.intl.formatMessage({...messages.genset})}</title>
      </Helmet>
      <Header 
        title={<FormattedMessage {...messages.genset} />} 
        showAddGenset 
        onPressAddGenset={handleAddGenset}
      />
      
      <Grid 
        container
        className={classes.main}
      >
        { gensetList.map((genset) => (
            console.log(genset),
            <Grid 
              container
              direction="row"
              alignItems="center"
              className={classes.container}
              onClick={() => goToGensetDetailScreen(genset)}
            >
              <Grid item xs={2} md={1} className={classes.avatar}>
                <Grid 
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <UserAvatar alt="Profile Avatar" src={defaultProfileImage} style={{ border: `4px solid #${(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}` }} />
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
                          {genset.regNo}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body1">
                          {genset.name}
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

GensetPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  gensetPage: makeSelectGensetPage(),
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

export default compose(withConnect)(injectIntl(GensetPage));
