import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    main: {
        padding: '0.5em 2em',
        backgroundColor: 'transparent',
    },
    container: {
        backgroundColor: 'gray',
        cursor: 'pointer',
    },
    content: {
        padding: '0 1.5em',
    },
    avatar: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.8,
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
}));

export { useStyles };
