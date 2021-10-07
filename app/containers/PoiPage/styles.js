import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    main: {
        padding: '1.5em 5em',
    },
    container: {
        padding: '0.5em 1em',
        margin: '0.5em 0',
        borderRadius: '10px',
        backgroundColor: 'red',
        opacity: 0.8,
    },
    content: {
        padding: '0 1.5em',
    },

    avatar: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dotIndicator: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        zIndex: 99,
        backgroundColor: 'lightgreen',
        width: '10px',
        height: '10px',
    },
    title: {
        textTransform: 'capitalize',
        // color: theme.status.danger,
        fontWeight: 'bold',
    },
    description: {
        textTransform: 'capitalize',
        display: 'inline',
    },
    paginate: {
        //display: 'flex',
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
    loading: {
        // margin: 'auto auto',
        // padding: '5em 5em',
        // position: 'absolute',
        // direction: 'row',
        textTransform: 'capitalize',
        alignItems: 'center',
        justify: 'center',
        minHeight: '100vh',
        // minWidth: '100vh',
    },
    activity: {
        padding: '0em 4.5em',
        alignItems: 'center',
        justify: 'center',
    },
}));

export { useStyles };
