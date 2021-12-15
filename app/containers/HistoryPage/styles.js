import Slider from '@material-ui/core/Slider';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const width = window.innerWidth / 2 + 'px';
const height = (window.innerHeight - 55) * 0.8 + 'px';

const useStyles = theme => ({
    tab: {
        '& .MuiBox-root': {
            padding: '0px',
            display: 'flex',
            marginTop: '20px',
            flexDirection: 'column',
        },
    },
    list: {
        backgroundColor: 'rgb(8, 195, 235)',
    },
    topHeaderRight: {
        position: 'absolute',
        top: '65px',
        right: '60px',
        opacity: 0.8,
        width: 'auto',
        backgroundColor: 'grey',
        padding: '0.25em',
        zIndex: 999,
        borderRadius: '5px',
    },
    topHeaderLeft: {
        position: 'absolute',
        top: '70px',
        left: '10px',
        width: 'auto',
        backgroundColor: 'transparent',
        zIndex: 999,
    },
    icon: {
        width: '30px',
        height: '30px',
    },
    btn: {
        display: 'inline-block',
        padding: 0,
        minHeight: 0,
        minWidth: 0,
        backgroundColor: 'darkgrey',
        padding: '0',
        margin: '0 0.15em',
        border: '1px solid #FFFFFF',
        width: '40px',
        height: '40px',
        '&:hover': {
            //you want this to be the same as the backgroundColor above
            backgroundColor: 'grey',
        },
    },
    textStyle: {
        textTransform: 'capitalize',
        margin: '0 0.25em',
        fontWeight: 'bold',
    },
    rightHeaderBtn: {
        display: 'inline-block',
        padding: 0,
        minHeight: 0,
        minWidth: 0,
        backgroundColor: '#FFFFFF',
        padding: '0.15em 0.5em',
        margin: '0.25em',
        '&:hover': {
            //you want this to be the same as the backgroundColor above
            backgroundColor: '#FFF',
        },
    },
    black: {
        backgroundColor: '#000',
    },
    playButton: {
        left: 0,
        top: -71,
        width: 70,
        bottom: 0,
        height: 70,
        display: 'flex',
        borderRadius: 50,
        cursor: 'pointer',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ededee',
        border: '1px solid #e5e5e5',
        boxShadow:
            '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)',
    },
    lineMargin: {
        top: 5,
        left: 10,
        right: 20,
        bottom: 5,
    },
    player: {
        bottom: '0px',
        padding: '0px',
        height: '70px',
        position: 'absolute',
        backgroundColor: '#ededee',
    },
});

const IOSSlider = withStyles({
    root: {
        height: 2,
        top: -15,
        color: '#3880ff',
        padding: '15px 0',
        position: 'absolute',
    },
    thumb: {
        height: 28,
        width: 28,
        backgroundColor: 'transparent !important',
        // boxShadow:
        //     '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)',
        marginTop: -14,
        marginLeft: -14,
        // '&:focus, &:hover, &$active': {
        //     boxShadow:
        //         '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
        //     // Reset on touch devices, it doesn't add specificity
        //     '@media (hover: none)': {
        //         boxShadow:
        //             '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)',
        //     },
        // },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 12px)',
        top: -22,
        '& *': {
            background: 'transparent',
            color: 'transparent',
        },
    },
    track: {
        height: 2,
        // backgroundColor: '#08c3eb',
    },
    rail: {
        height: 2,
        opacity: 0.5,
        backgroundColor: '#bfbfbf',
    },
    mark: {
        backgroundColor: '#bfbfbf',
        height: 8,
        width: 1,
        marginTop: -3,
    },
    markActive: {
        opacity: 1,
        backgroundColor: 'currentColor',
    },
})(Slider);

export { useStyles, IOSSlider };
