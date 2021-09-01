/**
 *
 * Avatar
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useStyles } from './styles.js';
import { Avatar } from '@material-ui/core';
import defaultProfileImage from '../../../assets/images/icons/defaultProfileImage.png';

const propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  variant: PropTypes.string, // 'circle|circular|rounded|square'
};

const defaultProps = {
  src: defaultProfileImage,
  alt: 'Default Image',
  variant: 'circle',
};

const UserAvatar = ({ ...props }) => {
  const classes = useStyles(props);
  return (
      <Avatar className={classes.avatar} alt={props.alt} src={props.src} onClick={props.onClick}/>
  );
};

UserAvatar.propTypes = propTypes;
UserAvatar.defaultProps = defaultProps;

export default UserAvatar;
