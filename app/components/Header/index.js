/**
 *
 * Header
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCalendar,
    faChevronLeft,
    faPencilAlt,
    faPlus,
    faTrashAlt,
    faFilePdf
} from '@fortawesome/free-solid-svg-icons';
import {
    Button,
    ButtonGroup,
    ClickAwayListener,
    Grid,
    Grow,
    MenuItem,
    MenuList,
    Paper,
    Popper,
    Typography,
} from '@material-ui/core';
// import styled from 'styled-components';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import SCREENS from '../../constants/screen';
import { useStyles } from './styles.js';
import { VscFilePdf } from 'react-icons/vsc';

const propTypes = {
    title: PropTypes.string,
    showClearBtn: PropTypes.bool,
    showAddBtn: PropTypes.bool,
    showFenceBtn: PropTypes.bool,
    showHistoryBtn: PropTypes.bool,
    showEditBtn: PropTypes.bool,
    showAddPoiBtn: PropTypes.bool,
    onEdit: PropTypes.func,
    onPressAdd: PropTypes.func,
    onPressAddPoi: PropTypes.func,
    onPressZone: PropTypes.func,
    isEditMode: PropTypes.bool,
    showPdfButton: PropTypes.bool
};

const defaultProps = {
    title: '',
    showClearBtn: false,
    showAddBtn: false,
    showFenceBtn: false,
    showHistoryBtn: false,
    showEditBtn: false,
    showAddPoiBtn: false,
    onEdit: () => console.log('onEdit'),
    onPressAdd: () => console.log('onPressAdd'),
    onPressAddPoi: () => console.log('onPressAddPoi'),
    onPressZone: () => console.log('onPressZone'),
    isEditMode: false,
    showPdfButton: false,
};

const Header = ({ ...props }) => {
    const classes = useStyles(props);
    const history = useHistory();
    const [open, setOpen] = useState(false);
    const anchorRef = React.useRef(null);

    const goBack = () => {
        history.goBack();
    };

    const goToSelectDateScreen = () => {
        history.replace(SCREENS.SELECTDATE);
    };

    const handleMenuItemClick = (event, index) => {
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen(prevOpen => !prevOpen);
    };

    const handleClose = event => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    return (
        <Grid
            container
            className={classes.container}
            justify="space-between"
            alignItems="center"
        >
            <Grid item>
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
            </Grid>

            <Grid item>
                <Typography className={classes.titleStyle} variant="h6">
                    {props.title}
                </Typography>
            </Grid>

            <Grid item>
                {props.showClearBtn ? (
                    <Button className={classes.btnStyle} size="small">
                        <Typography className={classes.btnTextStyle}>
                            <FormattedMessage {...messages.clear} />
                        </Typography>
                    </Button>
                ) : props.showFenceBtn ? (
                    <div>
                        <Button
                            className={classes.btnFenceCircleStyle}
                            size="small"
                        >
                            <FontAwesomeIcon
                                icon={faPlus}
                                color="#FFFFFF"
                                // style={{ marginRight: '5px' }}
                                size="lg"
                            />
                        </Button>
                        <Button className={classes.btnFenceStyle} size="small">
                            <FontAwesomeIcon
                                icon={faTrashAlt}
                                color="red"
                                style={{ marginRight: '5px' }}
                                size="lg"
                            />
                        </Button>
                    </div>
                ) : props.showHistoryBtn ? (
                    <Button
                        className={classes.btnFenceStyle}
                        size="small"
                        onClick={() => goToSelectDateScreen()}
                    >
                        <Typography className={classes.btnTextStyle}>
                            <FontAwesomeIcon
                                icon={faCalendar}
                                color="#FFFFFF"
                                // style={{ marginRight: '5px' }}
                                size="lg"
                            />
                        </Typography>
                    </Button>
                ) : props.showAddBtn ? (
                    <Button
                        className={classes.btnFenceCircleStyle}
                        size="small"
                        onClick={() => props.onPressAdd()}
                    >
                        <FontAwesomeIcon
                            icon={faPlus}
                            color="#FFFFFF"
                            // style={{ marginRight: '5px' }}
                            size="lg"
                        />
                    </Button>
                ) : props.showEditBtn ? (
                    <Button
                        className={classes.btnFenceStyle}
                        size="small"
                        onClick={() => props.onEdit()}
                    >
                        {!props.isEditMode ? (
                            <FontAwesomeIcon
                                icon={faPencilAlt}
                                color="#FFFFFF"
                                // style={{ marginRight: '5px' }}
                                size="lg"
                            />
                        ) : (
                            <Typography className={classes.btnTextStyle}>
                                <FormattedMessage {...messages.save} />
                            </Typography>
                        )}
                    </Button>
                ) : props.showAddPoiBtn ? (
                    <Grid container direction="column">
                        <Grid item>
                            <ButtonGroup
                                variant="outlined"
                                color="primary"
                                ref={anchorRef}
                                aria-label="split button"
                            >
                                <Button onClick={() => props.onPressZone()}>
                                    <FormattedMessage {...messages.zone} />
                                </Button>
                                <Button
                                    color="primary"
                                    size="small"
                                    aria-controls={
                                        open ? 'split-button-menu' : undefined
                                    }
                                    aria-expanded={open ? 'true' : undefined}
                                    aria-label="select merge strategy"
                                    aria-haspopup="menu"
                                    onClick={handleToggle}
                                >
                                    <ArrowDropDownIcon />
                                </Button>
                            </ButtonGroup>
                            <Popper
                                style={{ zIndex: 99 }}
                                open={open}
                                placement="bottom-end"
                                anchorEl={anchorRef.current}
                                role={undefined}
                                transition
                                disablePortal
                            >
                                {({ TransitionProps, placement }) => (
                                    <Grow
                                        {...TransitionProps}
                                        style={{
                                            transformOrigin:
                                                placement === 'bottom'
                                                    ? 'center top'
                                                    : 'center bottom',
                                        }}
                                    >
                                        <Paper>
                                            <ClickAwayListener
                                                onClickAway={handleClose}
                                            >
                                                <MenuList id="split-button-menu">
                                                    <MenuItem
                                                        key="Add New Point Of Interest"
                                                        // disabled={index === 2}
                                                        // selected={index === selectedIndex}
                                                        onClick={event =>
                                                            props.onPressAddPoi()
                                                        }
                                                    >
                                                        Add New Point Of
                                                        Interest
                                                    </MenuItem>
                                                </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                    </Grow>
                                )}
                            </Popper>
                        </Grid>
                    </Grid>
                ) : props.showPdfButton ? (
                    <div>
                        <Button
                            className={classes.btnFenceCircleStyle}
                            size="small"
                        >
                            <FontAwesomeIcon
                                icon={faFilePdf}
                                color="#FFFFFF"
                                // style={{ marginRight: '5px' }}
                                size="lg"
                            />
                        </Button>
                    </div>
                ) : 
                (
                    <div className={classes.emptyBtnStyle} />
                )}
            </Grid>
        </Grid>
    );
};

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
