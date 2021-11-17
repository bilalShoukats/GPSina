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
    textField: {
        backgroundColor: 'white',
        width: '80%',
        borderBottom: 2,
        borderBottomColor: 'red',
        marginTop: '5%',
        opacity: '70%',
    },
    textFieldIcon: {
        size: '2x',
        color: 'green',
    },
    vehicleForm: {
        width: '50%',
        marginLeft: '25%',
        backgroundColor: 'grey',
        borderBottomColor: 'white',
        borderBottomWidth: 5,
    },
    vehicleTextField: {
        marginTop: '3%',
    },
}));
export { useStyles };
