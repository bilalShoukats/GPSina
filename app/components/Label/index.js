/**
 *
 * Label
 *
 */

import React, { Children } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { useStyles } from './styles.js';

const propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.object,
};

const defaultProps = {};

const Label = ({ children, className, ...props }) => {
  const classes = useStyles(props);

  return (
    <label className={className || classes.textStyles}>
      {Children.toArray(children)}
    </label>
  );
};

Label.propTypes = propTypes;
Label.defaultProps = defaultProps;

export default Label;
