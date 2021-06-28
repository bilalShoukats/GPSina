/**
 *
 * Header
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
};

const defaultProps = {
  title: '',
};

const Header = ({ ...props }) => {
  const classes = useStyles(props);

  return (
    <Grid
      container
      className={classes.container}
      justify="space-between"
      alignItems="center"
    >
      <Link to={SCREENS.HOME} className={classes.link}>
        <FontAwesomeIcon
          icon={faChevronLeft}
          color="#FFFFFF"
          style={{ marginRight: '5px' }}
          size="lg"
        />
        <Typography className={classes.textStyle} display="inline">
          <FormattedMessage {...messages.back} />
        </Typography>
      </Link>

      <Typography className={classes.titleStyle} variant="h6">
        {props.title}
      </Typography>

      <Button className={classes.btnStyle} size="small">
        <Typography className={classes.btnTextStyle}>
          <FormattedMessage {...messages.clear} />
        </Typography>
      </Button>
    </Grid>
  );
};

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
