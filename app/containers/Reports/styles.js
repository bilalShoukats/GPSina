import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(3),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        marginTop: 30,
        width: '98%',
        marginLeft: 15,
        backgroundColor: '#9B9B9B',
    },
    divText: {
        textAlign: 'center',
        marginTop: 5,
        padding: theme.spacing(3),
        width: '98%',
        marginLeft: 15,
        color: theme.palette.text.secondary,
        backgroundColor: '#9B9B9B',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        marginLeft: '42%',
    },
    appBar: {
        backgroundColor: 'black',
    },
    historyicons: {
        marginRight: '44%',
    },
    arrowicons: {
        marginLeft: '44%',
    },
    headerIcon: {
        size: '1x',
    },
}));
export { useStyles };
