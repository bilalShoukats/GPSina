/**
 *
 * Avatar
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from '@material-ui/core';
// import styled from 'styled-components';
import SCREENS from '../../constants/screen';
import { useStyles } from './styles.js';
import defaultProfileImage from '../../../assets/images/icons/defaultProfileImage.png';

const propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  variant: PropTypes.string, // 'circle|circular|rounded|square'
  style: PropTypes.object,
};

const defaultProps = {
  src: defaultProfileImage,
  alt: 'Default Image',
  variant: 'circle',
};

const UserAvatar = ({ ...props }) => {
  const classes = useStyles(props);

  return <Avatar className={classes.avatar} alt={props.alt} src={props.src} variant={props.variant} style={props.style} />;
};

UserAvatar.propTypes = propTypes;
UserAvatar.defaultProps = defaultProps;

export default UserAvatar;
