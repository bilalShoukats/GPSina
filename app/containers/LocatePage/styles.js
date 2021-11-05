import { makeStyles } from '@material-ui/core/styles';

const width = window.innerWidth / 2 + 'px';
const height = window.innerHeight - 95 + 'px';

const useStyles = theme => ({
    header: {
        height: '40px',
        backgroundColor: '#000000',
        margin: '0 0.5em',
    },
    btn: {
        display: 'inline-block',
        padding: 0,
        minHeight: 0,
        minWidth: 0,
        margin: '0 0.5em',
    },
    icon: {
        width: '25px',
        height: '25px',
    },
    mapContainer: {
        width: '100%',
        height: height,
        backgroundColor: 'white',
    },
    speedIcon: {
        height: '200px',
        height: '200px',
        position: 'absolute',
        bottom: '10px',
        left: '10px',
    },
    speedText: {
        position: 'absolute',
        bottom: '100px',
        left: '80px',
    },
    speedMeterText: {
        position: 'absolute',
        bottom: '80px',
        left: '95px',
        width: 'auto',
    },
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
});

export { useStyles };
