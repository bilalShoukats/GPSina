/**
 *
 * Header
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Button, Grid, Typography } from '@material-ui/core';
// import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import SCREENS from '../../constants/screen';
import { useStyles } from './styles.js';

const propTypes = {
  title: PropTypes.string,
  showClearBtn: PropTypes.bool,
};

const defaultProps = {
  title: '',
  showClearBtn: false,
};

const Header = ({ ...props }) => {
  const classes = useStyles(props);
  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  return (
    <Grid
      container
      className={classes.container}
      justify="space-between"
      alignItems="center"
    >
      <Button onClick={goBack}>
        <FontAwesomeIcon
          icon={faChevronLeft}
          color="#FFFFFF"
          style={{ marginRight: '5px' }}
          size="lg"
        />
        <Typography className={classes.textStyle} display="inline">
          <FormattedMessage {...messages.back} />
        </Typography>
      </Button>

      <Typography className={classes.titleStyle} variant="h6">
        {props.title}
      </Typography>

      {props.showClearBtn ? (
        <Button className={classes.btnStyle} size="small">
          <Typography className={classes.btnTextStyle}>
            <FormattedMessage {...messages.clear} />
          </Typography>
        </Button>
      ) : (
        <div className={classes.emptyBtnStyle} />
      )}
    </Grid>
  );
};

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
