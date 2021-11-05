import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    otpModal: {
        backgroundColor: '#272727',
        borderRadius: '5px',
        width: '400px',
        color: '#FFFFFF',
    },
    textContainer: {
        padding: '1em 1em',
    },
    errorContainer: {
        color: 'red',
    },
    btnContainer: {
        width: '400px',
        alignItems: 'center',
        color: '#28ACEA',
        padding: '0.5em 0',
        textDecoration: 'underline',
    },
    titleContainer: {
        width: '400px',
        alignItems: 'center',
        color: '#28ACEA',
        padding: '0.5em 0',
    },
    btnContainerDisabled: {
        width: '400px',
    },
    verifybtnContainer: {
        width: '360px',
        height: '40px',
        margin: '20px',
        backgroundColor: '#28ACEA',
    },
    verifybtnContainerDisabled: {
        width: '360px',
        height: '40px',
        margin: '20px',
        backgroundColor: 'gray',
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    otpBoxStyle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
    },
    otpInputStyle: {
        margin: '10px',
        height: '35px',
        width: '65px',
        borderRadius: '5px',
        textAlign: 'center',
        fontFamily: 'arimo',
        fontSize: '1.4rem',
        background: '#eef2f3',
    },
}));

export { useStyles };
