import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { BsFillAlarmFill } from 'react-icons/bs';
import { BsChevronRight } from 'react-icons/bs';
import { BsChevronLeft } from 'react-icons/bs';
import { AiOutlineMenu } from 'react-icons/ai';
import SCREENS from '../../constants/screen';
import { useStyles } from '../Reports/styles';
import { Helmet } from 'react-helmet';
export default function CenteredGrid(props) {
    const classes = useStyles();

    const goToHistoryReportsScreen = () => {
        props.history.push(SCREENS.HistoryReports);
    };
    const goToAlarmReportsScreen = () => {
        props.history.push(SCREENS.AlarmReports);
    };
    const goToIdlingReportsScreen = () => {
        props.history.push(SCREENS.IdlingReports);
    };
    const goToIgnitionReportsScreen = () => {
        props.history.push(SCREENS.IgnitionReports);
    };
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
                        <AiOutlineMenu
                            className={classes.headerIcon}
                            onClose={handleClose}
                        />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Reports
                    </Typography>
                </Toolbar>
            </AppBar>
            <Grid className={classes.root} container spacing={1}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <BsFillAlarmFill className={classes.historyicons} />
                        History Report
                        <BsChevronRight
                            className={classes.arrowicons}
                            onClick={goToHistoryReportsScreen}
                        />
                    </Paper>
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Paper className={classes.divText}>
                        <BsFillAlarmFill className={classes.historyicons} />
                        Alarm Report
                        <BsChevronRight
                            className={classes.arrowicons}
                            onClick={goToAlarmReportsScreen}
                        />
                    </Paper>
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Paper className={classes.divText}>
                        <BsFillAlarmFill className={classes.historyicons} />
                        Idling Report
                        <BsChevronRight
                            className={classes.arrowicons}
                            onClick={goToIdlingReportsScreen}
                        />
                    </Paper>
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Paper className={classes.divText}>
                        <BsFillAlarmFill className={classes.historyicons} />
                        Ignition Report
                        <BsChevronRight
                            className={classes.arrowicons}
                            onClick={goToIgnitionReportsScreen}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}
