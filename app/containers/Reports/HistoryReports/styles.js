// import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles(theme => ({
//     root: {
//         flex: 1,
//         // flexDirection: 'row',
//         height: '20%',
//     },
//     headerIcon: {
//         size: 50,
//     },
//     outerDiv: {
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     title: {
//         // textAlign: 'center',
//         display: 'flex',
//         padding: '5px',
//         justifyContent: 'center',
//         alignItems: 'center',
//         border: '1px solid white',
//         height: 45,
//     },
//     text: {
//         color: 'white',
//         marginRight: '400px',
//     },
//     maindiv: {
//         // flex: 1,
//         height: 170,
//         width: '48%',
//         backgroundColor: 'grey',
//         marginTop: '01%',
//         marginLeft: '27%',
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//     },
//     mainOuterDiv: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         backgroundColor: 'grey',
//         padding: 10,
//     },
//     mainInnerDiv: {
//         justifyContent: 'space-between',
//         display: 'flex',
//     },
//     gpsLat: {
//         textDecorationLine: 'underline',
//     },
//     dateDiv: {
//         textAlign: 'center',
//         marginTop: '1%',
//     },
//     headerText: {
//         color: 'white',
//         textAlign: 'center',
//     },
//     topIcon: {
//         height: 40,
//         width: '5%',
//         marginTop: 20,
//     },
//     iconDiv: {
//         textAlign: 'end',
//     },
//     downloadText: {
//         fontSize: 15,
//         fontStyle: 'italic',
//         marginRight: '1%',
//     },
//     container: {
//         display: 'flex',
//         flexWrap: 'wrap',
//     },
//     textField: {
//         marginLeft: theme.spacing(1),
//         marginRight: theme.spacing(1),
//         width: 200,
//     },
// }));
// export { useStyles };

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    // root: {
    //     flexGrow: 1,
    //     padding: '1.5em 6em',
    // },
    // container: {
    //     margin: '0.5em 0',
    // },
    // title: {
    //     fontWeight: 'bold',
    //     textTransform: 'capitalize',
    //     marginBottom: '0.25em',
    //     marginTop: '0.5em',
    // },
    // description: {
    //     margin: '0.25em 0',
    // },
    // link: {
    //     color: '#28ACEA',
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
        height: 170,
        width: '48%',
        backgroundColor: 'grey',
        marginTop: '01%',
        marginLeft: '27%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    mainOuterDiv: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'grey',
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
}));

export { useStyles };
