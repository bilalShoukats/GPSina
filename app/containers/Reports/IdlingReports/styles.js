import { makeStyles } from '@material-ui/core/styles';
import { lineBreak } from 'acorn';

// const mapHeight = (window.innerHeight - 95) * 0.9 + 'px';
const addressWidth = Math.max(window.innerWidth / 4, 50) + 'px';

const useStyles = makeStyles(theme => ({
    // root: {
    //     flex: 1,
    //     // flexDirection: 'row',
    //     height: '20%',
    // },
    // outerDiv: {
    //     display: 'flex',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
    // title: {
    //     // textAlign: 'center',
    //     display: 'flex',
    //     padding: '5px',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     // marginTop: 50,
    //     // marginLeft: '25%',
    //     // marginRight: '25%',
    //     // width: '50%',
    //     border: '1px solid white',
    //     height: 45,
    // },
    // text: {
    //     color: 'white',
    //     marginRight: '400px',
    // },
    // height: 170,
    // width: '40%',
    // backgroundColor: 'grey',
    // marginTop: '01%',
    // marginLeft: '30%',
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // nameText: {
    //     marginRight: '35%',
    //     fontSize: 12,
    //     color: 'black',
    // },
    // nameDate: {
    //     marginLeft: '35%',
    //     fontSize: 12,
    //     color: 'black',
    // },
    // nameText1: {
    //     marginRight: '30%',
    // },
    // nameDate1: {
    //     marginLeft: '30%',

    //     // color: 'black',
    // },
    // dateDiv: {
    //     textAlign: 'center',
    //     marginTop: '1%',
    // },
    // topIcon: {
    //     height: 40,
    //     width: '5%',
    //     marginTop: 20,
    // },
    // iconDiv: {
    //     textAlign: 'end',
    // },

    root: {
        flex: 1,
        // flexDirection: 'row',
        height: '20%',
    },
    headerIcon: {
        size: 50,
    },
    outerDiv: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        // textAlign: 'center',
        display: 'flex',
        padding: '5px',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid white',
        height: 45,
    },
    text: {
        color: 'white',
        marginRight: '400px',
    },
    maindiv: {
        // flex: 1,
        // height: 170,
        width: '45%',
        backgroundColor: 'rgb(57,57,57)',
        marginTop: '01%',
        marginLeft: '27%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    mainOuterDiv: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'rgb(57,57,57)',
        padding: 10,
    },
    mainInnerDiv: {
        justifyContent: 'space-between',
        display: 'flex',
    },
    gpsLat: {
        textDecorationLine: 'underline',
    },
    dateDiv: {
        textAlign: 'center',
        marginTop: '1%',
    },
    headerText: {
        color: 'white',
        textAlign: 'center',
    },
    topIcon: {
        height: 40,
        width: '5%',
        marginTop: 20,
    },
    iconDiv: {
        textAlign: 'end',
    },
    downloadText: {
        fontSize: 15,
        fontStyle: 'italic',
        marginRight: '1%',
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    titleSpan: {
        fontSize: 12,
        color: "grey"
    },
    valueSpan: {
        fontSize: 14,
        color: "white"
    },
    addressDiv: {
        width: '200px',
        display: 'flex'
        // border: '1px solid white',
    },
    addressSpan: {
        fontSize: 14,
        color: "white",
        textAlign: 'right'
        // backgroundColor: "red"
    }
}));
export { useStyles };
