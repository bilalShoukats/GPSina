/**
 *
 * SelectDatePage
 *
 */

 import React, { Component } from 'react';
 import PropTypes from 'prop-types';
 import { connect } from 'react-redux';
 import { FormattedMessage, injectIntl } from 'react-intl';
 import { Helmet } from 'react-helmet';
 import { withStyles } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';

import Header from '../../components/Header';
import { useStyles } from './styles.js';
import messages from './messages';
import SCREENS from '../../constants/screen';

class SelectDatePage extends Component{
  constructor(props){
    super(props);
    this.state = {
      dateList: [
        {
          date: '11-07-2021',
        },
        {
          date: '02-07-2021',
        },
        {
          date: '30-06-2021',
        },
        {
          date: '25-06-2021',
        },
        {
          date: '21-06-2021',
        },
      ]
    }

  }

  render() {
    const { dateList } = this.state;
    const { classes } = this.props;

    return (
      <div>
        <Helmet>
          <title>{this.props.intl.formatMessage({...messages.selectDate})}</title>
        </Helmet>
        <Header title={<FormattedMessage {...messages.selectDate} />} />

        <div>
          <Grid container>
            { dateList.length > 0 ? 
                dateList.map((date) => (
                  <Grid 
                    className={classes.container}
                    container
                    onClick={() => this.props.history.replace(SCREENS.HISTORY, { date: date.date })}
                  >
                    <Typography variant="body1">
                      {date.date}
                    </Typography>
                  </Grid>
                ))
              :
                <Grid className={classes.container} container justify="center">
                  <Typography variant="body1" align="center">
                    <FormattedMessage {...messages.noDateFound} />
                  </Typography>
                </Grid>
            }
          </Grid>
        </div>
      </div>
    )
  }
}

SelectDatePage.propTypes = {
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

export default (withConnect)(injectIntl(withStyles(useStyles)(SelectDatePage)));
