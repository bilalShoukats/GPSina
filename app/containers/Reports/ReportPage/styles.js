import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        flex: 1,
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
        width: '48%',
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
    valueSpanLeft: {
        fontSize: 14,
        color: "white"
    },
    valueSpanRight: {
        fontSize: 14,
        color: "white",
        textAlign: 'right'
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
