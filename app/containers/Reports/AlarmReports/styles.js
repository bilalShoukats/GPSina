import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        flex: 1,
        // flexDirection: 'row',
        // height: '20%',
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

    title2: {
        // textAlign: 'center',
        display: 'flex',
        padding: '5px',
        // justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid white',
        height: 45,
        // width: '35%',
        marginTop: 20,
        backgroundColor: 'grey',
    },

    text2: {
        color: 'white',
        marginRight: '370px',
        justifyContent: 'space-between',
    },

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
        flexDirection: 'column',
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
        width: '45%',
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

    formControl: {
        margin: theme.spacing(1),
        minWidth: 350,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
        color: 'white',
    },
}));
export { useStyles };
