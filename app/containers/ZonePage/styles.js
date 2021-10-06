import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    main: {
        padding: '2.0em 3em',
    },
    container: {
        padding: '0.5em 1.5em',
        margin: '0.5em 3.0em',
        borderRadius: '10px',
        backgroundColor: 'grey',
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
    detailIcon: {
        //backgroundColor: '#28ACEA',
        marginLeft: '1.0em',
        cursor: 'pointer',
        color: '#28ACEA',
        // borderRadius: '10px',
    },
    deleteIcon: {
        //backgroundColor: 'red',
        marginLeft: '1.0em',
        cursor: 'pointer',
        color: '#ff4d4d',
    },
}));

export { useStyles };
