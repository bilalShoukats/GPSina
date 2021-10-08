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
        // margin: '0',
        position: 'absolute',
        top: '50%',
        left: ' 50%',
        transform: 'translate(-50%, -50%)',
        //   -ms-transform: "translate(-50%, -50%)",
        alignItems: 'center',
        justify: 'center',
        // minHeight: '100vh',
    },
    activity: {
        // margin: '0',
        position: 'absolute',
        top: '50%',
        left: ' 50%',
        transform: 'translate(-50%, -50%)',
        // minHeight: '100vh',
        // alignItems: 'center',
        // justify: 'center',
    },
}));

export { useStyles };
