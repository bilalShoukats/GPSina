import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { BsChevronLeft } from 'react-icons/bs';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useStyles } from '../IdlingReports/styles';

export default function CenteredGrid(props) {
    const classes = useStyles();

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.appBar}>
                    <IconButton
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                    >
                        <BsChevronLeft
                            className={classes.headerIcon}
                            onClose={handleClose}
                        />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Idling Reports
                    </Typography>
                </Toolbar>
            </AppBar>
            <div className={classes.vehicleTextField}>
                <FormControl className={classes.vehicleForm} variant="standard">
                    <InputLabel
                        style={{
                            color: 'white',
                        }}
                    >
                        Select Vehicle
                    </InputLabel>
                    <Select label="Select Vehicle">
                        <MenuItem value={10}>PFW 2326</MenuItem>
                        <MenuItem value={20}>PFW 2327</MenuItem>
                        <MenuItem value={30}>PFW 2328</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </div>
    );
}
