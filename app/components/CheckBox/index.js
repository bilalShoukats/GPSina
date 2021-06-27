/**
 *
 * CheckBox
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Checkbox } from '@material-ui/core';
import { useStyles } from './styles.js';

const propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.object,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  size: PropTypes.string,
  value: PropTypes.string,
};

const defaultProps = {
  checked: false,
  color: 'default',
  onChange: () => {},
  disabled: false,
  size: 'medium',
};

const CheckBox = ({
  checked,
  onChange,
  className,
  color,
  disabled,
  value,
  size,
  ...props
}) => {
  const classes = useStyles(props);

  return (
    <Checkbox
      checked={checked}
      onChange={onChange}
      className={className || classes.checkbox}
      color={color}
      disabled={disabled}
      value={value}
      size={size}
    />
  );
};

CheckBox.propTypes = propTypes;
CheckBox.defaultProps = defaultProps;

export default CheckBox;
