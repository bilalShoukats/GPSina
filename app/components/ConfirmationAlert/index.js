/**
 *
 * Dialog
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide,
} from '@material-ui/core';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { useStyles } from './styles.js';

const propTypes = {
    open: PropTypes.bool,
    title: PropTypes.string,
    description: PropTypes.string,
    confirmButtonText: PropTypes.string,
    showCancelButton: PropTypes.bool,
    cancelButtonText: PropTypes.string,
    description: PropTypes.string,
    onConfirm: PropTypes.func,
};

const defaultProps = {
    open: false,
    title: '',
    description: '',
    cancelButtonText: 'disagree',
    confirmButtonText: 'agree',
    showCancelButton: false,
};

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmationAlert = ({
    open,
    title,
    description,
    onConfirm,
    onCancel,
    cancelButtonText,
    showCancelButton,
    confirmButtonText,
    ...props
}) => {
    const classes = useStyles(props);

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {description}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {showCancelButton && (
                    <Button onClick={onCancel} color="secondary">
                        {cancelButtonText}
                    </Button>
                )}
                <Button onClick={onConfirm} color="primary">
                    {confirmButtonText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

ConfirmationAlert.propTypes = propTypes;
ConfirmationAlert.defaultProps = defaultProps;

export default ConfirmationAlert;
