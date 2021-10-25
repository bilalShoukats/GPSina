import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    main: {
        padding: '1.0em 4em',
        backgroundColor: 'transparent',
    },
    container: {
        backgroundColor: 'gray',
        marginBottom: '10px',
        '&:hover': {
            backgroundColor: '#ABABAB',
        },
    },
    content: {
        padding: '0 1.5em',
    },
    avatar: {
        padding: '0.5em 1.5em',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        '&:hover': {
            opacity: 5.0,
        },
    },
    title: {
        textTransform: 'capitalize',
        fontWeight: 'bold',
    },
    description: {
        textTransform: 'capitalize',
        display: 'inline',
        padding: '0.5em 1em',
        margin: '0.5em 0',
    },
    assign: {
        // borderRadius: '10px',
        height: '100%',
        width: '100%',
        display: 'flex',
        padding: '0px 18px',
        alignItems: 'center',
        position: 'relative',
        backgroundColor: 'blue',
    },
    delete: {
        // borderRadius: '10px',
        height: '100%',
        width: '100%',
        display: 'flex',
        padding: '10px 18px',
        alignItems: 'center',
        position: 'relative',
        backgroundColor: 'red',
        justifyContent: 'flex-end',
        marginBottom: '10px',
    },
    attach: {
        borderRadius: '10px',
        height: '100%',
        width: '100%',
        display: 'flex',
        padding: '0px 18px',
        alignItems: 'center',
        position: 'relative',
        backgroundColor: '#272727',
    },
    activity: {
        position: 'absolute',
        top: '50%',
        left: ' 50%',
        transform: 'translate(-50%, -50%)',
    },
    paginate: {
        marginLeft: 'auto',
        backgroundColor: 'gray',
        color: 'primary',
        textTransform: 'capitalize',
        borderRadius: '10px',
        fontWeight: '400',
        padding: '0.5em 0',
        '&:hover': {
            backgroundColor: '#ABABAB',
        },
    },
}));

export { useStyles };
