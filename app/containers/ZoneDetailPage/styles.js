import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        margin: 'auto',
        maxWidth: '1000px',
        marginTop: '1em',
        padding: '0 2em',
        paddingBottom: '2em',
    },
    container: {
        marginTop: '1em',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    label: {
        textTransform: 'capitalize',
    },
    avatar: {
        marginTop: '2em',
    },
    textInput: {
        width: '100%',
        backgroundColor: 'transparent',
        color: '#ABABAB',
        borderBottom: '3px solid #ABABAB',
        marginTop: '0.5em',
        marginBottom: '1em',
        padding: '0.2em 0.5em',
        fontSize: '14px',
        borderRadius: '0px',
    },
    title: {
        fontWeight: '500',
        margin: '1em 0 0.5em 0',
    },
    bottomContainer: {
        margin: '2em 0',
    },
    btnBlue: {
        margin: '0.8em 0',
        width: '80%',
        backgroundColor: 'transparent',
        color: '#FFFFFF',
        textTransform: 'capitalize',
        border: '2px solid #28ACEA',
        fontWeight: '400',
        padding: '0.5em 0',
    },
    btnYellow: {
        margin: '0.8em 0',
        width: '80%',
        backgroundColor: 'transparent',
        color: '#FFFFFF',
        textTransform: 'capitalize',
        border: '2px solid #FEE128',
        fontWeight: '400',
        padding: '0.5em 0',
    },
    btnRed: {
        margin: '0.8em 0',
        width: '80%',
        backgroundColor: 'transparent',
        color: '#FFFFFF',
        textTransform: 'capitalize',
        border: '2px solid #FF0000',
        fontWeight: '400',
        padding: '0.5em 0',
    },
    radioContainer: {
        width: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioGroup: {
        margin: '0 2em',
    },
    error: {
        color: 'red',
    },
}));

export { useStyles };
