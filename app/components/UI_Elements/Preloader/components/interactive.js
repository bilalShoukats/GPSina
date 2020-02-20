import React from 'react';
import clsx from 'clsx';
import { green } from '@material-ui/core/colors';
import { Grid, CircularProgress, Button, Fab, makeStyles } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    fabProgress: {
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
    },
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}));

export default function CircularIntegration() {
    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const timer = React.useRef();

    React.useEffect(() => {
        return () => {
            clearTimeout(timer.current);
        };
    }, []);

    function handleButtonClick() {
        if (!loading) {
            setSuccess(false);
            setLoading(true);
            timer.current = setTimeout(() => {
                setSuccess(true);
                setLoading(false);
            }, 2000);
        }
    }

    return (
        <Grid className={classes.root}>
            <Grid className={classes.wrapper}>
                <Fab
                    className={`${success ? 'bg-success' : 'bg-default'} btn`}
                    onClick={handleButtonClick}
                >
                    {success ? <CheckIcon /> : <SaveIcon />}
                </Fab>
                {loading && <CircularProgress size={68} className={`${classes.fabProgress} text-default`} />}
            </Grid>
            <Grid className={classes.wrapper}>
                <Button
                    className={`${success ? 'bg-success' : 'bg-default'} btn`}
                    disabled={loading}
                    onClick={handleButtonClick}
                >
                    Accept terms
                </Button>
                {loading && <CircularProgress size={24} className={`${classes.buttonProgress} text-default`} />}
            </Grid>
        </Grid>
    );
}