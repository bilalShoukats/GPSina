import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        marginLeft: '40%',
    },
    appBar: {
        backgroundColor: 'black',
    },
    headerIcon: {
        size: '1x',
    },
    vehicleTextField: {
        marginTop: '5%',
    },
    alarmTextField: {
        marginTop: 10,
    },
    vehicleForm: {
        color: 'red',
        width: '50%',
        marginLeft: '25%',
        backgroundColor: 'grey',
    },
    alarmForm: {
        color: 'red',
        width: '40%',
        marginLeft: '30%',
        backgroundColor: 'grey',
    },
}));
export { useStyles };
