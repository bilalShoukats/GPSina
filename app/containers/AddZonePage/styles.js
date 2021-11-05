import { grey } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
const width = Math.min((window.innerWidth / 12) * 8 * 0.5, 350);

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        margin: 'auto',
        maxWidth: '1000px',
        marginTop: '4em',
        padding: '0 2em',
        paddingBottom: '2em',
    },
    container: {
        margin: '1em 0',
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
        color: grey[500],
        borderBottom: '3px solid ' + grey[500],
        marginTop: '0.5em',
        marginBottom: '1em',
        padding: '0.2em 0.5em',
        borderRadius: '0px',
    },

    dateInput: {
        width: '100%',
        backgroundColor: 'transparent',
        color: 'red',
        // borderBottom: '3px solid ' + grey[500],
        marginTop: '0.5em',
        marginBottom: '1em',

        borderRadius: '0px',
    },
    dropMenu: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: '10px',
        // borderBottom: '3px solid ' + grey[500],
        marginTop: '1em',
        marginBottom: '1em',
        padding: '0.5em 0.5em',
    },
    // select: {
    //     borderBottom: '0px solid ',
    // },
    title: {
        fontWeight: '500',
        margin: '1em 0 0.5em 0',
        color: 'gray',
    },
    btnContainer: {
        marginTop: '1em',
        width: '100%',
    },
    btnBlue: {
        backgroundColor: '#28ACEA',
        margin: '0.8em auto',
        width: width + 'px',
        textTransform: 'capitalize',
        borderRadius: '20px',
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
        marginRight: '5em',
    },
    radioSelection: {
        marginTop: '1em',
        color: '#28ACEA',
    },
    error: {
        color: 'red',
        fontWeight: '100',
    },
}));

export { useStyles };
