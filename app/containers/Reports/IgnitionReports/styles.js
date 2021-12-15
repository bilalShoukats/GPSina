import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        flex: 1,
        // flexDirection: 'row',
        height: '20%',
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
        // marginTop: 50,
        // marginLeft: '25%',
        // marginRight: '25%',
        // width: '50%',
        border: '1px solid white',
        height: 45,
    },
    text: {
        color: 'white',
        marginRight: '400px',
    },
    maindiv: {
        width: '35%',
        height: 150,
        backgroundColor: 'grey',
        marginLeft: '33%',
        marginTop: '01%',
    },
    nameText: {
        marginRight: '35%',
        fontSize: 12,
        color: 'black',
    },
    nameDate: {
        marginLeft: '35%',
        fontSize: 12,
        color: 'black',
    },
    nameText1: {
        marginRight: '30%',
    },
    nameDate1: {
        marginLeft: '30%',

        // color: 'black',
    },
    dateDiv: {
        textAlign: 'center',
        marginTop: '1%',
    },
    topIcon: {
        height: 40,
        width: '5%',
        marginTop: 20,
    },
    iconDiv: {
        textAlign: 'end',
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
    dateDiv: {
        textAlign: 'center',
        marginTop: '1%',
    },
}));
export { useStyles };
