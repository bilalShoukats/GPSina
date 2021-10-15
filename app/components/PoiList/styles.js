import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    main: {
        padding: '1.0em 5em',
        backgroundColor: 'transparent',
    },
    container: {
        backgroundColor: 'gray',
        '&:hover': {
            backgroundColor: '#ABABAB',
        },
    },
    content: {
        padding: '0 1.5em',
    },
    avatar: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        '&:hover': {
            // backgroundColor: '#272727',
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
        height: '100%',
        width: '100%',
        display: 'flex',
        padding: '0px 18px',
        alignItems: 'center',
        position: 'relative',
        backgroundColor: 'blue',
    },
    delete: {
        height: '100%',
        width: '100%',
        display: 'flex',
        padding: '0px 18px',
        alignItems: 'center',
        position: 'relative',
        backgroundColor: 'red',
        justifyContent: 'flex-end',
    },
}));

export { useStyles };
