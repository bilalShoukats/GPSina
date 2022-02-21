import { makeStyles } from '@material-ui/core/styles';

const mapHeight = window.innerHeight;
const width = window.innerWidth;

const useStyles = makeStyles(theme => ({
    activity: {
        position: 'absolute',
        top: '50%',
        left: ' 50%',
        transform: 'translate(-50%, -50%)',
    },
    container: {
        backgroundColor: 'gray',
        marginBottom: '10px',
        '&:hover': {
            backgroundColor: '#ABABAB',
        },
    },
    loading: {
        backgroundColor: "black",
        width: width,
        height: mapHeight
    },
}));

export { useStyles };